import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./cart.css";
import useCart from "../../hooks/useCart";
import { getCartItemsService } from "../../api/services/cartService";
const Cart = () => {
  const { auth } = useAuth();

  const { cart, setCart } = useCart();

  useEffect(() => {
    const fetchCartData = async (cartId) => {
      console.log(cartId);
      const response = await getCartItemsService(cartId);
      console.log(response);
      setCart(response);
    };
    if (auth.email) {
      console.log("logged in");
      fetchCartData(auth?.cartId);
    } else {
      console.log("not logged in");
      const tempoCartId = localStorage.getItem("tempoCartId");
      if (tempoCartId) {
        console.log("have cart");
        fetchCartData(auth?.cartId);
      } else {
        console.log("have not cart");
      }
    }
  }, [auth, setCart]);

  return (
    <section className="cart-container-section ">
      <div className="cart-container container">
        <h4>My Shopping Cart ({cart?.length})</h4>
        <div className="cart-select-info">
          <button className="select-all-btn">Chọn tất cả</button>
          <div>
            <div style={{ color: "#fff" }}>{1} items selected</div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <span style={{ color: "#fff", fontWeight: "bold" }}>
              Tổng: 100,000,000đ
            </span>
            <button className="checkout-btn">Thanh toán/Mua hàng</button>
          </div>
        </div>
        {/* <div className="line-container">
          <span className="line"></span>
        </div> */}
        {!cart ? (
          <div className="empty-cart-container">
            <FaCartPlus className="empty-cart-icon" />
            <h3>Your Cart Is Currently Empty</h3>
            <button className="return-to-shop-btn">Return to Shop</button>
          </div>
        ) : (
          <div className="item-details-container">
            <table class="table">
              <tr>
                <th>#</th>
                <th></th>
                <th>Watch</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Delete</th>
              </tr>
              {cart &&
                cart.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <input type="checkbox" name="" id="" />
                    </td>
                    <td>
                      <img
                        src={item.watch.images[0].image}
                        alt="img"
                        className="cart-item-img"
                      />
                    </td>
                    <td>
                      <h5>{item.watch.brand.brandName}</h5>
                      <p className="item-name">{item.watch.name}</p>
                    </td>
                    <td>
                      <p>{item.price * 1000000}đ</p>
                    </td>

                    <td className="align-middle">
                      <p>
                        <div className="quantity-control">
                          <button className="de-button">-</button>
                          <input
                            id="quantityInput"
                            className="input-quantity"
                            type="number"
                            value={item.quantity}
                          />
                          <button className="incr-button">+</button>
                        </div>
                      </p>
                    </td>
                    <td className="align-middle">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <button className="delete-icon">
                          <RiDeleteBin6Line />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
