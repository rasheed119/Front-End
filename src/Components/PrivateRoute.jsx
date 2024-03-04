import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("admin") ? children : <Navigate to="/" />;
};

export default PrivateRoute;
