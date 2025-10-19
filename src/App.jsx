// frontend/src/App.jsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.jsx";

// Fix imports to match the actual folder structure
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Landing from "./components/Landing/Landing.jsx";
import LoginForm from "./components/Forms/LoginForm/LoginForm.jsx";
import RegisterForm from "./components/Forms/RegisterForm/RegisterForm.jsx";
import Account from "./components/Account/Account.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NotificationsBadge from "./components/NotificationsBadge/NotificationsBadge.jsx";
import ItemList from "./components/ItemList/ItemList.jsx";
import ItemDetail from "./components/ItemDetail/ItemDetail.jsx";
import Purchases from "./components/Purchases/Purchases.jsx";
import Page404 from "./components/Page404/Page404.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/marketplace" element={user ? <ItemList /> : <Navigate to="/login" />} />
          <Route path="/marketplace/:itemId" element={user ? <ItemDetail /> : <Navigate to="/login" />} />
          <Route path="/account" element={user ? <Account /> : <Navigate to="/login" />} />
          <Route path="/purchases" element={user ? <Purchases /> : <Navigate to="/login" />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default App;
