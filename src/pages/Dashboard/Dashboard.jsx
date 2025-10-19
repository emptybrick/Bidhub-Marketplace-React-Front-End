import { useAuth } from "../../state/AuthContext.jsx";

const Dashboard = () => {
  const { user, setUser } = useAuth();

  return (
    <main>
      <h1>Dashboard - Welcome {user.username}.</h1>
    </main>
  );
};

export default Dashboard;
