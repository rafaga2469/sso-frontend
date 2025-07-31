import { createContext, useContext, useEffect, useState } from "react";
import {
  getUserInfo,
  loginWithCookie,
  logout as apiLogout,
} from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();
let globalLogout = () => {};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const logout = async () => {
    localStorage.removeItem("access");
    try {
      await apiLogout(); // elimina cookie refresh_token
    } catch (e) {
      console.warn("Error al cerrar sesión:", e);
    }
    setUser(null);

    // Evitar loop si ya estás en /login
    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
  };

  globalLogout = logout;

  const loadUser = async () => {
    try {
      const data = await getUserInfo(); // ya usa axios con refresh automático
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const login = async (email, password) => {
    setIsAuthenticating(true);
    const { access } = await loginWithCookie(email, password);
    localStorage.setItem("access", access);
    await loadUser();
  };


  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access) {
      loadUser();
    } else {
      setIsAuthenticating(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticating }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export const getGlobalLogout = () => globalLogout;
