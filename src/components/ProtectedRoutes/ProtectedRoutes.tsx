import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "src/components/mainLayout";

const ProtectedRoutes = (props: any) => {
  const isLogin = sessionStorage.getItem("auth");
  return isLogin ? <MainLayout {...props} /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
