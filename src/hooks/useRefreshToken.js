import useAuth from "./useAuth";
import { REFRESH_TOKEN_URL } from "../config/rest-api";
import axios from "../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = async () => {
    console.log("refresh token = " + localStorage.getItem("refreshToken"));
    try {
      const response = await axios.get(REFRESH_TOKEN_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
        },
      });

      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        console.log(response.data);
        console.log("new access token = " + response.data.access_token);
        return {
          ...prev,
          email: response.data.email,
          roles: response.data.roles,
          accessToken: response.data.access_token,
        };
      });

      if (response.data.refresh_token !== undefined) {
        localStorage.setItem("refreshToken", response.data.refresh_token);
      }
      return response.data.access_token;
    } catch (error) {
      console.error("error from use refresh: " + error);
      if (error?.response?.status === 403) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    }
  };
  return refresh;
};

export default useRefreshToken;
