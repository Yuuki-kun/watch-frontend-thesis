import { useContext } from "react";
import { CartContext } from "../context/CartPovider";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
