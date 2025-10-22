// frontend/src/App.jsx
import { Routes, Route } from "react-router";
import { UserContext } from "./contexts/UserContext";
import { useContext } from "react";

import About from "./components/Views/About/About.jsx";
import Dashboard from "./components/Views/Dashboard/Dashboard.jsx";
import Footer from "./components/Component/Footer/Footer.jsx";
import ItemListPage from "./components/Views/ItemList/ItemList.jsx";
import ItemDetail from "./components/Views/ItemDetail/ItemDetail.jsx";
import Landing from "./components/Views/Landing/Landing.jsx";
import NavBar from "./components/Component/NavBar/NavBar.jsx";
import Page404 from "./components/Views/Page404/Page404.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import About from "./components/Views/About/About.jsx";

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
            path="/bidhub/seller/:sellerId/"
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
