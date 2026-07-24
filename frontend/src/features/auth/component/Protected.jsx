import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Navigate, useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to={"/admin/login"} />;
  }

  return children;
};

export default Protected;
