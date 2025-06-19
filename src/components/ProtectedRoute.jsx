import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, isAuthenticating } = useAuth();

  if (isAuthenticating) {
    return <div className="text-center mt-10 text-gray-500">Verificando sesión...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
}
