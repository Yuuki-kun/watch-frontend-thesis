import React, { useState } from "react";
import Header from "../Header";
import "./orders.styles.css";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../layout/admin/theme";
import OrderOption from "./OrdersOption";
const OrderManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orderOptions, setOrderOptions] = useState("orders");
  const selectOrderOptions = (option) => () => {
    console.log(option);
    setOrderOptions(option);
  };

  return (
    <div className="ad-orders-container">
      <div className="row">
        <div className="col-12">
          <Header
            title={"Orders Management"}
            subtitle={"Management your customer's orders"}
          />
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
            onClick={selectOrderOptions("orders")}
            style={
              orderOptions === "orders"
                ? {
                    backgroundColor: colors.primary[400],
                    borderBottom: `2px solid #aaaaaa`,
                  }
                : {}
            }
          >
            <Typography variant="h5" color={colors.grey[100]}>
              All Orders
            </Typography>
          </button>
          <button
            className="order-ops-btn"
            // style={{ backgroundColor: `${colors.primary[400]}` }}
            onClick={selectOrderOptions("transactions")}
            style={
              orderOptions === "transactions"
                ? {
                    backgroundColor: colors.primary[400],
                    borderBottom: `2px solid #aaaaaa`,
                  }
                : {}
            }
          >
            <Typography variant="h5" color={colors.grey[100]}>
              All Transactions
            </Typography>
          </button>
          <div className="line-container" style={{ marginTop: 5 }}>
            <span className="line"></span>
          </div>
        </div>

        {orderOptions === "orders" ? <OrderOption /> : <></>}
      </div>
    </div>
  );
};

export default OrderManagement;
