// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { api } from "@/services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Usuário do Supabase
  const [customer, setCustomer] = useState(null); // Customer do backend
  const [loading, setLoading] = useState(true);

  // -----------------------------------------------------
  // 🔥 Carrega usuário + customer associado
  // -----------------------------------------------------
  async function loadUserAndCustomer() {
    setLoading(true);

    // 1. OBTÉM USUÁRIO DO SUPABASE
    const { data } = await supabase.auth.getUser();
    const supaUser = data.user ?? null;
    setUser(supaUser);

    // 2. SE EXISTE USUÁRIO → BUSCA CUSTOMER NO BACKEND
    if (supaUser) {
      try {
        const { data: customerData } = await api.get(
          `/customers/${supaUser.id}` // busca usando authUserId
        );
        setCustomer(customerData);
      } catch (err) {
        console.warn("⚠ Customer não encontrado no backend");
        setCustomer(null);
      }
    } else {
      setCustomer(null);
    }

    setLoading(false);
  }

  // Executa ao iniciar a aplicação
  useEffect(() => {
    loadUserAndCustomer();

    // Escuta mudanças de login/logout
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

  // -----------------------------------------------------
  // 🔥 Registrar usuário (Supabase + Backend)
  // -----------------------------------------------------
  async function registerUser(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    const supabaseId = data.user.id;

    // Criar "Customer" no backend vinculado ao Supabase
    await api.post("/customers", {
      name: email,
      address: "",
      zipcode: "",
      cityId: null,
      authUserId: supabaseId, // 🔥 AGORA ESTÁ CORRETO
    });

    await loadUserAndCustomer();
    return true;
  }

  // -----------------------------------------------------
  // 🔥 Login
  // -----------------------------------------------------
  async function loginUser(email, password) {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    await loadUserAndCustomer();
    return true;
  }

  // -----------------------------------------------------
  // 🔥 Logout
  // -----------------------------------------------------
  async function logoutUser() {
    await supabase.auth.signOut();
    setUser(null);
    setCustomer(null);
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
        reloadAuth: loadUserAndCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
