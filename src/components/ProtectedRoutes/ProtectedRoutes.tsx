import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "src/components/mainLayout";

const ProtectedRoutes = () => {
  const isLogin = sessionStorage.getItem("auth");
  return isLogin ? <MainLayout /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
