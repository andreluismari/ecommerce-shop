import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/categories");
      return res.json();
    },
  });

  return (
    <nav className="w-full bg-white border-b shadow-sm relative z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="font-bold text-xl tracking-tight z-50">
          Carne Shop
        </Link>

        {/* MENU */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <Link to="/" className="hover:text-gray-600 transition">
            Home
          </Link>

          {/* DROPDOWN SEGURO */}
          <div className="relative z-[9999]">
            
            {/* BOTÃO */}
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer hover:text-gray-600 focus:outline-none"
            >
              Categorias
            </button>

            {/* MENU DROPDOWN */}
            {open && (
              <div
                className="
                  absolute left-0 top-full mt-2 w-44 
                  bg-white border shadow-lg rounded-md p-2 
                  flex flex-col gap-1
                  z-[99999]
                "
              >
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 hover:bg-gray-100 rounded text-left w-full block"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/cart" className="hover:text-gray-600 transition">
            Carrinho
          </Link>
        </div>
      </div>
    </nav>
  );
}
