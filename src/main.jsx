import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { UserProvider } from './contexts/UserContext.jsx';
import App from "./App.jsx";
<<<<<<< HEAD
import { AuthProvider } from "./state/AuthContext.jsx";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/bidhub/marketplace">
      <AuthProvider>
=======
import './index.css'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
>>>>>>> 7eddabd556862b7a8eaf4731fb7fe97ab66d63d7
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
