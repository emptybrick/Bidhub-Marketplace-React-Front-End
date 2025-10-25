// frontend/src/App.jsx
import { Routes, Route, useParams } from "react-router";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import About from "./components/Views/About/About.jsx";
import Account from "./components/Views/Account/Account.jsx";
import Dashboard from "./components/Views/Dashboard/Dashboard.jsx";
import Footer from "./components/Component/Footer/Footer.jsx";
import ItemListPage from "./components/Views/ItemList/ItemList.jsx";
import ItemDetail from "./components/Views/ItemDetail/ItemDetail.jsx";
import Landing from "./components/Views/Landing/Landing.jsx";
import NavBar from "./components/Component/NavBar/NavBar.jsx";
import Page404 from "./components/Views/Page404/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SellerView from "./components/Views/SellerView/SellerView.jsx";
import ItemList from "./components/Views/ItemList/ItemList.jsx";
import PayPalCheckout from "./components/Component/Payments/PayPalCheckout.jsx";
import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Small wrappers to read route params and pass as props
const SellerViewRoute = () => {
  const { sellerId } = useParams();
  return <SellerView sellerId={sellerId} />;
};

const SellerMarketRoute = () => {
  const { sellerId } = useParams();
  return <ItemList owner={sellerId} />;
};

const App = () => {
  // FIX: define user from context
  const { user } = useContext(UserContext);

  const paypalOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes>
          <Route
            path="/bidhub/home"
            element={user ? <Dashboard /> : <Landing />}
          />
          <Route path="/bidhub/about" element={<About />} />
          <Route path="/bidhub/marketplace" element={<ItemListPage />} />
          <Route
            path="/bidhub/marketplace/:itemId"
            element={
              <ProtectedRoute>
                <ItemDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bidhub/seller/:sellerId"
            element={
              <ProtectedRoute>
                <SellerViewRoute />
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
            path="/bidhub/seller/:sellerId/marketplace"
            element={
              <ProtectedRoute>
                <SellerMarketRoute />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bidhub/checkout"
            element={
              <ProtectedRoute>
                <PayPalCheckout orderMeta={{}} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </PayPalScriptProvider>
  );
};

export default App;
