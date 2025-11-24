import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { CategoryProducts } from "./pages/CategoryProducts";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="category/:id" element={<CategoryProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
