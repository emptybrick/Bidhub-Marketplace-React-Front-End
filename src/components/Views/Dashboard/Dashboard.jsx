import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import ItemForm from "../../Forms/ItemForm/ItemForm";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <main>
      <h1>Dashboard - Welcome {user.username}.</h1>
      <ItemForm />
    </main>
  );
};

export default Dashboard;
