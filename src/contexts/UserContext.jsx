import { createContext, useState, useEffect } from "react";
import { getUser } from "../services/userService";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const userData = await getUser();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const value = { user, setUser, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };












// // frontend/src/state/AuthContext.jsx
// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../lib/api.js";
// import { setToken, getToken, clearToken, getUser, setUser, clearUser } from "../lib/storage.js";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUserState] = useState(getUser());

//   useEffect(() => {
//     // Optionally verify token on mount
//   }, []);

//   async function login(username, password) {
//     const { data } = await api.post(`/auth/token/`, { username, password });
//     setToken({ access: data.access, refresh: data.refresh });
//     setUser({ username });
//     setUserState({ username });
//   }

//   function logout() {
//     clearToken();
//     clearUser();
//     setUserState(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() { return useContext(AuthContext); }