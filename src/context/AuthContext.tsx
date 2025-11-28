// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabase";
import { api } from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // usuário do Supabase
  const [customer, setCustomer] = useState(null); // cliente do backend
  const [loading, setLoading] = useState(true);

  // --------------------------------------------
  // 🔥 Carregar sessão + carregar customer do backend
  // --------------------------------------------
  useEffect(() => {
    async function loadSession() {
      setLoading(true);

      // 1. Buscar usuário logado do Supabase
      const { data } = await supabase.auth.getUser();
      const supaUser = data.user ?? null;
      setUser(supaUser);

      // 2. Se existe usuário → buscar customer correspondente
      if (supaUser) {
        try {
          const { data: customerData } = await api.get(
            `/customers/${supaUser.id}`
          );
          setCustomer(customerData);
        } catch {
          setCustomer(null); // caso ainda não exista
        }
      } else {
        setCustomer(null);
      }

      setLoading(false);
    }

    loadSession();

    // Monitorar mudanças de sessão
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const supaUser = session?.user ?? null;
        setUser(supaUser);

        if (supaUser) {
          try {
            const { data: customerData } = await api.get(
              `/customers/${supaUser.id}`
            );
            setCustomer(customerData);
          } catch {
            setCustomer(null);
          }
        } else {
          setCustomer(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // -------------------------------------------------
  // 🔥 Registrar novo usuário + criar customer no backend
  // -------------------------------------------------
  async function registerUser(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const userId = data.user.id;

    // Criar também no backend (customer)
    await api.post("/customers", {
      id: userId,
      name: email,
      address: "",
      zipcode: "",
      city: null,
    });

    return true;
  }

  // -------------------------------------------------
  // 🔥 Login normal
  // -------------------------------------------------
  async function loginUser(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return true;
  }

  // -------------------------------------------------
  // 🔥 Logout — limpa tudo
  // -------------------------------------------------
  async function logoutUser() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    setUser(null);
    setCustomer(null);

    return true;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        customer,
        loading,
        registerUser,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
