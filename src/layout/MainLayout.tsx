import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* NAV */}
      <Navbar />

      {/* CONTENT */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} • Ecommerce Shop — Desenvolvido por Andre Mari
      </footer>
    </div>
  );
}
