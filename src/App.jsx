// frontend/src/App.jsx
import { Routes, Route, Link, Navigate } from "react-router";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";

import Dashboard from "./components/Views/Dashboard/Dashboard.jsx";
import Landing from "./components/Views/Landing/Landing.jsx";
import LoginPage from "./components/Forms/LoginForm/LoginForm.jsx";
import RegisterPage from "./components/Forms/RegisterForm/RegisterForm.jsx";
import AccountPage from "./components/Views/Account/Account.jsx";
import ItemListPage from "./components/Views/ItemList/ItemList.jsx";
import ItemDetailPage from "./components/Views/ItemDetail/ItemDetail.jsx";
import PurchasesPage from "./components/Views/Purchases/Purchases.jsx";
// import BidsPage from "./components/Views/BidsPage/BidsPage.jsx";
// import NotificationsBadge from "./components/NotificationsBadge.jsx";
import SellerPage from "./components/Views/SellerView/SellerView.jsx";
// import SellerMarketPage from "./unused/SellerMarketPage/SellerMarketPage.jsx";
import NavBar from "./components/Components/NavBar/NavBar.jsx";
import Footer from "./components/Components/Footer/Footer.jsx";
import Page404 from "./components/Views/Page404/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/marketplace"
            element={
              <ProtectedRoute>
                <ItemListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/marketplace/:itemId"
            element={
              <ProtectedRoute>
                <ItemDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/purchases"
            element={
              <ProtectedRoute>
                <PurchasesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:userId/bids"
            element={
              <ProtectedRoute>
                <BidsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:sellerId"
            element={
              <ProtectedRoute>
                <SellerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:sellerId/marketplace"
            element={
              <ProtectedRoute>
                <SellerMarketPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;