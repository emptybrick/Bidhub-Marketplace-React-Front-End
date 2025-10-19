// should show successful purchases/auctions won to generate seller reviews and keep a history
import { useAuth } from "../../state/AuthContext.jsx";

const PurchasesPage = () => {
  const { user } = useAuth();
  // need to limit access to userId = logged in user

  return <h1>User Purchases Page</h1>;
};

export default PurchasesPage;
