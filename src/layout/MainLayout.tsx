// src/layout/MainLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDarkMode } from "@/hooks/useDarkMode";

export function MainLayout() {
  const { user, logoutUser } = useAuth();
  const { isDark, setIsDark } = useDarkMode();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 transition-colors">

      {/* HEADER */}
      <header className="flex items-center justify-end gap-5 p-4 border-b bg-white dark:bg-gray-800 transition-colors">

        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="hover:underline">Carrinho</Link>

        {/* BOTÃO DARK MODE */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`
            flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition 
            ${isDark 
              ? "bg-white text-black hover:bg-gray-200" 
              : "bg-black text-white hover:bg-gray-800"
            }
          `}
        >
          {isDark ? "☀️ Claro" : "🌙 Escuro"}
        </button>

        {/* LOGIN / LOGOUT */}
        {user ? (
          <>
            <span className="opacity-80">{user.email}</span>
            <button
              onClick={logoutUser}
              className="text-red-500 hover:underline"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Cadastrar</Link>
          </>
        )}
      </header>

      {/* CONTEÚDO */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="text-center py-4 border-t text-gray-600 dark:text-gray-400 dark:border-gray-700 text-sm">
        🦆 Pato Mercado © 2025 — Desenvolvido por André Mari
      </footer>
    </div>
  );
}
