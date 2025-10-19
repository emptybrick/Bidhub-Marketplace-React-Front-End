import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext.jsx";
import "./navbar.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`nav ${scrolled ? "affix" : ""}`}>
      <div className="logo">
        <Link to="/">BidHub</Link>
      </div>

      <div className={`main_list ${menuOpen ? "show_list" : ""}`}>
        <ul>

          <li>
            <Link to="/marketplace/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          <li>
            <Link to="/marketplace" onClick={() => setMenuOpen(false)}>
              Marketplace
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link to="/account" onClick={() => setMenuOpen(false)}>
                  Account
                </Link>
              </li>
              <li>
                <Link to="/purchases" onClick={() => setMenuOpen(false)}>
                  Purchases
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMenuOpen(false)}>
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
