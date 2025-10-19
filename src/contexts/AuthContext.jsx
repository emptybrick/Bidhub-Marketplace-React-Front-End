import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken, removeToken } from '../lib/storage';
import api from '../lib/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getToken();
        if (token) {
          const response = await api.get('/auth/me/');
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        removeToken();
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const login = async (credentials) => {
    const response = await api.post('/auth/login/', credentials);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const register = async (userData) => {
    const response = await api.post('/auth/register/', userData);
    setToken(response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};