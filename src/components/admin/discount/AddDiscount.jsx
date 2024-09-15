import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import Header from "../Header";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Input } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { SelectAll } from "@mui/icons-material";
import { createPromotion } from "../../../api/services/admin/PromotionServices";

const AddDiscount = ({ closeAddProduct, isShow }) => {
  const [discountName, setDiscountName] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountScope, setDiscountScope] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountPriority, setDiscountPriority] = useState(-1);
  const [discountStartDate, setDiscountStartDate] = useState(null);
  const [discountStartTime, setDiscountStartTime] = useState(null);
  const [discountEndDate, setDiscountEndDate] = useState(null);
  const [discountEndTime, setDiscountEndTime] = useState(null);
  const [discountDescription, setDiscountDescription] = useState("");

  console.log("discountName", discountName);
  console.log("discountType", discountType);
  console.log("discountScope", discountScope);
  console.log("discountValue", discountValue);
  console.log("discountPriority", discountPriority);
  console.log("discountStartDate", discountStartDate);
  console.log("discountStartTime", discountStartTime);
  console.log("discountEndDate", discountEndDate);
  console.log("discountEndTime", discountEndTime);
  console.log("discountDescription", discountDescription);

  const axiosPrivate = usePrivateRequest();

  const clearAllData = () => {};
  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("submitting");
    const data = {
      name: discountName,
      type: discountType,
      scope: discountScope,
      value: discountValue,
      priority: discountPriority,
      dateStart: new Date(`${discountStartDate} ${discountStartTime}`),
      dateEnd: new Date(`${discountEndDate} ${discountEndTime}`),
      description: discountDescription,
    };
    console.log(data);
    const addDiscount = async (data) => {
      try {
        const response = await createPromotion(axiosPrivate, data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    const addSpecificDiscount = async (data) => {
      try {
        const res = await axiosPrivate.post(
          "/api/v1/admin-promotions-mgt/create-promotions/specific",
          {
            promotionDto: data,
            watchIds: selectedProducts,
          }
        );
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    if (discountScope === "all") {
      addDiscount(data);
    } else if (discountScope === "specific") {
      addSpecificDiscount(data);
    }
  };
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Hàm này được gọi khi một sản phẩm được chọn hoặc bỏ chọn
  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      // Nếu sản phẩm đã được chọn, loại bỏ nó khỏi danh sách chọn
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      // Nếu sản phẩm chưa được chọn, thêm nó vào danh sách chọn
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      const getProducts = async () => {
        //lay cac san pham va thong tin khuyen mai hien co cua chung
        const response = await axios.get("/products/get-all/watch");
        setProducts(response.data);
        console.log(response.data);
      };
      discountScope === "specific" && getProducts();
    } catch (e) {
      console.log(e);
    }
  }, [discountScope]);
  const findMainImage = (images) => {
    console.log("images", images);
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };
  console.log("selectedProducts", selectedProducts);
  return (
    <div
      className={`ad-add-prod-cont ${
        isShow ? "show-right-add-prod" : "hide-right-add-prod"
      }`}
    >
      <div className="d-flex align-items-center justify-content-between">
        <Header title={"Add A Discount"} />
        <div className="d-flex gap-2">
          <button
            className="ad-prod-add-close-btn"
            style={{
              border: "none",
              padding: "5px 15px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "space-between",
              borderRadius: "5px",
              border: "1px solid #aaaaaa",
              background: "#fff",
              fontWeight: "600",
              boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => {
              clearAllData();
            }}
          >
            <span>Clear</span>
          </button>
          <button
            className="ad-prod-add-close-btn"
            style={{
              border: "none",
              padding: "5px 15px",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              justifyContent: "space-between",
              borderRadius: "5px",
              border: "1px solid #aaaaaa",
              background: "#fff",
              fontWeight: "600",
              boxShadow: "0 0 5px 1px rgba(0, 0, 0, 0.2)",
            }}
            onClick={() => {
              clearAllData();
              closeAddProduct();
            }}
          >
            <span>Close</span>
            <CloseOutlinedIcon />
          </button>
        </div>
      </div>
      <div className="line-container">
        <span className="line"></span>
      </div>
      <div className="row h-100">
        <div className="col-12">
          <form onSubmit={handelSubmit} className="">
            <div className="ad-add-product-area">
              <InputLabel
                htmlFor="discount-name"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Name
              </InputLabel>
              <Input
                id="discount-name"
                placeholder="Discount Name"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setDiscountName(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-type"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Type
              </InputLabel>
              <select
                id="discount-type"
                placeholder="Discount Type"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setDiscountType(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="percentage">Percentage</option>
              </select>

              <InputLabel
                htmlFor="discount-scope"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Scope
              </InputLabel>
              <select
                id="discount-scope"
                placeholder="Discount Scope"
                style={{ width: "100%" }}
                onChange={(e) => {
                  setDiscountScope(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="all">All</option>
                <option value="specific">Specific</option>
              </select>

              {discountScope === "specific" && (
                <>
                  <InputLabel
                    htmlFor="discount-product"
                    sx={{ marginTop: "10px" }}
                    style={{ fontWeight: "600", color: "black" }}
                  >
                    Choose Product
                  </InputLabel>
                  <div
                    style={{
                      width: "100%",
                      height: "200px",
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {products.map((product) => (
                      <div>
                        <img
                          src={findMainImage(product?.images)}
                          alt=""
                          style={{
                            width: "50px",
                            height: "50px",
                          }}
                        />
                        <span>{product?.name}</span>
                        {product?.promotion &&
                          product.promotion.map((promo) => (
                            <span style={{ color: "red" }}>{promo}</span>
                          ))}
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleProductSelect(product.id)}
                          color="primary"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <InputLabel
                htmlFor="discount-value"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Value
              </InputLabel>
              <Input
                id="discount-value"
                placeholder="Discount Value"
                style={{ width: "100%" }}
                type="number"
                onChange={(e) => {
                  setDiscountValue(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-priority"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Priority
              </InputLabel>
              <Input
                id="discount-priority"
                placeholder="Discount Priority"
                style={{ width: "100%" }}
                type="number"
                onChange={(e) => {
                  setDiscountPriority(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-start-date"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Start Date
              </InputLabel>
              <Input
                id="discount-start-date"
                placeholder="Discount Start Date"
                style={{ width: "100%" }}
                type="date"
                onChange={(e) => {
                  setDiscountStartDate(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-start-time"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Start Time
              </InputLabel>
              <Input
                id="discount-start-time"
                placeholder="Discount Start Time"
                style={{ width: "100%" }}
                type="time"
                onChange={(e) => {
                  setDiscountStartTime(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-end-date"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount End Date
              </InputLabel>
              <Input
                id="discount-end-date"
                placeholder="Discount End Date"
                style={{ width: "100%" }}
                type="date"
                onChange={(e) => {
                  setDiscountEndDate(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-end-time"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount End Time
              </InputLabel>
              <Input
                id="discount-end-time"
                placeholder="Discount End Time"
                style={{ width: "100%" }}
                type="time"
                onChange={(e) => {
                  setDiscountEndTime(e.target.value);
                }}
              />

              <InputLabel
                htmlFor="discount-description"
                sx={{ marginTop: "10px" }}
                style={{ fontWeight: "600", color: "black" }}
              >
                Discount Description
              </InputLabel>

              <textarea
                id="discount-description"
                placeholder="Discount Description"
                style={{ width: "100%" }}
                className="form-control"
                onChange={(e) => {
                  setDiscountDescription(e.target.value);
                }}
              />
              <button type="submit" className="mt-3">
                Submit
              </button>
            </div>
          </form>
        </div>
        {/* <div className="col-6 d-flex align-items-start"></div> */}
      </div>
    </div>
  );
};

export default AddDiscount;
