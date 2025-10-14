// frontend/src/state/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/api.js";
import { setToken, getToken, clearToken, getUser, setUser, clearUser } from "../lib/storage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(getUser());

  useEffect(() => {
    // Optionally verify token on mount
  }, []);

  async function login(username, password) {
    const { data } = await api.post(`/auth/token/`, { username, password });
    setToken({ access: data.access, refresh: data.refresh });
    setUser({ username });
    setUserState({ username });
  }

  function logout() {
    clearToken();
    clearUser();
    setUserState(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }