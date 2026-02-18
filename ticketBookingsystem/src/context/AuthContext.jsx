import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try{
        const res = await api.get("/user/profile");
        setUser(res.data);
      } catch(error){
        setUser(null);
      } finally{
        setLoading(false);
      }
    }
    const token = localStorage.getItem("token");
    if(token){
      fetchProfile();
    } else  {
      setLoading(false);
    }
  }, [])

  const login = (token) => {
    localStorage.setItem("token", token);
  }
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, setLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);