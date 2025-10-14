// frontend/src/App.jsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./state/AuthContext.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import Account from "./pages/Account/Account.jsx";
import ItemListPage from "./pages/ItemListPage/ItemListPage.jsx";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage.jsx";
import PurchasesPage from "./pages/PurchasesPage/PurchasesPage.jsx";
import BidsPage from "./pages/BidsPage/BidsPage.jsx";
import NotificationsBadge from "./components/NotificationsBadge.jsx";
import SellerPage from "./pages/SellerPage/SellerPage.jsx";
import SellerMarketPage from "./pages/SellerMarketPage/SellerMarketPage.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Page404 from './pages/Page404/Page404.jsx';

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
          <Route path="/" element={user ? <Dashboard /> : <Landing />} />
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
                <Account />
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
