// frontend/src/lib/api.js (Axios instance + JWT refresh)
import axios from "axios";
import { getToken, setToken, clearToken } from "./storage.js";

const api = axios.create({ baseURL: `${import.meta.env.VITE_API_URL}/api` });

api.interceptors.request.use((config) => {
  const tokens = getToken();
  if (tokens?.access) config.headers.Authorization = `Bearer ${tokens.access}`;
  return config;
});

let refreshing = false;
let queue = [];

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      if (!refreshing) {
        refreshing = true;
        try {
          const tokens = getToken();
          if (!tokens?.refresh) throw new Error("No refresh token");
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/token/refresh/`, { refresh: tokens.refresh });
          const newTokens = { ...tokens, access: data.access };
          setToken(newTokens);
          queue.forEach((cb) => cb(newTokens.access));
          queue = [];
          return api(original);
        } catch (e) {
          clearToken();
          window.location.href = "/login";
          return Promise.reject(e);
        } finally {
          refreshing = false;
        }
      }
      return new Promise((resolve) => {
        queue.push(() => resolve(api(original)));
      });
    }
    return Promise.reject(err);
  }
);

export default api;