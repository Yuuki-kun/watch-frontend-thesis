import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { LuPencilLine } from "react-icons/lu";
import axios from "../../api/axios";

const OverviewContent = () => {
  const { auth } = useAuth();
  const [customerInfo, setCustomerInfo] = useState({}); // Khởi tạo state customerInfo với giá trị ban đầu là một object rỗng
  const axiosPrivate = usePrivateRequest(); // Sử dụng hook usePrivateRequest để gửi request API  với token
  const [avtFile, setAvtFile] = useState(null); // Khởi tạo state avtFile với giá trị ban đầu là null
  const [isChangingAvt, setIsChangingAvt] = useState(false); // Khởi tạo state isChangingAvt với giá trị ban đầu là false
  const avtInputRef = React.createRef(); // Tạo ref cho input file
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
  const handleChangeAvt = (e) => {
    setAvtFile(e.target.files[0]);
    setIsChangingAvt(true);
  };

  const handleSaveAvt = async () => {
    const formData = new FormData();
    formData.append("updateAvatar", avtFile);
    try {
      const res = await axiosPrivate.post(
        `/api/v1/user/cus-info/${auth?.userId}/avatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCustomerInfo(res.data);
      setAvtFile(null);
      setIsChangingAvt(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handChangeDefaultAddress = async (addressId) => {
    try {
      const res = await axiosPrivate.put(
        `/api/v1/user/cus-address/default/${auth?.userId}/${addressId}`
      );
      customerInfo.shippingAddresses.forEach((address) => {
        if (address.id === addressId) {
          address.isDefault = true;
        } else {
          address.isDefault = false;
        }
      });
      setCustomerInfo({ ...customerInfo });
    } catch (err) {
      console.error(err);
    }
  };

  const removeAddress = async (e, addressId) => {
    e.stopPropagation();
    try {
      const res = await axiosPrivate.delete(
        `/api/v1/user/cus-address/${auth?.userId}/${addressId}`
      );
      setCustomerInfo({
        ...customerInfo,
        shippingAddresses: customerInfo.shippingAddresses.filter(
          (address) => address.id !== addressId
        ),
      });
    } catch (err) {
      console.error(err);
    }
  };
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

  const [districts, setDistricts] = useState([]); //districts of selected province
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [wards, setWards] = useState([]); //wards of selected district
  const [selectedWard, setSelectedWard] = useState("");

  const [selectedType, setSelectedType] = useState("PRIVATE");
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const [showOtherTypeField, setShowOtherTypeField] = useState(false);
  const showAddNewAddress = async () => {
    setShowOtherTypeField(!showOtherTypeField);
    if (!showOtherTypeField) {
      try {
        const res = await axios.get("/api/v1/location/provinces");
        console.log(res.data);
        setProvinces(res.data);
        setSelectedDistrict("");
      } catch (err) {
        console.error(err);
      }
    }
  };
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  const handleDistrictChange = (event) => {
    console.log(event.target);
    setSelectedDistrict(event.target.value);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const res = await axios.get(
            `/api/v1/location/provinces/${selectedProvince}/districts`
          );
          setDistricts(res.data);
          setSelectedWard("");
        } catch (err) {
          console.error(err);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const res = await axios.get(
            `/api/v1/location/districts/${selectedDistrict}/wards`
          );
          setWards(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict, districts]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressInput, setAddressInput] = useState("");

  const handleSubmitNewAddress = async (e) => {
    e.preventDefault();

    const newAddress = {
      name,
      address: addressInput,
      city: selectedProvince,
      district: selectedDistrict,
      ward: selectedWard,
      type: selectedType,
      phone: phone,
      isDefault: true,
    };
    console.log(newAddress);
    try {
      const res = await axiosPrivate.post(
        `/api/v1/user/${auth.userId}/address`,
        newAddress
      );
      console.log(res.data);

      setShowOtherTypeField(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  const [isEditingUserInfo, setIsEditingUserInfo] = useState(false);
  const [updateUserInfo, setUpdateUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });
  useEffect(() => {
    setUpdateUserInfo({
      firstName: customerInfo.firstName,
      lastName: customerInfo.lastName,
      email: customerInfo.email,
      phoneNumber: customerInfo.phoneNumber
        ? customerInfo.phoneNumber
        : "Chưa cập nhật",
      gender: customerInfo.gender,
    });
  }, [customerInfo]);

  const handleChange = (e) => {
    setUpdateUserInfo({ ...updateUserInfo, [e.target.name]: e.target.value });
  };

  const handleUpdateUserInfo = async () => {
    try {
      const res = await axiosPrivate.put(
        `/api/v1/user/cus-info/${auth?.userId}`,
        updateUserInfo
      );
      setCustomerInfo(res.data);
      setIsEditingUserInfo(false);
    } catch (err) {
      console.error(err);
    }
    console.log(updateUserInfo);
  };
  return (
    <div className="ui-content">
      <div className="overview-info">
        <div className="overview-user-avatar">
          <img
            // src={customerInfo.avatarLink}
            src={
              avtFile
                ? URL.createObjectURL(avtFile)
                : `http://localhost:8080/image/fileSystem/avatar/${customerInfo.avatarLink}`
            }
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
                &sdot; {customerInfo.gender === "Male" ? "Nam" : "Nữ"}
              </span>
            </h2>
            <button
              className="change-info-button"
              onClick={() => setIsEditingUserInfo(!isEditingUserInfo)}
            >
              <LuPencilLine size={22} />
            </button>
          </div>

          <p className="user-info-email">{customerInfo.email}</p>
          <p className="user-info-phone">{customerInfo.phoneNumber}</p>
        </div>
      </div>

      {isEditingUserInfo && (
        <div className="mt-3">
          <label htmlFor="">
            <span>Tên</span>
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={updateUserInfo.firstName}
            disabled={!isEditingUserInfo}
            onChange={handleChange}
            className="form-control"
            style={{
              width: "50%",
            }}
          />

          <label htmlFor="">
            {" "}
            <span>Họ</span>
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={updateUserInfo.lastName}
            disabled={!isEditingUserInfo}
            onChange={handleChange}
            className="form-control"
            style={{
              width: "50%",
            }}
          />
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={updateUserInfo.email}
            disabled={!isEditingUserInfo}
            onChange={handleChange}
            className="form-control"
            style={{
              width: "50%",
            }}
          />
          <label htmlFor="">Số điện thoại</label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={updateUserInfo.phoneNumber}
            disabled={!isEditingUserInfo}
            onChange={handleChange}
            className="form-control"
            style={{
              width: "50%",
            }}
          />

          <label htmlFor="">Giới tính</label>
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            value={updateUserInfo.gender}
            className="form-control"
            style={{
              width: "50%",
            }}
          >
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
          </select>
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => handleUpdateUserInfo()}
          >
            Lưu
          </button>
        </div>
      )}

      <div className="mt-3">
        <span
          style={{
            border: "none",
            color: "blue",
            fontSize: ".9rem",
            fontStyle: "italic",
            cursor: "pointer",
            marginRight: "20px",
          }}
        >
          Đổi ảnh đại diện
        </span>
        <input
          type="file"
          name=""
          id=""
          onChange={handleChangeAvt}
          ref={avtInputRef}
        />
        {isChangingAvt && (
          <button className="btn btn-dark" onClick={() => handleSaveAvt()}>
            Lưu
          </button>
        )}
        {isChangingAvt && (
          <button
            className="btn btn-danger"
            onClick={() => {
              setAvtFile(null);
              setIsChangingAvt(false);
              avtInputRef.current.value = null;
            }}
          >
            Hủy
          </button>
        )}

        <br />
        <span className="user-join-date">
          Đã tham gia vào:{" "}
          <span className="user-join-date full-year">23/11/2024</span>
        </span>
      </div>
      <div className="line-container">
        <span className="line"></span>
      </div>
      <div className="user-address-book">
        <h6>Sổ Địa Chỉ</h6>
        <div className="add-address">
          <button
            className="add-address-button"
            onClick={() => showAddNewAddress()}
          >
            Thêm địa chỉ mới
          </button>
        </div>
        {customerInfo.shippingAddresses &&
          customerInfo.shippingAddresses.map((address, idx) => (
            <div
              onClick={() => handChangeDefaultAddress(address.id)}
              className="address-content"
              style={{
                display: "flex",
                justifyContent: "space-between",

                padding: "10px",
                alignItems: "center",
              }}
              key={idx}
            >
              <div>
                <span className="default-address">
                  {address.isDefault ? "Địa chỉ mặc định" : ""}
                </span>

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
              <div>
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                    width: "50px",
                  }}
                  onClick={(e) => removeAddress(e, address.id)}
                >
                  -
                </button>
                {/* <button
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    border: "1px solid black",
                    cursor: "pointer",
                  }}
                >
                  Cập nhật
                </button> */}
              </div>
            </div>
          ))}
        {showOtherTypeField && (
          <div className="enter-ad-field">
            <div class="container">
              <form>
                <div class="mb-3 row w-100">
                  <label for="inputName" class="col-2 col-form-label">
                    Tên
                  </label>
                  <div class="col-10">
                    <input
                      value={name}
                      type="text"
                      class="form-control"
                      name="inputName"
                      id="inputName"
                      placeholder="Tên"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <label for="inputPhone" class="col-2 col-form-label">
                    Điện thoại
                  </label>
                  <div class="col-10">
                    <input
                      value={phone}
                      type="text"
                      class="form-control"
                      name="inputPhone"
                      id="inputPhone"
                      placeholder="phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="inputProvince" class="col-2 col-form-label">
                    Tỉnh/Thành phố
                  </label>
                  <div class="col-6">
                    <select
                      value={selectedProvince}
                      className="form-select"
                      name="inputProvince"
                      id="inputProvince"
                      placeholder="Tên"
                      onChange={handleProvinceChange}
                    >
                      <option value={""}></option>

                      {provinces &&
                        provinces.map((province) => (
                          <option value={province.name}>{province.name}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label for="inputDistrict" class="col-2 col-form-label">
                    Quận/Huyện
                  </label>
                  <div class="col-6">
                    <select
                      value={selectedDistrict}
                      className="form-select"
                      name="inputDistrict"
                      id="inputDistrict"
                      onChange={handleDistrictChange}
                    >
                      {" "}
                      <option value={""}></option>
                      {districts &&
                        districts.map((district) => (
                          <option value={district.name}>{district.name}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label for="inputWard" class="col-2 col-form-label">
                    Xã/Phường
                  </label>
                  <div class="col-6">
                    <select
                      value={selectedWard}
                      className="form-select"
                      name="inputWard"
                      id="inputWard"
                      onChange={handleWardChange}
                    >
                      {" "}
                      <option value={""}></option>
                      {wards &&
                        wards.map((ward) => (
                          <option value={ward.name}>{ward.name}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div class="mb-3 row w-100">
                  <label for="inputAddress" class="col-2 col-form-label">
                    Địa chỉ
                  </label>
                  <div class="col-10">
                    <input
                      type="text"
                      class="form-control"
                      name="inputAddress"
                      id="inputAddress"
                      placeholder="Địa chỉ"
                      value={addressInput}
                      onChange={(e) => setAddressInput(e.target.value)}
                    />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="inputTypePrivate" class="col-2 col-form-label">
                    Nhà riêng
                    <input
                      type="radio"
                      // name="inputType"
                      id="inputTypePrivate"
                      checked={selectedType === "PRIVATE"}
                      value={"PRIVATE"}
                      onChange={handleTypeChange}
                    />
                  </label>
                  <label htmlFor="inputTypeCompany">
                    Công ty
                    <input
                      type="radio"
                      // name="inputType"
                      id="inputTypeCompany"
                      checked={selectedType === "COMPANY"}
                      value={"COMPANY"}
                      onChange={handleTypeChange}
                    />
                  </label>
                </div>
                <button
                  onClick={(e) => handleSubmitNewAddress(e)}
                  class="btn btn-primary"
                >
                  Lưu
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewContent;
