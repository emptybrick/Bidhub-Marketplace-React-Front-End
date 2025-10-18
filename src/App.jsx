// frontend/src/App.jsx
import { Routes, Route, Link, Navigate } from "react-router";
import { useAuth } from "./contexts/AuthContext.js";
import Dashboard from "./components/Views/Dashboard/Dashboard.js";
import Landing from "./components/Views/Landing/Landing.js";
import LoginPage from "./components/Forms/LoginForm/LoginForm.jsx";
import RegisterPage from "./components/Forms/RegisterForm/RegisterForm.jsx";
import AccountPage from "./components/Views/Account/Account.jsx";
import ItemListPage from "./components/Views/ItemList/ItemList.jsx";
import ItemDetailPage from "./components/Views/ItemDetail/ItemDetail.jsx";
import PurchasesPage from "./components/Views/Purchases/Purchases.jsx";
import BidsPage from "./components/Views/BidsPage/BidsPage.js";
// import NotificationsBadge from "./components/NotificationsBadge.jsx";
import SellerPage from "./components/Views/SellerView/SellerView.jsx";
import SellerMarketPage from "./unused/SellerMarketPage/SellerMarketPage.jsx";
import NavBar from "./components/Components/NavBar/NavBar.jsx";
import Footer from "./components/Components/Footer/Footer.jsx";
import Page404 from "./components/Views/Page404/Page404.js";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { user, logout } = useAuth();
  // is logout needed here?
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route path="/bidhub/home/" element={user ? <Dashboard /> : <Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/marketplace"
            element={
              <PrivateRoute>
                <ItemListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/marketplace/:itemId"
            element={
              <PrivateRoute>
                <ItemDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:userId/account"
            element={
              <PrivateRoute>
                <AccountPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:userId/purchases"
            element={
              <PrivateRoute>
                <PurchasesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:userId/bids"
            element={
              <PrivateRoute>
                <BidsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:sellerId"
            element={
              <PrivateRoute>
                <SellerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:sellerId/marketplace"
            element={
              <PrivateRoute>
                <SellerMarketPage />
              </PrivateRoute>
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
