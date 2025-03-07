import { Navigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated ? children : <Navigate to="/login" />;
}