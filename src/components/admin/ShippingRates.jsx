import React, { useEffect, useState } from "react";
import axios from "../../api/axios";

const ShippingRates = () => {
  const [showOtherTypeField, setShowOtherTypeField] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [shippingRates, setShippingRates] = useState([]);

  useEffect(() => {
    const showAddNewAddress = async () => {
      try {
        const res = await axios.get("/api/v1/location/provinces");
        console.log(res.data);
        setProvinces(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchShippingRates = async () => {
      try {
        const res = await axios.get("/api/v1/location/shipping-rates");
        console.log(res.data);
        setShippingRates(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    showAddNewAddress();
    fetchShippingRates();
  }, []);
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  console.log(selectedProvince);
  const [shipping, SetShipping] = useState(0);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(0);
  console.log(shipping, freeShippingThreshold);
  const handleAddShippingRate = async () => {
    try {
      const res = await axios.post("/api/v1/location/shipping-rates", {
        province: selectedProvince,
        rate: shipping,
        freeShippingThreshold,
      });
      console.log(res.data);
      setShippingRates([...shippingRates, res.data]);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDeleteShippingRate = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/location/shipping-rates/${id}`);
      console.log(res.data);
      setShippingRates(shippingRates.filter((rate) => rate.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ margin: "16px" }}>
      <h5>Phí vận chuyển</h5>
      <button
        style={{
          backgroundColor: "green",
          color: "white",
          padding: "8px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
        onClick={() => setShowOtherTypeField(!showOtherTypeField)}
      >
        Thêm phí vận chuyển
      </button>
      {showOtherTypeField && (
        <div>
          <select
            style={{
              padding: "8px",
              margin: "8px 0",
            }}
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
            <option value="">Chọn tỉnh/thành phố</option>
            {provinces.map((province) => (
              <option
                key={province.id}
                value={province.id}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                {province.name}
              </option>
            ))}
          </select>
          <input
            style={{
              padding: "8px",
              margin: "8px",
            }}
            type="text"
            placeholder="Nhập phí vận chuyển"
            value={shipping}
            onChange={(e) => SetShipping(e.target.value)}
          />
          <input
            style={{
              padding: "8px",
              margin: "8px",
            }}
            type="text"
            placeholder="Miễn phí vận chuyển"
            value={freeShippingThreshold}
            onChange={(e) => setFreeShippingThreshold(e.target.value)}
          />
          <button
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "8px",
              border: "none",
              cursor: "pointer",
              width: "55px",
              borderRadius: "4px",
            }}
            onClick={handleAddShippingRate}
          >
            Lưu
          </button>
        </div>
      )}
      {shippingRates.map((shippingRate) => (
        <div
          key={shippingRate.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px",
            margin: "8px 0",
            border: "1px solid #ddd",
          }}
        >
          <div>
            <p>{shippingRate.province}</p>
            <p>{shippingRate.rate.toLocaleString("vi-VN")} VND</p>
            <p>
              Miễn vận chuyển khi đạt ngưỡng{" "}
              <p>
                {shippingRate.freeShippingThreshold.toLocaleString("vi-VN")} VND
              </p>
            </p>
          </div>
          <div>
            <button
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
              }}
              onClick={() => handleDeleteShippingRate(shippingRate.id)}
            >
              Xóa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShippingRates;
