<<<<<<< HEAD:src/pages/Dashboard/Dashboard.jsx
import { useAuth } from "../../state/AuthContext.jsx";
=======
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Views/Dashboard/Dashboard.jsx

const Dashboard = () => {
  const { user, setUser } = useAuth();

  return (
    <main>
      <h1>Dashboard - Welcome {user.username}.</h1>
    </main>
  );
};

export default Dashboard;
