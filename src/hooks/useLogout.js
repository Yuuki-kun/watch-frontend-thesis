import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { LOGOUT_URL } from "../config/rest-api";
import usePrivateRequest from "./usePrivateRequest";
import useCart from "./useCart";
const useLogout = () => {
  const { auth, setAuth, setPersist } = useAuth();
  const { setCart } = useCart();
  const navigate = useNavigate();
  const axiosPrivate = usePrivateRequest();
  const logout = async () => {
    try {
      const response = await axiosPrivate.post(LOGOUT_URL);
      setAuth({});
      setCart([]);
      localStorage.removeItem("refreshToken");
      alert("logout success");
      setPersist(false);
      localStorage.setItem("persist", false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};
export default useLogout;
