import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import EastIcon from "@mui/icons-material/East";
import ClockLoader from "../ClockLoader";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { changeOrderStatus } from "../../api/services/admin/OrderServices";
const RefundModal = ({
  isModalOpen,
  closeModal,
  orderId,
  refundedOrderHandle,
}) => {
  const axiosPrivate = usePrivateRequest();

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {
      Modal.setAppElement(null);
    };
  }, []);

  const selectStyles = {
    padding: "5px 10px",
    paddingRight: "30px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    cursor: "pointer",
    appearance: "none" /* Remove default arrow icon */,
    backgroundImage:
      'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')' /* Custom arrow icon */,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0px top 50%",
    backgroundSize: "24px",
    backgroundColor: "#fff",
    fontWeight: "600",
  };
  const hoverStyles = {
    borderColor: "#999",
  };

  // CSS styles for focus effect
  const focusStyles = {
    borderColor: "#333",
  };

  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const handleSelectionChange = (e) => {
    setNewStatus(e.target.value);
  };
  return (
    <>
      {isChangingStatus && (
        // <div class="loader-container">
        //   <div class="loader"></div>
        // </div>
        <ClockLoader />
      )}
      <Modal
        className="style-modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thay Đổi Trạng Thái Đơn Hàng"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "650px",
            height: "auto",
            margin: "auto",
            marginTop: "20%",
          },
        }}
      >
        {" "}
        <h3>Hoàn tiền cho đơn hàng #{orderId}</h3>
        {/* <h5 style={{ fontWeight: "600" }}>Khách hàng: {customer}</h5> */}
        <p>Lý do hoàn tiền.</p>
        <div className="d-flex align-items-center w-100 gap-3 mt-2">
          <EastIcon />
          <select
            name="orderStatus"
            id="orderStatus"
            value={newStatus}
            onChange={handleSelectionChange}
            style={selectStyles} // Apply styles directly using the style attribute
            onMouseEnter={() => {
              // Apply hover effect
              document.getElementById("orderStatus").style.borderColor =
                hoverStyles.borderColor;
            }}
            onMouseLeave={() => {
              // Remove hover effect
              document.getElementById("orderStatus").style.borderColor =
                selectStyles.borderColor;
            }}
            onFocus={() => {
              // Apply focus effect
              document.getElementById("orderStatus").style.borderColor =
                focusStyles.borderColor;
            }}
            onBlur={() => {
              // Remove focus effect
              document.getElementById("orderStatus").style.borderColor =
                selectStyles.borderColor;
            }}
          >
            <option value=""></option>
            <option
              style={{ backgroundColor: "red !important" }}
              value="CUSTOMER_REQUEST"
            >
              Khách hàng yêu cầu
            </option>
            <option value="FRAUDULENT">Đơn hàng gian lận</option>
            <option value="OUT_OF_STOCK">Hết hàng</option>
            <option value="OTHER">Lý do khác</option>
          </select>
        </div>
        <button
          className="modal-btn modal-accept-btn"
          onClick={() => refundedOrderHandle(orderId, newStatus)}
        >
          Xác nhận
        </button>
        <button
          className="modal-btn"
          style={{ border: "2px solid red" }}
          onClick={closeModal}
        >
          Đóng
        </button>
      </Modal>
    </>
  );
};

export default RefundModal;
