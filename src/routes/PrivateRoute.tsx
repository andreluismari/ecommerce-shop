// src/routes/PrivateRoute.tsx
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    alert("Você precisa estar logado para acessar esta página.");
    return <Navigate to="/login" replace />;
  }

  return children;
}
