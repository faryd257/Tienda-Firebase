import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export { ProtectedRoute };
