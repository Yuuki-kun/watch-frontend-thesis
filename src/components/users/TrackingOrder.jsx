import React, { useEffect } from "react";
import HeaderNavigate from "../HeaderNavigate";
import "./style.user.tracking_order.css";
import { FaCheck } from "react-icons/fa6";
import { CgSmileNone } from "react-icons/cg";
import { FaRegSmileBeam } from "react-icons/fa";
import { PiSmileySad } from "react-icons/pi";
import { FiTruck } from "react-icons/fi";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { retrieveOrder } from "../../api/services/admin/OrderServices";
import { useParams } from "react-router-dom";
import ClockLoader from "../ClockLoader";

const TrackingOrder = () => {
  const [currentStatus, setCurrentStatus] = React.useState(-1);
  const [orderInfo, setOrderInfo] = React.useState(null);
  const { id } = useParams();
  const axiosPrivate = usePrivateRequest();
  const [isFetching, setIsFetching] = React.useState(false);
  console.log(id);
  useEffect(() => {
    // fetch data from server
    // setOrderInfo(data)
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const data = await retrieveOrder(axiosPrivate, id);
        console.log(data);
        setOrderInfo(data);
        setIsFetching(false);
        setCurrentStatus(data?.orderStatus?.code);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };

  return (
    <>
      {isFetching && <ClockLoader />}
      <HeaderNavigate
        father={"user-info"}
        navigateFrom="user-orders"
        currentPos={"tracking-order"}
      />
      <div className="tracking-container">
        <h5>Tracking Order</h5>
        <div className="user-od-head-info">
          <div className="fs-6">
            Chi tiết đơn hàng{" "}
            <span style={{ fontWeight: "bold" }}>#{orderInfo?.id} - </span>
            <span style={{ color: "#f00", fontWeight: "bold" }}>
              {orderInfo?.orderStatus?.status === "SHIPPING"
                ? "Đang giao hàng"
                : orderInfo?.orderStatus?.status === "CREATED"
                ? "Chờ thanh toán"
                : orderInfo?.orderStatus?.status === "CONFIRMED"
                ? "Đã xác nhận"
                : orderInfo?.orderStatus?.status === "PREPARING"
                ? "Đang chuẩn bị"
                : orderInfo?.orderStatus?.status === "DELIVERED"
                ? "Đã giao"
                : orderInfo?.orderStatus?.status === "CANCELED"
                ? "Đã hủy"
                : orderInfo?.orderStatus?.status === "REFUNDED"
                ? "Đã hoàn tiền"
                : orderInfo?.orderStatus?.status === "PENDING"
                ? "Chờ xác nhận"
                : orderInfo?.orderStatus?.status === "REFUSED"
                ? "Đã từ chối"
                : "Không xác định"}
            </span>
          </div>
          <div>
            Ngày đặt hàng:{" "}
            <span>{new Date(orderInfo?.orderDate).toLocaleString()}</span>
          </div>
          <div>
            Last updated: <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
        <div className="user-od-head-info mt-3">
          <div className="fs-6">
            Giao đến:{" "}
            <span style={{ fontStyle: "italic" }}>
              {orderInfo?.address?.type === "PRIVATE"
                ? "Nhà riêng - "
                : "Công ty/Tổ chức - "}
            </span>
            <span style={{ fontWeight: "bold" }}>
              {orderInfo?.address?.address}, phường {orderInfo?.address?.ward},
              quận {orderInfo?.address?.district}, thành phố{" "}
              {orderInfo?.address?.city}
            </span>
          </div>
          <div>
            Người nhận: <span>Anh Tong Cong Minh, 0909090909</span>
          </div>
          {/* <div>
            Đã bắt đầu giao hàng lúc: <span>{new Date().toLocaleString()}</span>
            , dự kiến giao hàng vào: <span>{new Date().toLocaleString()}</span>
          </div> */}
          {/* <div>
            Phí vận chuyển: <span>22,000d</span>
          </div> */}
          <div>
            Hình thức thanh toán:{" "}
            <span>
              {orderInfo?.payment?.paymentMethod === "card"
                ? "Thanh toán trực tuyến"
                : "Thanh toán bằng tiền mặt"}
            </span>
          </div>
        </div>
        <div className="user-od-shipment-info">
          <div className="fs-6 shipment-icons-expl">
            <div className="se-content">
              <FaCheck size={20} color="green" />{" "}
              <span style={{ fontStyle: "italic" }}>Đã xong</span>
            </div>
            <div className="se-content">
              <FaRegSmileBeam size={20} color="green" />{" "}
              <span style={{ fontStyle: "italic" }}>Đang xử lý</span>
            </div>
            <div className="se-content">
              <CgSmileNone size={20} color="#99adc4" />{" "}
              <span style={{ fontStyle: "italic" }}>Đang chờ</span>
            </div>
          </div>
          <div className="fs-6 shipment-progress">
            <div className="sp-status-container" key={1}>
              <span
                className={`sp-circle-stt ${
                  1 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                {1 === currentStatus ? (
                  <FaRegSmileBeam size={20} />
                ) : 1 <= currentStatus ? (
                  <FaCheck size={20} />
                ) : (
                  <CgSmileNone size={20} />
                )}{" "}
              </span>
              <span
                className={`sp-content ${
                  1 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                Đã tạo
              </span>
            </div>
            <div
              className={`sp-status-line ${
                3 <= currentStatus ? "sp-current-status" : ""
              }  ${3 === currentStatus ? "sp-current-status-progress" : ""}`}
            ></div>
            <div className="sp-status-container" key={3}>
              <span
                className={`sp-circle-stt ${
                  3 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                {3 === currentStatus ? (
                  <FaRegSmileBeam size={20} />
                ) : 3 <= currentStatus ? (
                  <FaCheck size={20} />
                ) : (
                  <CgSmileNone size={20} />
                )}{" "}
              </span>
              <span
                className={`sp-content ${
                  3 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                Đã xác nhận
              </span>
            </div>
            <div
              className={`sp-status-line ${
                4 <= currentStatus ? "sp-current-status" : ""
              } ${4 === currentStatus ? "sp-current-status-progress" : ""}`}
            ></div>
            <div className="sp-status-container" key={4}>
              <span
                className={`sp-circle-stt ${
                  4 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                {4 === currentStatus ? (
                  <FaRegSmileBeam size={20} />
                ) : 4 <= currentStatus ? (
                  <FaCheck size={20} />
                ) : (
                  <CgSmileNone size={20} />
                )}{" "}
              </span>
              <span
                className={`sp-content ${
                  4 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                Đang chuẩn bị
              </span>
            </div>

            <div
              className={`sp-status-line ${
                5 <= currentStatus ? "sp-current-status" : ""
              } ${5 === currentStatus ? "sp-current-status-progress" : ""}`}
            ></div>
            <div className="sp-status-container" key={5}>
              <span
                className={`sp-circle-stt ${
                  5 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                {5 === currentStatus ? (
                  <FaRegSmileBeam size={20} />
                ) : 5 <= currentStatus ? (
                  <FaCheck size={20} />
                ) : (
                  <CgSmileNone size={20} />
                )}{" "}
              </span>
              <span
                className={`sp-content ${
                  5 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                Đang vận chuyển
              </span>
            </div>

            <div
              className={`sp-status-line ${
                6 <= currentStatus ? "sp-current-status" : ""
              } ${6 === currentStatus ? "sp-current-status-progress" : ""}`}
            ></div>
            <div className="sp-status-container" key={6}>
              <span
                className={`sp-circle-stt ${
                  6 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                {6 === currentStatus ? (
                  <FaRegSmileBeam size={20} />
                ) : 6 <= currentStatus ? (
                  <FaCheck size={20} />
                ) : (
                  <CgSmileNone size={20} />
                )}{" "}
              </span>
              <span
                className={`sp-content ${
                  6 <= currentStatus ? "sp-current-status" : ""
                }`}
              >
                Đã giao
              </span>
            </div>
          </div>
          <div className="od-curr-stt-desc">
            {orderInfo?.orderStatus?.status === "SHIPPING" && (
              <span>
                Đơn hàng của bạn đang trên đường vận chuyển rồi nhé.
                <FiTruck size={20} />{" "}
              </span>
            )}
            {orderInfo?.orderStatus?.status === "CREATED" && (
              <span>Hãy tiếp tục thanh toán đơn hàng bạn.</span>
            )}
          </div>
        </div>
        <div className="user-od-head-info mt-3 mb-5">
          <div class="table-responsive">
            <table class="table table-striped table-hover  align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Giảm giá</th>
                  <th>Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                {orderInfo?.orderDetails.map((detail, idx) => (
                  <tr key={detail.id}>
                    <td>{idx + 1}</td>
                    <td>
                      <div className="d-flex gap-2 align-items-center">
                        <img
                          src={findMainImage(detail.watch.images)}
                          alt=""
                          className="img-fluid"
                          style={{ width: "100px", height: "auto" }}
                        />
                        <div>
                          <h5>{detail.watch.name}</h5>
                          <span>{detail.watch.brand.brandName}</span>
                        </div>
                      </div>
                    </td>
                    <td>{(detail.price * 1000).toLocaleString("vi-VN")} VND</td>
                    <td>{detail.quantity}</td>
                    <td>{detail.discount}</td>
                    <td>{detail.amount}</td>
                  </tr>
                ))}

                <tr>
                  <td colSpan="4"></td>
                  <td>
                    <span>Vận chuyển:</span>
                  </td>
                  <td>
                    {" "}
                    {orderInfo &&
                      (orderInfo?.shipping).toLocaleString("vi-VN")}{" "}
                    VND
                  </td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td>
                    <span>Tổng cộng:</span>
                  </td>
                  <td>
                    {" "}
                    {(orderInfo?.amount * 1000).toLocaleString("vi-VN")} VND
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrackingOrder;
