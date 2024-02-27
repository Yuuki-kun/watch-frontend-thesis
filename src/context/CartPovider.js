import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        favoriteList,
        setFavoriteList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
