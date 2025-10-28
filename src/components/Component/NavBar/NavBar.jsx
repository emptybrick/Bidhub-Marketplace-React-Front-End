import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./navbar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ scrolled, setScrolled ] = useState(false);
  const navigate = useNavigate()

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    // Clear user data from context
    setUser(null);
    // Clear any tokens from local storage
    localStorage.removeItem("token");
    // Close the menu if it's open
    setMenuOpen(false);
    navigate('/bidhub/home')
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`nav ${scrolled ? "affix" : ""}`}>
      <div className="logo">
        <Link to="/bidhub/home">
          <img
            src="/Bidhub_Favicon_Logo.jpg"
            alt="BidHub Icon"
            className="logo-icon"
          />
          Bidhub
        </Link>
      </div>

      <div className={`main_list ${menuOpen ? "show_list" : ""}`}>
        <ul>
          <li className="nav-bar-link">
            <Link to="/bidhub/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          <li className="nav-bar-link">
            <Link to="/bidhub/marketplace" onClick={() => setMenuOpen(false)}>
              Marketplace
            </Link>
          </li>

          {user ? (
            <>
              <li className="nav-bar-link">
                <Link to="/bidhub/home" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-bar-link">
                <Link
                  to="/bidhub/user/account"
                  onClick={() => setMenuOpen(false)}
                >
                  Account
                </Link>
              </li>
              <li className="nav-bar-link">
                <Link onClick={handleSignOut}>Sign Out</Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-bar-link">
                <Link
                  to={user ? "/bidhub/home" : "/bidhub/login"}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-bar-link">
                <Link
                  to={user ? "/bidhub/home" : "/bidhub/register"}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div
        className={`navTrigger ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <i></i>
        <i></i>
        <i></i>
      </div>
    </nav>
  );
};

export default NavBar;
