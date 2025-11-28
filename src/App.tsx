// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";   // <—
import { RatingsProvider } from "./context/RatingsContext";       // <—

import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { CategoryProducts } from "./pages/CategoryProducts";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Checkout } from "./pages/Checkout";
import PrivateRoute from "./routes/PrivateRoute";
import { Orders } from "./pages/Orders";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoritesProvider>       {/* ⬅ AGORA ESTÁ AQUI */}
          <RatingsProvider>       {/* ⬅ E AQUI */}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<MainLayout />}>
                  {/* ROTAS LIVRES */}
                  <Route index element={<Home />} />
                  <Route path="category/:id" element={<CategoryProducts />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />

                  {/* ROTAS PROTEGIDAS */}
                  <Route
                    path="checkout"
                    element={
                      <PrivateRoute>
                        <Checkout />
                      </PrivateRoute>
                    }
                  />

                  {/* FASE 3 - HISTÓRICO */}
                  <Route
                    path="orders"
                    element={
                      <PrivateRoute>
                        <Orders />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </RatingsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
