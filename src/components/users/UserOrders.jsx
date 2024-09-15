import React, { useEffect, useState } from "react";
import "./style.user.order.css";
import { fetchOrders } from "../../api/services/userService";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LeftReviewModal from "../modal/LeftReviewModal";
import {
  createMultiReview,
  createReview,
} from "../../api/services/reviewService";
import ClockLoader from "../ClockLoader";
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState("ALL");
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchOrders(
          auth?.userId,
          axiosPrivate,
          filterByStatus
        );
        setOrders(res);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.userId !== undefined) {
      fetchData();
    }
  }, [auth.userId, filterByStatus]);
  console.log(orders);
  const navigate = useNavigate();
  const handleViewOrderDetails = (orderId) => {
    navigate(`tracking/${orderId}`);
  };

  //modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [orderDetailsToReview, setOrderDetailsToReview] = React.useState([]);
  const openModal = (orderDetails) => {
    setOrderDetailsToReview(orderDetails);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitReview = async (review) => {
    try {
      setIsLoading(true);
      const res = await createMultiReview(axiosPrivate, review);
      console.log(res);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };

  const cancelOrder = async (orderId) => {
    console.log("cancel order" + orderId);
    const inputValue = window.prompt("Tại sao bạn muốn hủy đơn hàng?");
    if (inputValue !== null) {
      // Người dùng đã nhập một giá trị và nhấn OK
      console.log("Input value:", inputValue);
      try {
        const res = await axiosPrivate.post(
          `/api/v1/orders/cancel-order/${orderId}?reason=${inputValue}`
        );
        console.log(res);
        const canceledOrder = res.data;

        const orderIndex = orders.findIndex((order) => order.id === orderId);

        if (orderIndex !== -1) {
          const updatedOrders = [...orders];
          updatedOrders[orderIndex] = canceledOrder;
          setOrders(updatedOrders);
        } else {
          console.warn("Order not found in the orders list.");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Người dùng đã nhấn Cancel hoặc đóng cửa sổ
      console.log("User canceled the prompt.");
    }
  };
  // window.confirm("Are you sure you want to cancel this order?");
  const handleSearchOrder = async () => {
    const searchValue = document.querySelector(".u-order-search").value;
    if (searchValue === "") {
      alert("Vui lòng nhập từ khóa tìm kiếm");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axiosPrivate.get(
        `/api/v1/orders/search-order?userId=${auth.userId}&searchValue=${searchValue}`
      );
      console.log(res);
      setOrders(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };
  return (
    <div className="user-orders-container">
      {isLoading && <ClockLoader />}
      <LeftReviewModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        orderDetailsToReview={orderDetailsToReview}
        submitReview={submitReview}
        cusId={auth?.userId}
      />
      <h6>Đơn Hàng</h6>
      <div className="u-order-options">
        <button onClick={() => setFilterByStatus("ALL")}>Tất cả</button>
        <button onClick={() => setFilterByStatus("CREATED")}>
          Chờ thanh toán
        </button>
        <button onClick={() => setFilterByStatus("SHIPPING")}>
          Đang vận chuyển
        </button>
        <button onClick={() => setFilterByStatus("DELIVERED")}> Đã giao</button>
        <button onClick={() => setFilterByStatus("CANCELLED")}>Đã hủy</button>
      </div>
      <div className="u-order-search-container">
        <input
          className="u-order-search"
          type="text"
          placeholder="Tìm đơn hàng của bạn theo mã đơn hàng, tên sản phẩm..."
        />
        <button
          className="u-order-search-btn"
          onClick={() => handleSearchOrder()}
        >
          Tìm kiếm
        </button>
      </div>

      {/* order list */}
      <div className="u-order-details-container">
        {orders?.map((order, idx) => (
          <div className="u-order-content" key={order.id}>
            <h6>Đơn hàng #{order.id}</h6>
            <h6
              style={{
                marginBottom: "0",
                color:
                  order.orderStatus.status === "CANCELLED" ? "red" : "black",
              }}
            >
              {order.orderStatus.status === "CREATED" && "Chờ thanh toán"}
              {order.orderStatus.status === "SHIPPING" && "Đang giao hàng"}
              {order.orderStatus.status === "DELIVERED" && "Đã giao"}
              {order.orderStatus.status === "CANCELLED" && "Đã hủy"}
              {order.orderStatus.status === "PENDING" && "Chờ xác nhận"}
              {order.orderStatus.status === "CONFIRMED" && "Đã xác nhận"}
              {order.orderStatus.status === "REFUSED" && "Đã từ chối"}
              {order.orderStatus.status === "PREPARING" && "Đang chuẩn bị"}
              {order.orderStatus.status === "REFUNDED" && "Đã hoàn tiền"}
            </h6>
            <p>{order.orderStatus.description}</p>
            <span>{new Date(order.orderDate).toLocaleString()}</span>
            <div className="line-container">
              <span className="line"></span>
            </div>
            {order.orderDetails.map((detail, idx) => (
              <div className="u-order-content-row" key={detail.id}>
                <img
                  className="u-o-img"
                  src={findMainImage(detail.watch.images)}
                  alt="watch"
                />
                <div className="u-o-info">
                  <p className="u-o-name">{detail.watch.name}</p>
                  <span>{detail.watch.brand.brandName}</span>
                </div>
                <div className="u-o-price">
                  {(detail.price * 1000).toLocaleString("vi-VN")} VND
                </div>

                <div className="line-container">
                  <span className="line"></span>
                </div>
              </div>
            ))}

            <div className="u-order-total-price">
              <span>
                Tổng tiền: {(order.amount * 1000).toLocaleString("vn-VN")} VND
              </span>
              <div>
                {order.orderStatus.status === "CREATED" && (
                  <button
                    className="u-o-row-btn"
                    onClick={() => {
                      window.location.href = order?.paymentUrl;
                    }}
                  >
                    Tiếp Tục Thanh Toán
                  </button>
                )}
                {order.orderStatus.status === "DELIVERED" && (
                  <button
                    className="u-o-row-btn"
                    onClick={() => {
                      openModal(order.orderDetails);
                    }}
                  >
                    Viết nhận xét
                  </button>
                )}
                {order.orderStatus.status === "CREATED" ||
                  (order.orderStatus.status === "PENDING" && (
                    <button
                      className="u-o-row-btn cancel"
                      onClick={() => cancelOrder(order.id)}
                    >
                      Hủy Đơn Hàng
                    </button>
                  ))}
                {/* <button className="u-o-row-btn">Mua Lại</button> */}
                <button
                  className="u-o-row-btn"
                  onClick={() => handleViewOrderDetails(order.id)}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
