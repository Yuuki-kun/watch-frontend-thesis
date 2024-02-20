import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaCartPlus } from "react-icons/fa";
import "./cart.css";
const Cart = () => {
  const { auth } = useAuth();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartData = (cartId) => {
      setCart([
        {
          name: "Mens Armani Exchange Watch AX2103",
          img: "https://d1rkccsb0jf1bk.cloudfront.net/products/99953110/main/medium/AX2103_main.jpg",
          price: 169.0,
          discountPercent: 12,
          timeLeaf: 1833,
        },
      ]);
    };
    if (auth.email) {
      console.log("logged in");
      fetchCartData(1);
    } else {
      console.log("not logged in");
      const tempoCartId = localStorage.getItem("tempoCartId");
      if (tempoCartId) {
        console.log("have cart");
        fetchCartData(1);
      } else {
        console.log("have not cart");
      }
    }
  });

  return (
    <section className="cart-container-section">
      <div className="cart-container">
        <h4>Shopping Cart</h4>
        {cart ? (
          <div className="empty-cart-container">
            <FaCartPlus className="empty-cart-icon" />
            <h3>Your Cart Is Currently Empty</h3>
            <button className="return-to-shop-btn">Return to Shop</button>
          </div>
        ) : (
          "have cart item"
        )}
      </div>
    </section>
  );
};

export default Cart;
