import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectoredRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectoredRoute;
