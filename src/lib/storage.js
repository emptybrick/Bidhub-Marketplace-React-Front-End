// frontend/src/lib/storage.js
const KEY = "Bidhub.tokens";
const USER_KEY = "Bidhub.user";

export function getToken() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}
export function setToken(tokens) {
  localStorage.setItem(KEY, JSON.stringify(tokens));
}
export function clearToken() {
  localStorage.removeItem(KEY);
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
}
export function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
export function clearUser() {
  localStorage.removeItem(USER_KEY);
}
