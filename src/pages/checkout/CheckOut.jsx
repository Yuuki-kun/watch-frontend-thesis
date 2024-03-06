import React, { useEffect, useState } from "react";
import "./checkout.css";
import useAuth from "../../hooks/useAuth";
import { getCustomerAddress } from "../../api/services/userService";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { useLocation } from "react-router-dom";
import { getCartItemsWithListId } from "../../api/services/cartService";
import ChangeAddressModal from "../../components/modal/ChangeAddressModal";
import createCheckoutSession from "../../api/services/checkoutService";
const CheckOut = () => {
  const { auth } = useAuth();
  const axiosPrivate = usePrivateRequest();
  const [items, setItems] = useState(
    localStorage.getItem("checkout-list") || []
  );
  const [address, setAddress] = useState([]);
  const [showOtherTypeField, setShowOtherTypeField] = useState(false);
  useEffect(() => {
    const fetchAddresses = async () => {
      if (auth.userId) {
        try {
          const addresses = await getCustomerAddress(auth.userId, axiosPrivate);
          addresses && setAddress(addresses);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchAddresses();
  }, [auth.userId]);

  console.log(items);
  console.log(address);
  const location = useLocation();
  console.log(location);
  const [itemDetails, setItemDetails] = useState([]);
  useEffect(() => {
    const fetchItems = async () => {
      const itemDetails = await getCartItemsWithListId(items, axiosPrivate);

      console.log(itemDetails);
      setItemDetails(itemDetails);
    };
    // if (!(location.state?.method === "checkout")) {
    //   return;
    // } else {
    //fetch cart items
    items && fetchItems();
    // }
    // return () => {
    //   localStorage.removeItem("checkout-list");
    // };
  }, []);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let total = 0;
    itemDetails.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [itemDetails]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeDefaultAddress = () => {
    openModal();
  };
  //after user selects checkout method, the order entity will be created) and set
  //the new cart items to the new order entity, then redirect user to the check out page
  // if checkout success => redirect to success page
  // else => redirect to error page
  const [isHandling, setIsHandling] = useState(false);
  const checkOutStripeHandle = async () => {
    setIsHandling(true);
    console.log(items);
    try {
      const response = await createCheckoutSession(
        auth?.userId,
        items,
        axiosPrivate
      );
      setIsHandling(false);
      window.location.href = response;
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="address-section">
      <ChangeAddressModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        userId={auth?.userId}
        address={address}
        setAddress={setAddress}
      />
      <div className="ck-container container">
        <h4 className="ck-title"> Review Your Order</h4>
        <div className="row">
          <div className="col-8">
            <div className="shipping-address">
              <h6>Chọn Địa Chỉ Giao Hàng</h6>
              <div className="current-address">
                <span>Giao đến</span>
                {address.map((ad) => (
                  <>
                    {ad.isDefault && (
                      <div key={ad.id} className="address-content">
                        <p className="ad-name">
                          {ad.name} | <span>{ad.phone}</span>
                        </p>
                        <p className="ad-address">
                          <span className="ad-type">
                            {ad.type === "PRIVATE" ? "Nhà riêng" : "Công ty"}
                          </span>{" "}
                          {ad.address}, Phường {ad.ward}, Quận {ad.district},{" "}
                          {ad.city}
                        </p>
                        <button
                          className="ad-other-btn"
                          onClick={changeDefaultAddress}
                        >
                          Chọn địa chỉ khác
                        </button>
                      </div>
                    )}
                  </>
                ))}
              </div>
              <div className="enter-other-address">
                <p>
                  Hoặc bạn muốn{" "}
                  <button
                    className="ad-other-btn new-ad"
                    onClick={() => setShowOtherTypeField(!showOtherTypeField)}
                  >
                    Nhập địa chỉ mới?
                  </button>
                </p>
                {showOtherTypeField && (
                  <div className="enter-ad-field">
                    <div class="container">
                      <form>
                        <div class="mb-3 row">
                          <label for="inputName" class="col-2 col-form-label">
                            Name
                          </label>
                          <div class="col-6">
                            <input
                              type="text"
                              class="form-control"
                              name="inputName"
                              id="inputName"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <fieldset class="mb-3 row">
                          <legend class="col-form-legend col-2">
                            Group name
                          </legend>
                          <div class="col-6">
                            you can use radio and checkboxes here
                          </div>
                        </fieldset>
                        <div class="mb-3 row">
                          <div class="offset-sm-4 col-sm-8">
                            <button type="submit" class="btn btn-primary">
                              Action
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
              <div className="checkout-methods-btn">
                <h6>Chọn Hình Thức Thanh Toán </h6>
                <div className="checkout-btn-container">
                  <button className="ck-btn cash-btn">
                    Thanh Toán Bằng Tiền Mặt
                  </button>
                  <div className="line-container">
                    <span className="line"></span>
                    <span
                      style={{
                        margin: "0 10px",
                        color: "ActiveBorder",
                        fontStyle: "italic",
                      }}
                    >
                      {" "}
                      Hoặc{" "}
                    </span>
                    <span className="line"></span>
                  </div>
                  <button
                    id="checkout-button"
                    className={`ck-btn stripe-btn ${
                      isHandling && "in-checkout-progress"
                    }`}
                    onClick={checkOutStripeHandle}
                  >
                    {isHandling ? "Waiting..." : "Thanh Toán Với Stripe"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="order-summary">
              <h6>Đơn Hàng</h6>
              {itemDetails.map((item) => (
                <div className="order-items" key={item.id}>
                  <div className="or-info">
                    <img
                      src={item.watch.images[0].image}
                      alt=""
                      className="or-img"
                    />
                    <span className="or-qty">&#215;{item.quantity}</span>
                    <span className="or-price">{item.price}&#8363;</span>
                  </div>
                  <div className="or-name">
                    <p>{item.watch.name}</p>
                  </div>
                </div>
              ))}
              <div className="line-container">
                <span className="line"></span>
              </div>
              <div className="total-price-info">
                <div className="tempo-price">
                  <p>Tạm tính: </p>
                  <p>{totalPrice}&#8363;</p>
                </div>
                <div className="tempo-price">
                  <p>Phí vận chuyển: </p>
                  <p>{totalPrice}&#8363;</p>
                </div>
                <div className="line-container">
                  <span className="line"></span>
                </div>
                <div className="tempo-price">
                  <p>Tổng Cộng: </p>
                  <p>{totalPrice}&#8363;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckOut;
