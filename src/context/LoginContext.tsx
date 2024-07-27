// src/context/LoginContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

interface LoginContextType {
  username: string;
  password: string;
  error: string | null;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setError: (error: string | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

const LoginProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setError(null);
      navigate("/");
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        username,
        password,
        error,
        setUsername,
        setPassword,
        setError,
        handleSubmit,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

export { LoginProvider, useLogin };
