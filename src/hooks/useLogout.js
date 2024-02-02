import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { LOGOUT_URL } from "../config/rest-api";
import usePrivateRequest from "./usePrivateRequest";
const useLogout = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const axiosPrivate = usePrivateRequest();
  const logout = async () => {
    try {
      const response = await axiosPrivate.post(LOGOUT_URL);
      setAuth({});
      localStorage.removeItem("refreshToken");
      alert("logout success");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};
export default useLogout;
