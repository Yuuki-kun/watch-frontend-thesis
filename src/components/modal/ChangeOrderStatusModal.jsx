import React, { useEffect } from "react";
import Modal from "react-modal";
import EastIcon from "@mui/icons-material/East";
import ClockLoader from "../ClockLoader";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { changeOrderStatus } from "../../api/services/admin/OrderServices";
const ChangeOrderStatusModal = ({
  isModalOpen,
  closeModal,
  orderId,
  currentStatus,
  customer,
  orders,
  setOrders,
  currentPage,
  type,
  currentSize,
  setTodayOrders,
}) => {
  const axiosPrivate = usePrivateRequest();

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {
      Modal.setAppElement(null);
    };
  }, []);
  console.log(orderId, currentStatus);
  const [newStatus, setNewStatus] = React.useState(currentStatus || "");
  const [isChangingStatus, setIsChangingStatus] = React.useState(false);

  const handleSelectionChange = (event) => {
    setNewStatus(event.target.value);
  };
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
  console.log(customer);

  const handleChangeStatus = async () => {
    const result = window.confirm(
      "Thay đổi trạng thái đơn hàng #" +
        orderId +
        " từ " +
        currentStatus +
        " thành " +
        newStatus +
        "?"
    );
    if (result) {
      // User clicked OK
      console.log("User accepted.");
      setIsChangingStatus(true);
      try {
        const res = await changeOrderStatus(
          axiosPrivate,
          orderId,
          newStatus,
          currentPage
        );
        // const orders = await getAllOrders(
        //   axiosPrivate,
        //   currentSize,
        //   currentPage,
        //   type
        // );

        const updatedOrders = orders.map((order) => {
          if (order.id === res.id) {
            return res; // Thay thế đối tượng cũ bằng đối tượng mới được trả về từ API
          }
          return order; // Trả về đối tượng hiện tại nếu không phải là đối tượng cần cập nhật
        });

        setOrders(updatedOrders); // C
        setIsChangingStatus(false);

        closeModal();
      } catch (err) {
        console.error(err);
      }
    } else {
      // User clicked Cancel
      console.log("User canceled.");
    }
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
        <h3>Thay Đổi Trạng Thái Đơn Hàng #{orderId}</h3>
        <h5 style={{ fontWeight: "600" }}>Khách hàng: {customer}</h5>
        <p>Chọn trạng thái mới cho đơn hàng.</p>
        <div className="d-flex align-items-center w-100 gap-3 mt-2">
          <div
            className="currentStt"
            style={{ fontSize: "16px", fontWeight: "bold", color: "blue" }}
          >
            {currentStatus}
          </div>
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
              value="PREPARING"
            >
              PREPARING
            </option>
            <option value="SHIPPING">SHIPPING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
        <div className="mt-3 fs-6">
          Trạng thái đơn hàng sẽ được chuyển từ{" "}
          <span style={{ color: "blue", fontWeight: "600" }}>
            {currentStatus}
          </span>{" "}
          thành{" "}
          <span style={{ color: "red", fontWeight: "600" }}>{newStatus}</span>
        </div>
        <button
          className="modal-btn modal-accept-btn"
          onClick={handleChangeStatus}
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

export default ChangeOrderStatusModal;
