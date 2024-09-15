import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserRelatedInfo } from "../../api/services/admin/UserServices";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import HeaderNavigate from "../HeaderNavigate";
import ClockLoader from "../ClockLoader";
import Header from "./Header";
import { Spring } from "react-spring";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { tokens } from "../../layout/admin/theme";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import Chart from "../costChart";
import FilterUserDatePicker from "./FilterUserDatePicker";

const columns = [
  { id: "id", label: "ID", minWidth: 100, align: "left" },
  {
    id: "amount",
    label: "Amount",
    minWidth: 100,
    align: "left",
    format: (value) => (value * 1000).toLocaleString("vi-VN", {}) + " VND",
  },
  {
    id: "date",
    label: "Date",
    width: 100,
    align: "left",
    format: (value) =>
      new Date(value).toLocaleTimeString("vi-VN") +
      ", " +
      new Date(value).toLocaleDateString("vi-VN"),
  },

  {
    id: "status",
    label: "Status",
    minWidth: 150,
    align: "left",
  },
];

function createData(id, amount, date, status) {
  return { id, amount, date, status };
}

const UserRelatedInfo = () => {
  const { id } = useParams();
  console.log(id);
  //id = customer id
  const [data, setData] = useState([]);
  const axiosPrivate = usePrivateRequest();

  const [currentSize, setCurrentSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);
  const [totalPurchase, setTotalPurchase] = useState(0.0);
  const [purchaseDataToGraph, setPurchaseDataToGraph] = useState([]);
  useEffect(() => {
    const getUserReInfo = async (userId) => {
      setIsFetching(true);
      try {
        const data = await getUserRelatedInfo(
          axiosPrivate,
          userId,
          0,
          currentSize
        );
        console.log(data);
        setTotalPurchase(0.0);
        data.orderDtos &&
          data.orderDtos.map((d) => {
            setTotalPurchase((prev) => prev + d.amount);
            setPurchaseDataToGraph((prev) => {
              return [
                ...prev,
                {
                  time:
                    new Date(d.orderDate).toLocaleTimeString("vi-VN") +
                    ", " +
                    new Date(d.orderDate).toLocaleDateString("vi-VN"),
                  amount: d.amount,
                },
              ];
            });
          });
        setData(data);
        setIsFetching(false);
      } catch (err) {
        console.error(err);
        setIsFetching(false);
      }
    };
    getUserReInfo(id);
  }, [id, currentSize]);
  const rows =
    data.orderDtos &&
    data?.orderDtos.map(
      (d) => d && createData(d.id, d.amount, d.orderDate, d.orderStatus?.status)
    );

  console.log(purchaseDataToGraph);

  const handleChangePage = async (type) => {
    let page = 0;
    if (type === "next") {
      page = currentPage + 1;
    } else {
      page = currentPage - 1;
    }
    setIsFetching(true);
    try {
      const data = await getUserRelatedInfo(
        axiosPrivate,
        id,
        page,
        currentSize
      );
      console.log(data);
      setTotalPurchase(0.0);
      data.orderDtos &&
        data.orderDtos.map((d) => setTotalPurchase((prev) => prev + d.amount));
      setData(data);
      setCurrentPage(page);

      setIsFetching(false);
    } catch (err) {
      console.error(err);
      setIsFetching(false);
    }
  };

  const handleFilterByDate = async (startDate, endDate) => {
    try {
      setIsFetching(true);
      const data = await axiosPrivate.get(
        `/api/v1/admin-users-mgt/all-info-date/${id}/${startDate.getTime()}/${endDate.getTime()}?size=${currentSize}&page=0`
      );
      console.log(data.data);
      setTotalPurchase(0.0);
      setPurchaseDataToGraph([]);
      data.data.orderDtos &&
        data.data.orderDtos.map((d) => {
          setTotalPurchase((prev) => prev + d.amount);
          setPurchaseDataToGraph((prev) => {
            return [
              ...prev,
              {
                time:
                  new Date(d.orderDate).toLocaleTimeString("vi-VN") +
                  ", " +
                  new Date(d.orderDate).toLocaleDateString("vi-VN"),
                amount: d.amount,
              },
            ];
          });
        });
      setData(data.data);
      setIsFetching(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      {isFetching && <ClockLoader />}
      <HeaderNavigate
        father={"admin"}
        navigateFrom="users"
        currentPos={`user-info`}
      />
      <div className="ad-orders-container">
        <div className="row">
          <div className="col-12">
            {" "}
            <Header
              title={
                !isFetching &&
                data &&
                data?.customerDto?.firstName + " " + data?.customerDto?.lastName
              }
              subtitle={"Management your customer's accounts"}
            />
            {!isFetching && data && <h6>{data?.customerDto?.email}</h6>}
            <br />
          </div>
          <div className="col-12">
            <FilterUserDatePicker handleFilterByDate={handleFilterByDate} />
          </div>
          <div className="col-12">
            <Header
              title={"Total Purchase"}
              subtitle={"Management your customer's accounts"}
            />
            {(totalPurchase * 1000).toLocaleString("vi-VN", {}) + " VND"}
            <br />
            <Spring
              from={{ opacity: 0, transform: "translateY(50px)" }}
              to={{ opacity: 1, transform: "translateY(0)" }}
              config={{ duration: 1000 }}
            >
              {(props) => {
                console.log("Opacity:", props.opacity.current); // Log giá trị của opacity
                console.log("Transform:", props.transform.current); // Log
                console.log(props);
                return (
                  <div style={props} className="w-100">
                    <Chart
                      data={purchaseDataToGraph}
                      setData={setPurchaseDataToGraph}
                      className="w-100"
                    />
                  </div>
                );
              }}
            </Spring>
          </div>
          <div className="col-8">
            <Header
              title={"Orders"}
              subtitle={"Management your customer's accounts"}
            />
          </div>

          <div className="col-4">
            <br />
            <Header
              title={"Details"}
              subtitle={"Management your customer's accounts"}
            />
          </div>

          <div className="col-8">
            <Paper
              sx={{
                p: 0,
                width: "100%",
                overflow: "hidden",
                // backgroundColor: `${colors.primary[400]}`,
              }}
            >
              <TableContainer sx={{ maxHeight: 455, maxWidth: "100%" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className="add-pro-table"
                >
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontSize: "14px",
                            backgroundColor: `${colors.primary[400]}`,
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows &&
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                              //   onClick={() => selectOrderHandle(row.id)}
                            >
                              {columns.map((column, idx) => {
                                const value = row[column.id];
                                return (
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                      fontSize: "14px",
                                      display:
                                        column.id === "name" ? "flex" : "",
                                      alignItems: "center",
                                    }}
                                  >
                                    {column.format && typeof value === "number"
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItem: "center",
                justifyContent: "center",
                marginTop: "15px",
                gap: "10px",
                zIndex: 100,
              }}
            >
              <button
                style={{
                  border: "1px solid #ddd",
                  hover: "pointer",
                  width: "35px",
                }}
                disabled={currentPage === 0}
                onClick={() => handleChangePage("prev")}
              >
                <FcPrevious />
              </button>
              <span>Page: {currentPage + 1}</span>
              <button
                style={{
                  border: "1px solid #ddd",
                  hover: "pointer",
                  width: "35px",
                }}
                onClick={() => handleChangePage("next")}
              >
                <FcNext />
              </button>
            </div>
          </div>

          <div className="col-4">
            <div className="mb-3">
              <h5 className="fs-6 fw-bold">Customer since</h5>
              <span>
                {!isFetching && data && data?.customerDto?.created ? (
                  <h6>{data?.customerDto?.created}</h6>
                ) : (
                  "--------------------"
                )}
              </span>
            </div>

            <div className="mb-3">
              <h5 className="fs-6 fw-bold">Phone Number</h5>
              <span>
                {!isFetching && data && data?.customerDto?.phoneNumber ? (
                  <h6>{data?.customerDto?.phoneNumber}</h6>
                ) : (
                  "--------------------"
                )}
              </span>
            </div>
            <div className="mb-3">
              <h5 className="fs-6 fw-bold">Gender</h5>
              <span>
                {!isFetching && data && data?.customerDto?.gender ? (
                  <h6>{data?.customerDto?.gender}</h6>
                ) : (
                  "--------------------"
                )}
              </span>
            </div>

            <div className="mb-3">
              <h5 className="fs-6 fw-bold">Date of birth</h5>
              <span>
                {!isFetching && data && data?.customerDto?.dob ? (
                  <h6>{data?.customerDto?.dob}</h6>
                ) : (
                  "--------------------"
                )}
              </span>
            </div>

            <div className="mb-3">
              <h5 className="fs-6 fw-bold">Shipping Addresses</h5>
              {data &&
                data?.shippingAddressDtos &&
                data?.shippingAddressDtos.map((address) => (
                  <span>
                    <h6 className={address.isDefault && `text-primary`}>
                      {address.name +
                        ", " +
                        address.address +
                        ", " +
                        address.ward +
                        ", " +
                        address.district +
                        ", " +
                        address.city +
                        ", phone: " +
                        address.phone}
                    </h6>
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRelatedInfo;
