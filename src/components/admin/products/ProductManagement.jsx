import React, { useState } from "react";
import "../orders/orders.styles.css";
import "./product.style.css";
import Header from "../Header";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../layout/admin/theme";
import OrdersOption from "../orders/OrdersOption";
import ProductsOption from "./ProductsOption";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AddProduct from "./AddProduct";

const ProductManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [productOptions, setProductOptions] = useState("products");
  const selectProductOptions = (option) => () => {
    console.log(option);
    setProductOptions(option);
  };
  const [addProduct, setAddProduct] = useState(false);
  const openAddProduct = () => {
    setAddProduct(true);
  };
  const closeAddProduct = () => {
    setAddProduct(false);
  };
  return (
    <>
      <div className="admin-prod-cont">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <Header
              title={"Products Management"}
              subtitle={"Management your product's"}
            />{" "}
            <button className="ad-prod-add" onClick={openAddProduct}>
              <span>Add product</span>
              <AddCircleOutlineOutlinedIcon style={{ fontSize: 24 }} />
            </button>
          </div>
          <div className="col-12 display-order-options">
            <style>
              {`
              .order-ops-btn:hover {
                background-color: ${colors.primary[400]} !important;
              }
            `}
            </style>
            <button
              className={`order-ops-btn`}
              // style={{ backgroundColor: `${colors.primary[400]}` }}
              onClick={selectProductOptions("products")}
              style={
                productOptions === "products"
                  ? {
                      backgroundColor: colors.primary[400],
                      borderBottom: `2px solid #aaaaaa`,
                    }
                  : {}
              }
            >
              <Typography variant="h5" color={colors.grey[100]}>
                All Products
              </Typography>
            </button>
            <button
              className="order-ops-btn"
              // style={{ backgroundColor: `${colors.primary[400]}` }}
              onClick={selectProductOptions("transactions")}
              style={
                productOptions === "transactions"
                  ? {
                      backgroundColor: colors.primary[400],
                      borderBottom: `2px solid #aaaaaa`,
                    }
                  : {}
              }
            >
              {/* <Typography variant="h5" color={colors.grey[100]}>
                All Transactions
              </Typography> */}
            </button>
            <div className="line-container" style={{ marginTop: 5 }}>
              <span className="line"></span>
            </div>
          </div>
          {productOptions === "products" ? <ProductsOption /> : <></>}
        </div>
      </div>
      {/* {addProduct ? (
        <>
          <div className="overlay"></div>
          <AddProduct closeAddProduct={closeAddProduct} />
        </>
      ) : (
        <></>
      )} */}
      <div
        className={`overlay ${addProduct ? "show-add-prod" : "hide-add-prod"}`}
      ></div>
      <AddProduct closeAddProduct={closeAddProduct} isShow={addProduct} />
    </>
  );
};

export default ProductManagement;
