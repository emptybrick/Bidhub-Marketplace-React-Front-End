import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.jsx";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    // Clear user data from context
    setUser(null);
    // Clear any tokens from local storage
    localStorage.removeItem("token");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BidHub</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/marketplace">Marketplace</Link>
        </li>
        {user ? (
          <>
            <li className="nav-item">
              <Link to="/account">Account</Link>
            </li>
            <li className="nav-item">
              <Link to="/purchases">Purchases</Link>
            </li>
            <li className="nav-item">
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
