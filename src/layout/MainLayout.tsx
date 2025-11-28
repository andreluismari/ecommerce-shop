// src/layout/MainLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function MainLayout() {
  const { user, logoutUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">

      {/* HEADER */}
      <header className="flex items-center justify-end gap-5 p-4 border-b bg-white shadow-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="hover:underline">Carrinho</Link>

        {user && (
          <Link to="/orders" className="hover:underline">
            Meus Pedidos
          </Link>
        )}

        {user ? (
          <>
            <span className="opacity-80">{user.email}</span>
            <button
              onClick={logoutUser}
              className="text-red-600 hover:underline"
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
      <footer className="text-center py-4 border-t text-gray-600 text-sm">
        🦆 Pato Mercado © 2025 — Desenvolvido por André Mari
      </footer>
    </div>
  );
}
