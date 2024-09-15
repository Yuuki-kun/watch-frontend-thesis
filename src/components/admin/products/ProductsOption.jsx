import { Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../../layout/admin/theme";
import FilterOrders from "../orders/FilterOrders";
import FilterProductAll from "./FilterProductAll";
import FilterProductActive from "./FilterProductActive";

const ProductsOption = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [filterOptions, setFilterOptions] = useState("all");
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
            boxShadow: `0 0 4px 1px ${colors.grey[600]}`,
          },
        }}
      >
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "all"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                  boxShadow: `0 0 4px 1px ${colors.grey[800]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("all")}
        >
          {" "}
          <Typography variant="h5" color={colors.grey[100]}>
            All
          </Typography>
          {/* <Typography variant="h4" color={colors.grey[100]} fontWeight={"500"}>
            61
          </Typography> */}
        </Box>
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "active"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("active")}
        >
          Active
        </Box>
        <Box
          className="orders-option-filter"
          backgroundColor={colors.primary[400]}
          style={
            filterOptions === "active"
              ? {
                  border: `1.5px solid ${colors.grey[600]}`,
                }
              : {}
          }
          onClick={selectOrderOptions("archived")}
        >
          Archived
        </Box>
      </Box>
      <div className="line-container" style={{ marginTop: "0px" }}>
        <span className="line"></span>
      </div>

      {filterOptions === "all" ? <FilterProductAll type={"all"} /> : <></>}
      {filterOptions === "active" ? (
        <FilterProductAll type={"active"} />
      ) : (
        <></>
      )}
      {filterOptions === "archived" ? (
        <FilterProductAll type={"archived"} />
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductsOption;
