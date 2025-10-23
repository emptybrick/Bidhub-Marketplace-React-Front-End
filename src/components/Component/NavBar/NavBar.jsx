import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext.jsx";
import "./navbar.css";
import RegisterForm from "../../Forms/RegisterForm/RegisterForm.jsx";
import LoginForm from "../../Forms/LoginForm/LoginForm.jsx";
import Dashboard from "../../Views/Dashboard/Dashboard.jsx";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

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
                <Link onClick={() => setShowLogin(!showLogin)}>
                  {/* { showLogin ? "Click x to close" : "Login" } */}
                  Login
                </Link>
              </li>
              {showLogin && (
                <div className="modal">
                  <LoginForm onClose={() => setShowLogin(false)} />
                </div>
              )}
              <li className="nav-bar-link">
                <Link onClick={() => setShowRegister(!showRegister)}>
                  {/* { showRegister ? "Click x to close" : "Register" } */}
                  Register
                </Link>
              </li>
              {showRegister && (
                <div className="modal">
                  <RegisterForm onClose={() => setShowRegister(false)} />
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
