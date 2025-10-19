import { useContext } from "react";
import { Link } from "react-router";

import { UserContext } from "../../../contexts/UserContext";
// import "./navbar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      { user ? (
        <div>
        <h2>Welcome, {user.username}</h2>
        <ul>
          <li>
            <Link to="/"><img src="/src/assets/Bidhub-Logo-Negative.png" alt="Bidhub Logo" /></Link>
          </li>
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
          </ul>
        </div>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
