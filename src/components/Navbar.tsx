import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export function Navbar() {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/categories");
      return res.json();
    }
  });

  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight">
          Carne Shop
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-600 transition">Home</Link>

          {/* MENU DE CATEGORIAS DINÂMICO */}
          {categories && categories.length > 0 && (
            <div className="relative group">
              <span className="cursor-pointer hover:text-gray-600">Categorias</span>

              <div className="absolute hidden group-hover:block bg-white border shadow-md rounded-md mt-2 p-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to={`/category/${c.id}`}
                    className="block px-3 py-1 hover:bg-gray-100 rounded"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link to="/cart" className="hover:text-gray-600 transition">
            Carrinho
          </Link>
        </div>
      </div>
    </nav>
  );
}
