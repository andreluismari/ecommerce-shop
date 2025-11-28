// src/layout/MainLayout.tsx
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function MainLayout() {
  const { user, logoutUser } = useAuth();

  return (
    <div>
      <header className="flex justify-end gap-6 p-4 border-b">
        <Link to="/">Home</Link>
        <Link to="/cart">Carrinho</Link>

        {user ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={logoutUser}
              className="text-red-600 font-semibold"
            >
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Cadastrar</Link>
          </>
        )}
      </header>

      <main className="p-8">
        <Outlet />
      </main>
    </div>
  );
}
