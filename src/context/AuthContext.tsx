// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Monitorar sessão automaticamente
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Registrar usuário
  async function registerUser(email, password) {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    return true;
  }

  // Login
  async function loginUser(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw error;
    return true;
  }

  // Logout (AQUI É A PARTE IMPORTANTE)
  async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setUser(null); // força atualização visual

    return true;
  }

  return (
    <AuthContext.Provider
      value={{ user, registerUser, loginUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
