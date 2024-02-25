import React, { useEffect } from "react";
import Modal from "react-modal";
import { removeFromBagService } from "../../api/services/cartService";
import useCart from "../../hooks/useCart";

const DeleteProductModal = ({
  isModalOpen,
  closeModal,
  cartId,
  itemId,
  toast,
}) => {
  const { setCart } = useCart();

  useEffect(() => {
    Modal.setAppElement("body");
    return () => {
      Modal.setAppElement(null);
    };
  }, []);
  const deleteItems = async () => {
    console.log(cartId, itemId);
    const deleteItemResponse = await removeFromBagService(cartId, itemId);
    setCart(deleteItemResponse);
    toast();
    closeModal();
  };

  return (
    <>
      <Modal
        className="style-modal"
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thông Báo"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            // width: "350px",
            // height: "200px",
            margin: "auto",
            marginTop: "20%",
          },
        }}
      >
        <h2>Xóa sản phẩm</h2>
        <p>Bạn có muốn xóa sản phẩm đang chọn?</p>
        <button className="modal-btn modal-accept-btn" onClick={deleteItems}>
          Xác nhận
        </button>
        <button className="modal-btn modal-decline-btn" onClick={closeModal}>
          Hủy
        </button>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
