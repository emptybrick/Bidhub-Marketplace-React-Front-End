import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext.jsx";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Welcome to your Dashboard, {user?.username}</h1>
      <p>Your personal Bidhub marketplace hub.</p>
    </main>
  );
};

export default Dashboard;
