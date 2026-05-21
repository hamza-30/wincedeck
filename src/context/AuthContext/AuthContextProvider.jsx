import React, { useContext } from "react";
import AuthContext from "./AuthContext";
import { useAuth } from "../../hooks/useAuth";

function AuthContextProvider({ children }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
