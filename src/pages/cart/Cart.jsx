import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { FaCartPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./cart.css";
import useCart from "../../hooks/useCart";
import {
  controlQtyService,
  getCartItemsService,
} from "../../api/services/cartService";
import DeleteProductModal from "../../components/modal/DeleteProductModal";
import { Bounce, ToastContainer, toast } from "react-toastify";
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
  console.log(cart.length);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteWatchId, setSelectedDeleteWatchId] = useState(-1);
  const openModal = (itemId) => {
    setIsModalOpen(true);
    setSelectedDeleteWatchId(itemId);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const deleteFromBag = (itemId) => {
    openModal(itemId);
  };

  const notify = () =>
    toast.success(
      <div>
        {/* <img
          src={watchDetails.images[0].image}
          alt=""
          className="notify-watch-img"
        /> */}
        <span>Đã xóa!</span>
      </div>
    );

  const [isChangingQty, setIsChangingQty] = useState(false);
  const [currentItemIdChange, setCurrentItemIdChange] = useState(-1);
  const updateQty = async (itemId, method) => {
    setCurrentItemIdChange(itemId);
    try {
      setIsChangingQty(true);
      const response = await controlQtyService(auth?.cartId, itemId, method);
      setTimeout(() => {
        setIsChangingQty(false);
      }, 200);
      setCart(response);
    } catch (err) {
      console.error(err);
    }
  };

  const [checkoutList, setCheckoutList] = useState([]);
  const [selectAllItems, setSelectAllItems] = useState(false);
  const selectAllToCheckout = () => {
    if (selectAllItems) {
      setCheckoutList([]);
    } else {
      setCheckoutList([...cart]);
    }
    setSelectAllItems(!selectAllItems);
    console.log(cart);
  };

  const handleSelectChange = (itemId, idx) => {
    const itemIndex = checkoutList.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const updatedCheckoutList = [...checkoutList];
      updatedCheckoutList.splice(itemIndex, 1);
      setCheckoutList(updatedCheckoutList);
    } else {
      setCheckoutList([...checkoutList, cart[idx]]);
    }
  };

  useEffect(() => {
    if (checkoutList.length === cart.length) {
      setSelectAllItems(true);
    } else {
      setSelectAllItems(false);
    }
  }, [checkoutList, cart]);

  console.log("ckl=" + checkoutList);
  console.log("cart=" + cart);
  return (
    <section className="cart-container-section ">
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          theme="dark"
          transition={Bounce}
          success
        />
      </div>
      <DeleteProductModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        cartId={auth?.cartId}
        itemId={selectedDeleteWatchId}
        toast={notify}
      />
      <div className="cart-container container">
        <h4>My Shopping Cart ({cart?.length})</h4>
        {cart && cart.length > 0 && (
          <div className="cart-select-info">
            <button className="select-all-btn" onClick={selectAllToCheckout}>
              {selectAllItems ? "Bỏ chọn" : "Chọn tất cả"}
            </button>
            <div>
              <div style={{ color: "#fff" }}>
                {checkoutList.length > 0
                  ? checkoutList.length > 1
                    ? `${checkoutList.length} items selected`
                    : `${checkoutList.length} item selected`
                  : "Hãy chọn sản phẩm ưng ý của bạn"}
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={{ color: "#fff", fontWeight: "bold" }}>
                Tổng: 100,000,000đ
              </span>
              <button className="checkout-btn">Thanh toán/Mua hàng</button>
            </div>
          </div>
        )}
        {/* <div className="line-container">
          <span className="line"></span>
        </div> */}
        {cart && cart.length <= 0 ? (
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
                      <input
                        type="checkbox"
                        name=""
                        id={`list-items-${idx}`}
                        onChange={() => handleSelectChange(item.id, idx)}
                        checked={checkoutList.some(
                          (checkoutItem) => checkoutItem.id === item.id
                        )}
                      />
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
                      {/* <p> */}
                      <div className="quantity-control position-relative">
                        <div
                          className={`${
                            isChangingQty && currentItemIdChange === item.id
                              ? "qty-spinner"
                              : ""
                          }`}
                        ></div>

                        <button
                          className="de-button"
                          onClick={() => updateQty(item.id, "decrease")}
                        >
                          -
                        </button>
                        <input
                          id="quantityInput"
                          className="input-quantity"
                          type="number"
                          value={item.quantity}
                        />
                        <button
                          className="incr-button"
                          onClick={() => updateQty(item.id, "increase")}
                        >
                          +
                        </button>
                      </div>
                      {/* </p> */}
                    </td>
                    <td className="align-middle">
                      <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <button
                          className="delete-icon"
                          onClick={() => deleteFromBag(item.id)}
                        >
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
