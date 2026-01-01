const TOKEN_KEY = "edugram:token";
const USER_KEY = "edugram:user";

const Token = {
  setToken(value) {
    if (value) {
      localStorage.setItem(TOKEN_KEY, value);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },
  setUser(user) {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  },
  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },
  // Backward-compatible aliases
  settoken(value) {
    this.setToken(value);
  },
  gettoken() {
    return this.getToken();
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default Token;