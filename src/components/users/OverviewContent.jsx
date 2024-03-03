import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { LuPencilLine } from "react-icons/lu";

const OverviewContent = () => {
  const { auth } = useAuth();
  const [customerInfo, setCustomerInfo] = useState({}); // Khởi tạo state customerInfo với giá trị ban đầu là một object rỗng
  const axiosPrivate = usePrivateRequest(); // Sử dụng hook usePrivateRequest để gửi request API  với token
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(
          `/api/v1/user/cus-info/${auth?.userId}`
        ); // Gửi request API để lấy thông tin của khách hàng
        setCustomerInfo(res.data); // Cập nhật state customerInfo với dữ liệu lấy được từ API
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(); // Gọi hàm async fetchData để lấy dữ liệu
  }, [auth.userId]);
  console.log(customerInfo);

  return (
    <div className="ui-content">
      <div className="overview-info">
        <div className="overview-user-avatar">
          <img
            src={customerInfo.avatarLink}
            alt="avatar"
            className="user-avatar-img"
          />
        </div>
        <div className="user-info">
          <div className="user-username-container">
            {" "}
            <h2 className="user-info-name">
              {customerInfo.firstName} {customerInfo.lastName}
              <span style={{ fontWeight: "400" }}>
                {" "}
                &sdot; {customerInfo.gender === "1" ? "Male" : "Female"}
              </span>
            </h2>
            <button className="change-info-button">
              <LuPencilLine size={22} />
            </button>
          </div>

          <p className="user-info-email">{customerInfo.email}</p>
          <p className="user-info-phone">{customerInfo.phoneNumber}</p>
        </div>
      </div>
      <span className="user-join-date">
        Đã tham gia vào:{" "}
        <span className="user-join-date full-year">23/11/2024</span>
      </span>
      <div className="line-container">
        <span className="line"></span>
      </div>
      <div className="user-address-book">
        <h6>Sổ Địa Chỉ</h6>
        <div className="add-address">
          <button className="add-address-button">Thêm địa chỉ mới</button>
        </div>
        {customerInfo.shippingAddresses &&
          customerInfo.shippingAddresses.map((address, idx) => (
            <div className="address-content" key={idx}>
              <p className="user-info-fullname">{address.name}</p>
              <span className="address-type">
                {address.type === "PRIVATE" ? "Nhà Riêng" : "Công Ty/Tổ Chức"}
              </span>
              <p className="user-info-address">
                <span className="address-label">Địa chỉ:</span>{" "}
                {address.address}, Phường {address.ward}, Quận{" "}
                {address.district}, {address.city}
              </p>
              <p className="user-info-phone">
                <span className="address-label">Điện thoại:</span>{" "}
                {address.phone}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OverviewContent;
