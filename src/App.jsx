import { Routes, Route, useParams } from "react-router";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";
import About from "./components/Views/About/About.jsx";
import Account from "./components/Views/Account/Account.jsx";
import Dashboard from "./components/Views/Dashboard/Dashboard.jsx";
import Footer from "./components/Component/Footer/Footer.jsx";
import ItemDetail from "./components/Views/ItemDetail/ItemDetail.jsx";
import Landing from "./components/Views/Landing/Landing.jsx";
import NavBar from "./components/Component/NavBar/NavBar.jsx";
import Page404 from "./components/Views/Page404/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SellerView from "./components/Views/SellerView/SellerView.jsx";
import ItemList from "./components/Views/ItemList/ItemList.jsx";
import PayPalCheckout from "./components/Component/Payments/PayPalCheckout.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import RegisterForm from "./components/Forms/RegisterForm/RegisterForm.jsx";
import LoginForm from "./components/Forms/LoginForm/LoginForm.jsx";
import AuthRoute from "./components/AuthRoute/AuthRoute.jsx";

const App = () => {
  const { user } = useContext(UserContext);
  const { sellerId } = useParams();

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
          <Route path="/bidhub/marketplace" element={<ItemList />} />
          <Route
            path="/bidhub/login"
            element={
              <AuthRoute>
                <LoginForm />
              </AuthRoute>
            }
          />
          <Route
            path="/bidhub/register"
            element={
              <AuthRoute>
                <RegisterForm />
              </AuthRoute>
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
            path="/bidhub/seller/:sellerId"
            element={
              <ProtectedRoute>
                <SellerView sellerId={sellerId} />
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
                <ItemList owner={sellerId} />
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
