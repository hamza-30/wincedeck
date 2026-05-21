import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./src/components/Navbar";
import { useAuthContext } from "./src/context/AuthContext/AuthContextProvider";
import Spinner from "./src/components/Spinner";

function Layout() {
  const { loading } = useAuthContext();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {loading ? <Spinner /> : <Outlet />}
      </main>
    </div>
  );
}

export default Layout;
