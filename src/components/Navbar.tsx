// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCategories } from "@/cases/categories/hooks/use-categories";
import { useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const { data: categories = [] } = useCategories();
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        <Link to="/" className="font-bold text-xl">Carne Shop</Link>

        <div className="flex items-center gap-6">

          <Link to="/">Home</Link>

          {/* Dropdown de categorias */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="hover:underline"
            >
              Categorias
            </button>

            {open && (
              <div className="absolute top-8 left-0 bg-white border shadow rounded p-3 w-48 z-50">
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500">Nenhuma categoria</p>
                ) : (
                  categories.map((cat: any) => (
                    <Link
                      key={cat.id}
                      to={`/category/${cat.id}`}
                      className="block py-1 hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {cat.name}
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

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
