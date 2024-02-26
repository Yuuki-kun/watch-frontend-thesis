import { createContext, useState } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFetchFavorite, setIsFetchFavorite] = useState(false);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        favoriteList,
        setFavoriteList,
        isFetchFavorite,
        setIsFetchFavorite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
