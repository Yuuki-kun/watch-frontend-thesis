import React, { useEffect } from "react";
import Modal from "react-modal";
import "./change.address.modal.css";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { updateDefaultAddress } from "../../api/services/userService";
const ChangeAddressModal = ({
  isModalOpen,
  closeModal,
  userId,
  address,
  setAddress,
}) => {
  console.log(address);
  useEffect(() => {
    Modal.setAppElement("body");
    return () => {
      Modal.setAppElement(null);
    };
  }, []);
  const axiosPrivate = usePrivateRequest();
  const changeDefaultAddress = async (addressId) => {
    try {
      const response = await updateDefaultAddress(
        userId,
        addressId,
        axiosPrivate
      );
      response && setAddress(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        className="style-modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thay Đổi Địa Chỉ Mặc Định"
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
        <h2>Thay Đổi Địa Chỉ</h2>
        <p>Chọn địa chỉ giao hàng mà bạn muốn sử dụng</p>
        {address.map((ad) => (
          <>
            <div
              key={ad.id}
              className="address-content mdd"
              onClick={() => changeDefaultAddress(ad.id)}
            >
              <p className="ad-name">
                {ad.name} | <span>{ad.phone}</span>
                {ad.isDefault && (
                  <span
                    className="default-address"
                    style={{ color: "green", marginLeft: "1rem" }}
                  >
                    Đang dùng
                  </span>
                )}
              </p>
              <p className="ad-address">
                <span className="ad-type">
                  {ad.type === "PRIVATE" ? "Nhà riêng" : "Công ty"}
                </span>{" "}
                {ad.address}, Phường {ad.ward}, Quận {ad.district}, {ad.city}
              </p>
            </div>
          </>
        ))}
        <button className="modal-btn modal-accept-btn" onClick={closeModal}>
          Đóng
        </button>
      </Modal>
    </>
  );
};

export default ChangeAddressModal;
