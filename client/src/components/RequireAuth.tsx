import React, { useEffect, useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { userService } from "../services/user.service";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    userService()
      .me()
      .then(() => setAuthenticated(true))
      .catch(() => setAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!authenticated) return <Navigate to="/login" replace />;
  return children;
};

export default RequireAuth;
