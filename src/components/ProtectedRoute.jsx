import React from "react";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";

function ProtectedRoute() {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to={"/"} replace />;
}

export default ProtectedRoute;
