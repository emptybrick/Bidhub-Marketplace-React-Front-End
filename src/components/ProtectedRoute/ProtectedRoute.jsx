import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return;
    <Navigate to="/bidhub/marketplace" replace />;
  }

  return children;
};

export default ProtectedRoute;