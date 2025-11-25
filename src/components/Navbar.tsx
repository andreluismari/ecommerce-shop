import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl tracking-tight">
          Carne Shop
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-gray-600 transition">Home</Link>
          <Link to="/category/1" className="hover:text-gray-600 transition">Categorias</Link>
          <Link to="/cart" className="hover:text-gray-600 transition">Carrinho</Link>
        </div>
      </div>
    </nav>
  );
}
