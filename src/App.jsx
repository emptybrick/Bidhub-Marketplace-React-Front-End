// frontend/src/App.jsx
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext.jsx";

import Dashboard from "./components/Views/Dashboard/Dashboard.jsx";
import Landing from "./components/Views/Landing/Landing.jsx";
import LoginForm from "./components/Forms/LoginForm/LoginForm.jsx";
import RegisterForm from "./components/Forms/RegisterForm/RegisterForm.jsx";
import Account from "./components/Views/Account/Account.jsx";
import ItemListPage from "./components/Views/ItemList/ItemList.jsx";
import ItemDetail from "./components/Views/ItemDetail/ItemDetail.jsx";
import Purchases from "./components/Views/Purchases/Purchases.jsx";
// import BidsPage from "./components/Views/BidsPage/BidsPage.jsx";
// import NotificationsBadge from "./components/NotificationsBadge.jsx";
import SellerView from "./components/Views/SellerView/SellerView.jsx";
// import SellerMarketPage from "./unused/SellerMarketPage/SellerMarketPage.jsx";
import NavBar from "./components/Component/NavBar/NavBar.jsx";
import Footer from "./components/Component/Footer/Footer.jsx";
import Page404 from "./components/Views/Page404/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SellerMarketPage from "./components/Views/SellerMarketPage/SellerMarketPage.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route
            path="/bidhub/home"
            element={user ? <Dashboard /> : <Landing />}
          />
          <Route path="/bidhub/login" element={<LoginForm />} />
          <Route path="/bidhub/register" element={<RegisterForm />} />
          <Route
            path="/bidhub/marketplace"
            element={
              // <ProtectedRoute>
                <ItemListPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/bidhub/marketplace/:itemId"
            element={
              <ProtectedRoute>
                <ItemDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bidhub/user/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bidhub/user/account/purchases"
            element={
              <ProtectedRoute>
                <Purchases />
              </ProtectedRoute>
            }
          />
          {/* should be able to just filter by seller id and reuse itemlist page */}
          <Route
            path="/bidhub/seller/:sellerId/marketplace"
            element={
              <ProtectedRoute>
                <SellerMarketPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bidhub/seller/:sellerId/reviews"
            element={
              <ProtectedRoute>
                <SellerView />
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
};

export default App;
