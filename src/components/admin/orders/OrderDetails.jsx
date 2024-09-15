import React from "react";
import { useParams } from "react-router-dom";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import {
  captureOrder,
  retrieveOrder,
} from "../../../api/services/admin/OrderServices";
import Header from "../Header";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegCircleXmark } from "react-icons/fa6";
import "./orders.styles.css";
import ClockLoader from "../../ClockLoader";
import RefundModal from "../../modal/RefundModal";
const OrderDetails = () => {
  const { id } = useParams();
  console.log("id", id);
  const axiosPrivate = usePrivateRequest();
  const [orderDetails, setOrderDetails] = React.useState({});
  const [isFetching, setIsFetching] = React.useState(false);
  React.useEffect(() => {
    setIsFetching(true);
    console.log("fetching");
    const getOrderDetails = async () => {
      try {
        const order = await retrieveOrder(axiosPrivate, id);
        setOrderDetails(order);
        setIsFetching(false);
        console.log(order);
      } catch (err) {
        console.error(err);
      }
    };
    getOrderDetails();
  }, [id]);

  const capturedOrderHandle = async (orderId) => {
    setIsFetching(true);
    try {
      const res = await captureOrder(axiosPrivate, orderId, "details");
      setOrderDetails(res);
      setIsFetching(false);
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  const refundedOrderHandle = async (orderId, reason) => {
    setIsFetching(true);
    try {
      const res = await axiosPrivate.post(
        `/api/v1/admin-order-mgt/refund-payment/${orderId}?reason=${reason}`
      );
      setOrderDetails(res.data);
      setIsFetching(false);
      // console.log(res);
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

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="ad-order-details-container">
      <RefundModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        orderId={id}
        refundedOrderHandle={refundedOrderHandle}
      />
      {isFetching && <ClockLoader />}
      <Header title={"Payment For Order #"} />
      <div className="ad-payment-amount">
        <div className="total-amount">
          {orderDetails && (orderDetails.amount * 1000).toLocaleString()} VND
        </div>
        <div className="order-status">
          <span>
            {" "}
            {orderDetails?.orderStatus?.status === "CREATED" &&
              "Chờ thanh toán"}
            {orderDetails?.orderStatus?.status === "SHIPPING" &&
              "Đang giao hàng"}
            {orderDetails?.orderStatus?.status === "DELIVERED" && "Đã giao"}
            {orderDetails?.orderStatus?.status === "CANCELLED" && "Đã hủy"}
            {orderDetails?.orderStatus?.status === "PENDING" && "Chờ xác nhận"}
            {orderDetails?.orderStatus?.status === "CONFIRMED" && "Đã xác nhận"}
            {orderDetails?.orderStatus?.status === "REFUSED" && "Đã từ chối"}
            {orderDetails?.orderStatus?.status === "PREPARING" &&
              "Đang chuẩn bị"}
            {orderDetails?.orderStatus?.status === "REFUNDED" && "Đã hoàn tiền"}
          </span>
        </div>
        <div className="v-line-container">
          <span className="v-line"></span>
        </div>
        <div>
          <span style={{ marginRight: "5px" }}>
            {orderDetails?.orderStatus?.description}{" "}
          </span>
          <IoMdCheckmarkCircleOutline />
        </div>

        <div className="ad-pi-container">
          <span className="pi-id">{orderDetails?.paymentIntentId}</span>
          {/* <div className="payment-action-button">
            <button className="pi-action-btn capture-btn">
              <IoMdCheckmarkCircleOutline />
              Capture
            </button>
            <button className="pi-action-btn cancel-btn">
              <FaRegCircleXmark />
              Cancel
            </button>
          </div> */}
        </div>
      </div>
      <div className="payment-action-button">
        {orderDetails?.orderStatus?.status === "PENDING" && (
          <>
            <button
              className="pi-action-btn capture-btn"
              onClick={() => capturedOrderHandle(orderDetails?.id)}
            >
              <IoMdCheckmarkCircleOutline />
              Capture
            </button>
            <button className="pi-action-btn cancel-btn">
              <FaRegCircleXmark />
              Cancel
            </button>
          </>
        )}
        {orderDetails?.orderStatus?.status !== "CAPTURED" &&
          orderDetails?.orderStatus?.status !== "CANCEL" &&
          orderDetails?.orderStatus?.status !== "DELIVERED" &&
          orderDetails?.orderStatus?.status !== "REFUNDED" &&
          orderDetails?.orderStatus?.status !== "PENDING" && (
            <button
              className="pi-action-btn capture-btn"
              onClick={() => openModal()}
            >
              <IoMdCheckmarkCircleOutline />
              Refund
            </button>
          )}
      </div>
      {orderDetails?.orderStatus?.status === "PENDING" && (
        <>
          <p className="mt-3">
            Thời gian xét duyệt đơn hàng có hiệu lực đến{" "}
            <span style={{ fontWeight: "bold" }}>
              {" "}
              {new Date(
                orderDetails?.payment?.captureBefore
              ).toUTCString()}{" "}
            </span>
          </p>
        </>
      )}
      <div className="line-container" style={{ marginTop: "1rem" }}>
        <span className="line"></span>
      </div>

      <div className="ad-pi-short-info-container">
        <div className="pi-info-content">
          <h6>Khách hàng</h6>

          <p>
            {orderDetails?.customer?.firstName +
              " " +
              orderDetails?.customer?.lastName}
          </p>
        </div>

        <div className="pi-info-content">
          <h6>Phương thức thanh toán</h6>
          <div className="d-flex align-items-center gap-2">
            {orderDetails?.payment?.paymentMethod === "card" ? (
              <>
                <img
                  src="../../../images/visa.png"
                  alt="visa"
                  className="pm-img img-fluid"
                />
                <p>********{orderDetails?.payment?.last4}</p>
              </>
            ) : (
              <p>Thanh toán bằng tiền mặt</p>
            )}
          </div>
        </div>
        {orderDetails?.payment?.paymentMethod === "card" && (
          <div className="pi-info-content">
            <h6>Payment Gateway </h6>
            <div className="d-flex align-items-center gap-2">
              <img
                // src="../../../images/stripe-logo-white-on-blue-gradient.png"
                src="https://cdn.dribbble.com/users/920/screenshots/3031540/media/2ecfcbed9c4931f3aa0f9fda2c8347a6.gif"
                alt="stripe"
                className="stripe-pm-img img-fluid"
              />
            </div>
          </div>
        )}
      </div>
      <div className="ad-checkout-summary-container">
        <h4 style={{ fontWeight: "700" }}>Tổng quan</h4>
        <div
          className="line-container"
          style={{ marginTop: 0, marginBottom: "1rem" }}
        >
          <span className="line"></span>
        </div>
        <h6>
          <span style={{ fontWeight: "bold" }}>Khách hàng</span>:{" "}
          {orderDetails?.customer?.firstName +
            " " +
            orderDetails?.customer?.lastName}
          , VN
        </h6>
        <h6>
          <span style={{ fontWeight: "bold" }}>Ngày đặt hàng</span>:{" "}
          {new Date(orderDetails?.orderDate).toLocaleString()}, VN
        </h6>
        {/* <h6>
          <span style={{ fontWeight: "bold" }}></span>:{" "}
          {new Date(orderDetails?.payment?.date).toLocaleString()}
        </h6> */}

        <table class="table caption-top table-hover align-middle ad-items-table">
          <caption>Danh sách sản phẩm</caption>
          <thead className="ad-item-thead">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Item</th>
              <th scope="col">S lượng</th>
              <th scope="col">Giá gốc</th>
              <th scope="col">Tổng</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails?.orderDetails?.map((item, index) => (
              <tr className="ad-item-row">
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={findMainImage(item?.watch.images)}
                    alt=""
                    className="ad-order-details-img img-fluid"
                  />
                  {item.watch.name}
                </td>
                <td>{item.quantity}</td>
                <td>
                  {(item.watch.defaultPrices * 1000).toLocaleString("vi-VN")}
                </td>
                <td>
                  {(item.quantity * item.price * 1000).toLocaleString("vi-VN")}
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className="fw-bold">Phí vận chuyển</td>
              <td className="fw-bold">
                {orderDetails?.shipping?.toLocaleString("vi-VN")} VND
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>

              <td className="fw-bold">Tổng cộng</td>
              <td className="fw-bold">
                {Math.round(orderDetails?.amount * 1000).toLocaleString(
                  "vi-VN"
                )}{" "}
                VND
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="ad-payment-details-cont">
        <h4 style={{ fontWeight: "700" }}>Payment Details</h4>
        <div className="line-container" style={{ marginTop: "0" }}>
          <span className="line"></span>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Utilizing Payment Service</h6>
          <p className="ad-pd-item-content">{orderDetails.amount} VND</p>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Amount</h6>
          <p className="ad-pd-item-content">{orderDetails.amount} VND</p>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Fee</h6>
          <p className="ad-pd-item-content">{orderDetails.amount} VND</p>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Net</h6>
          <p className="ad-pd-item-content">{orderDetails.amount} VND</p>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Status</h6>
          <p className="ad-pd-item-content">{orderDetails.amount} VND</p>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Description</h6>
          <p className="ad-pd-item-content">{orderDetails.amount} VND</p>
        </div>
      </div> */}

      <div className="ad-payment-method-cont">
        <h4 style={{ fontWeight: "700" }}>Phương thức thanh toán</h4>
        <div className="line-container" style={{ marginTop: "0" }}>
          <span className="line"></span>
        </div>
        <div className="ad-pm-content-cont">
          <div className="ad-pm-content-left">
            <div className="ad-pm-content">
              <h6 className="ad-pm-head">ID</h6>
              <p className="ad-pm-p-content">
                {orderDetails?.payment?.paymentMethod === "card"
                  ? orderDetails?.paymentIntentId
                  : "Tiền mặt"}
              </p>
            </div>
            <div className="ad-pm-content">
              <h6 className="ad-pm-head">Type</h6>
              <p className="ad-pm-p-content">
                {orderDetails?.payment?.paymentMethod === "card"
                  ? "Visa"
                  : "Tiền mặt"}
              </p>
            </div>
            {/* <div className="ad-pm-content">
              <h6 className="ad-pm-head">Issuer</h6>
              <p className="ad-pm-p-content">Stripe Payments UK Limited</p>
            </div> */}
            {orderDetails?.payment?.paymentMethod === "card" && (
              <div className="ad-pm-content">
                <h6 className="ad-pm-head">Number</h6>
                <p className="ad-pm-p-content">
                  *********{orderDetails?.payment?.last4}
                </p>
              </div>
            )}
            {orderDetails?.payment?.paymentMethod === "card" && (
              <div className="ad-pm-content">
                <h6 className="ad-pm-head">Expires</h6>
                <p className="ad-pm-p-content">
                  {orderDetails?.payment?.expMonth}/
                  {orderDetails?.payment?.expYear}
                </p>
              </div>
            )}
            {orderDetails?.payment?.paymentMethod === "card" && (
              <div className="ad-pm-content">
                <h6 className="ad-pm-head">CVC Check</h6>
                <p className="ad-pm-p-content">
                  {orderDetails?.payment?.cvcCheck}
                </p>
              </div>
            )}
          </div>

          <div className="ad-pm-content-right">
            {orderDetails?.payment?.paymentMethod === "card" && (
              <div className="ad-pm-content">
                <h6 className="ad-pm-head">Fingerprint</h6>
                <p className="ad-pm-p-content">
                  {" "}
                  {orderDetails?.payment?.fingerprint}
                </p>
              </div>
            )}

            <div className="ad-pm-content">
              <h6 className="ad-pm-head">Owner</h6>
              <p className="ad-pm-p-content">
                {orderDetails?.customer?.firstName +
                  " " +
                  orderDetails?.customer?.lastName}
              </p>
            </div>
            <div className="ad-pm-content">
              <h6 className="ad-pm-head">Owner email</h6>
              <p className="ad-pm-p-content">{orderDetails?.customer?.email}</p>
            </div>
            <div className="ad-pm-content">
              <h6 className="ad-pm-head">Phone</h6>
              <p className="ad-pm-p-content">
                {orderDetails?.customer?.phoneNumber}
              </p>
            </div>
            <div className="ad-pm-content">
              <h6 className="ad-pm-head">Origin</h6>
              <p className="ad-pm-p-content">VN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ad-payment-details-cont">
        <h4 style={{ fontWeight: "700" }}>Giao hàng</h4>
        <div className="line-container" style={{ marginTop: "0" }}>
          <span className="line"></span>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Người nhận</h6>
          <p className="ad-pd-item-content">
            {orderDetails?.address?.name}, {orderDetails?.address?.phone}
          </p>
        </div>
        <div className="ad-pd-content">
          <h6 className="ad-pd-header">Địa chỉ</h6>
          <p className="ad-pd-item-content">
            {orderDetails?.address?.address}, {orderDetails?.address?.ward},{" "}
            {orderDetails?.address?.district}, {orderDetails?.address?.city}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
