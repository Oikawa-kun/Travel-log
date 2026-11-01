/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data);
    return res.data;
  };

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    setUser(res.data);
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
