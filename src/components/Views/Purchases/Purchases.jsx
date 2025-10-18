// should show successful purchases/auctions won to generate seller reviews and keep a history
import { UserContext } from "../../../contexts/UserContext.jsx";

const Purchases = () => {
  const { user } = useContext(UserContext);

  // need to limit access to userId = logged in user

  return <h1>User Purchases Page</h1>;
};

export default Purchases;
