import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

if (loading) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="spinner">Loading...</div>
    </div>
  );
}

  if (user) {
    return <Navigate to="/bidhub/home" replace />;
  }
    
  return children;
};

export default AuthRoute;
