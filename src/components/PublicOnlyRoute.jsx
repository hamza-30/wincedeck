import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import Spinner from "./Spinner";

function PublicOnlyRoute() {
  const { user } = useAuthContext();

  return user ? <Navigate to={"/dashboard"} replace /> : <Outlet />;
}

export default PublicOnlyRoute;
