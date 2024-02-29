import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";
import { useEffect } from "react";
import axios from "../api/axios";
import { GET_TEMPORARY_CART } from "../config/rest-api";
const useAuth = () => {
  const { auth } = useContext(AuthContext);

  useDebugValue(auth, (auth) => (auth.userId ? "Logged In" : "Logged Out"));

  return useContext(AuthContext);
};

export default useAuth;
