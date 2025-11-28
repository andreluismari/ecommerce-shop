// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/AuthContext";

import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { CategoryProducts } from "./pages/CategoryProducts";
import { ProductDetail } from "./pages/ProductDetail";
import { Cart } from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Checkout } from "./pages/Checkout";

import PrivateRoute from "./routes/PrivateRoute";


const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="category/:id" element={<CategoryProducts />} />
              <Route path="product/:id" element={<ProductDetail />} />

              {/* Rotas abertas */}
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Rotas protegidas */}
              <Route
                path="checkout"
                element={
                  <PrivateRoute>
                    <Checkout />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
