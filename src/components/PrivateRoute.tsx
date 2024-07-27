// src/components/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { user, token } = useAuth();

  if (token === null && user === null) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
