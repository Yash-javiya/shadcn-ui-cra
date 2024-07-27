import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";
import { useAuth } from "@/context/AuthContext";

interface SignupContextType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

const SignupProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await signup(username, email, password);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <SignupContext.Provider
      value={{
        username,
        email,
        password,
        confirmPassword,
        error,
        setUsername,
        setEmail,
        setPassword,
        setConfirmPassword,
        handleSubmit,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

const useSignup = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error("useSignup must be used within a SignupProvider");
  }
  return context;
};

export { SignupProvider, useSignup };
