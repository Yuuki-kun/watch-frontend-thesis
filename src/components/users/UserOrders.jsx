import React, { useEffect, useState } from "react";
import "./style.user.order.css";
import { fetchOrders } from "../../api/services/userService";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import useAuth from "../../hooks/useAuth";
const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchOrders(auth?.userId, axiosPrivate);
        setOrders(res);
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.userId !== undefined) {
      fetchData();
    }
  }, [auth.userId]);
  console.log(orders);

  return (
    <div className="user-orders-container">
      <h6>Đơn Hàng</h6>
      <div className="u-order-options">
        <button>Tất cả</button>
        <button>Chờ thanh toán</button>
        <button>Đang vận chuyển</button>
        <button>Đã giao</button>
        <button>Đã hủy</button>
      </div>
      <div className="u-order-search-container">
        <input
          className="u-order-search"
          type="text"
          placeholder="Tìm đơn hàng của bạn theo mã đơn hàng, tên sản phẩm..."
        />
        <button className="u-order-search-btn">Tìm kiếm</button>
      </div>
      <div className="u-order-details-container">
        {orders?.map((order, idx) => (
          <div className="u-order-content" key={order.id}>
            <span>{order.orderStatus.status}</span>
            <span>{new Date(order.orderDate).toLocaleString()}</span>
            <div className="line-container">
              <span className="line"></span>
            </div>
            {order.orderDetails.map((detail, idx) => (
              <div className="u-order-content-row" key={detail.id}>
                <img
                  className="u-o-img"
                  src={detail.watch.images[0].image}
                  alt="watch"
                />
                <div className="u-o-info">
                  <p className="u-o-name">{detail.watch.name}</p>
                  <span>{detail.watch.brand.brandName}</span>
                </div>
                <div className="u-o-price">{detail.price}</div>

                <div className="line-container">
                  <span className="line"></span>
                </div>
              </div>
            ))}

            <div className="u-order-total-price">
              <span>Tổng tiền: {order.amount}</span>
              <div>
                <button className="u-o-row-btn">Mua Lại</button>
                <button className="u-o-row-btn">Xem Chi Tiết</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
