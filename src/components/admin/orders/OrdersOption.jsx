import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../layout/admin/theme";
import "./orders.styles.css";
import FilterOrders from "./FilterOrders";
const OrdersOption = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filterOptions, setFilterOptions] = useState("orders");
  const selectOrderOptions = (option) => () => {
    setFilterOptions(option);
  };

  return (
    <>
      <Box
        display={"flex"}
        padding={"16px"}
        flexWrap={"wrap"}
        gap={"10px"}
        sx={{
          "& .orders-option-filter:hover": {
            boxShadow: `0 0 4px 2px ${colors.grey[600]}`,
          },
        }}
      >
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "orders"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                  boxShadow: `0 0 4px 2px ${colors.grey[800]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("orders")}
        >
          <Typography variant="h5" color={colors.grey[100]}>
            Today orders
          </Typography>
          <Typography variant="h4" color={colors.grey[100]} fontWeight={"500"}>
            Today orders
          </Typography>
        </Box>
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "completed"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("completed")}
        >
          Completed
        </Box>
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "uncaptured"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("uncaptured")}
        >
          Uncaptured
        </Box>
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "waiting"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("waiting")}
        >
          Waiting
        </Box>
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "refunded"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("refunded")}
        >
          Refunded
        </Box>
      </Box>
      <div className="line-container" style={{ marginTop: "0px" }}>
        <span className="line"></span>
      </div>
      {filterOptions === "orders" ? <FilterOrders /> : <></>}
    </>
  );
};

export default OrdersOption;
