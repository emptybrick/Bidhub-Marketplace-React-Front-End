import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./navbar.css";
import RegisterForm from "../../Forms/RegisterForm/RegisterForm.jsx";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
        <Link to="/bidhub/home">BidHub</Link>
      </div>

      <div className={`main_list ${menuOpen ? "show_list" : ""}`}>
        <ul>
          <li>
            <Link to="/bidhub/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>
          </li>

          <li>
            <Link to="/bidhub/marketplace" onClick={() => setMenuOpen(false)}>
              Marketplace
            </Link>
          </li>

          {user ? (
            <>
              <li>
                <Link
                  to="/bidhub/user/account"
                  onClick={() => setMenuOpen(false)}
                >
                  Account
                </Link>
              </li>
              <li>
                <Link
                  to="/bidhub/user/account/purchases"
                  onClick={() => setMenuOpen(false)}
                >
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
                <button onClick={() => setMenuOpen(false)}>Login</button>
              </li>

              <li>
                <button onClick={() => setShowRegister(!showRegister)}>
                  {showRegister ? "Close Register" : "Register"}
                </button>
              </li>

              {showRegister && (
                <div className="modal">
                  <div className="modal-content">
                    <button
                      className="modal-close"
                      onClick={() => setShowRegister(false)}
                      style={{ fontSize: "2.5rem", top: "5px", right: "15px" }} // Larger close button
                    >
                      ×
                    </button>
                    <RegisterForm />
                  </div>
                </div>
              )}
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
