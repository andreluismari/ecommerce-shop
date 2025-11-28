// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        <Link to="/" className="font-bold text-xl">Carne Shop</Link>

        <div className="flex items-center gap-6">

          <Link to="/">Home</Link>

          <Link to="/cart">Carrinho</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Cadastrar</Link>
            </>
          )}

          {user && (
            <>
              <span>{user.email}</span>
              <button onClick={logout} className="text-red-600">Sair</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
