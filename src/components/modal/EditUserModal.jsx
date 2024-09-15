import React, { useEffect } from "react";
import Modal from "react-modal";
import EastIcon from "@mui/icons-material/East";
import ClockLoader from "../ClockLoader";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { changeOrderStatus } from "../../api/services/admin/OrderServices";
import "./userModal.css";
const EditUserModal = ({
  isModalOpen,
  closeModal,
  customer,
  setUsers,
  currentPage,
}) => {
  const axiosPrivate = usePrivateRequest();

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {
      Modal.setAppElement(null);
    };
  }, []);
  //   console.log(orderId, currentStatus);

  // CSS styles for focus effect

  //   console.log(customer);
  const [isEditingUser, setIsEditingUser] = React.useState(false);
  const [customerName, setCustomerName] = React.useState("");
  const [customerEmail, setCustomerEmail] = React.useState("");
  const [customerPhone, setCustomerPhone] = React.useState("");
  // const [customer]
  return (
    <>
      {isEditingUser && (
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
            marginTop: "10%",
          },
        }}
      >
        {" "}
        <h3>Sửa thông tin</h3>
        {/* <h5 style={{ fontWeight: "600" }}>Khách hàng: {customerName}</h5> */}
        <div className="edit-user-form">
          <div className="edit-user-form-group">
            <label htmlFor="name">Tên người dùng</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tên người dùng"
            />
          </div>
          <div className="edit-user-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Email" />
          </div>
          <div className="edit-user-form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
            />
          </div>
          <div className="edit-user-form-group">
            <label htmlFor="address">Địa chỉ</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Địa chỉ"
            />
          </div>
          <div className="edit-user-form-group">
            <label htmlFor="role">Vai trò</label>
            <select name="role" id="role">
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
        </div>
        <button className="modal-btn modal-accept-btn">Xác nhận</button>
        <button className="modal-btn modal-decline-btn" onClick={closeModal}>
          Hủy
        </button>
      </Modal>
    </>
  );
};

export default EditUserModal;
