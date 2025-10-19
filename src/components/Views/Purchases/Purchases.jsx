// should show successful purchases/auctions won to generate seller reviews and keep a history
<<<<<<< HEAD:src/pages/PurchasesPage/PurchasesPage.jsx
import { useAuth } from "../../state/AuthContext.jsx";
=======
import { UserContext } from "../../../contexts/UserContext.jsx";

const Purchases = () => {
  const { user } = useContext(UserContext);
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7:src/components/Views/Purchases/Purchases.jsx

  // need to limit access to userId = logged in user

  return <h1>User Purchases Page</h1>;
};

export default Purchases;
