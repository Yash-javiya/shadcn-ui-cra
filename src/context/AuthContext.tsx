// src/context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import { login as apiLogin, signup as apiSignup, User } from "@/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  signup: (username: string, email: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setIsAuthLoaded(true);
  }, []);

  const signup = async (username: string, email: string, password: string) => {
    try {
      const data = await apiSignup(username, email, password);
      setUser(data);
      setToken(data.access);
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("authUser", JSON.stringify(data));
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const data = await apiLogin(username, password);
      setUser(data);
      setToken(data.access);
      localStorage.setItem("authToken", data.access);
      localStorage.setItem("authUser", JSON.stringify(data));
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider value={{ user, token, signup, login, logout }}>
      {isAuthLoaded && children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
