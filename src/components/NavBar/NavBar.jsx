// add support for notifications icon and popup showing current notifications
// how to track when user is outbid/auction won by user?
// should we implement messaging between user/seller?

import { useAuth } from "../../state/AuthContext.jsx";

const NavBar = () => {
  const { user, setUser } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav>
      {user ? (
        <>
          {" "}
          {/* Added fragment wrapper */}
          <h2>Welcome, {user.username}</h2>
          <ul>
            <li>
              <Link to="/">
                <img
                  src="/src/assets/Bidhub-Logo-Negative.png"
                  alt="Bidhub Logo"
                />
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        </>
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
