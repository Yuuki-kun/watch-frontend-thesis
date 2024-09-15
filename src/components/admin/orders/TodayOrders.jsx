import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useTheme } from "@mui/material";
import { tokens } from "../../../layout/admin/theme";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import { captureOrder } from "../../../api/services/admin/OrderServices";
import "./orders.styles.css";
import { useNavigate } from "react-router-dom";
import ChangeAddressModal from "../../modal/ChangeAddressModal";
import ChangeOrderStatusModal from "../../modal/ChangeOrderStatusModal";
import ClockLoader from "../../ClockLoader";
import { Button } from "bootstrap";
import { axiosPrivate } from "../../../api/axiosPrivate";
import PieChartComponent from "../PieChartComponent";

const columns = [
  { id: "id", label: "Id", width: 70 },
  { id: "customer", label: "Customer", minWidth: 100 },
  {
    id: "description",
    label: "Description",
    minWidth: 200,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 150,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "date",
    label: "Date",
    minWidth: 150,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

function createData(id, customer, description, amount, date, status) {
  return { id, customer, description, amount, date, status };
}

const TodayOrders = ({
  setIsFetching,
  selectOrderHandle,
  capturedOrderHandle,
  refuseOrderHandle,
  changeStatusHandle,
  allOrders,
}) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [currentSize, setCurrentSize] = React.useState(10);
  const [rowsPerPage, setRowsPerPage] = React.useState(40);
  const [isChangingStatus, setIsChangingStatus] = React.useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ordersToday, setOrdersToday] = React.useState([]);
  const [showTodayOrders, setShowTodayOrders] = React.useState(false);

  React.useEffect(() => {
    // setIsFetching(true);
    const getAllOrders = async () => {
      try {
        // const orders = await getAll(axiosPrivate, 40, 0);
        // if (type === "completed") {
        //   console.log("completed");
        //   const orders = await getAll(axiosPrivate, 40, 0, "completed");

        //   setIsFetching(false);
        //   setOrders(orders);
        //   console.log(orders);
        // } else if (type === "orders") {
        const orders = await axiosPrivate.get("/api/v1/admin/orders/today");
        // setIsFetching(false);
        console.log(orders.data);
        setOrdersToday(orders.data);
        // ordersToday &&
        //   ordersToday.map((order) => {
        //     console.log(order);
        //   });
        // }
      } catch (err) {
        console.error(err);
        // setIsFetching(false);
      }
    };
    getAllOrders();
  }, [currentSize, currentPage, allOrders]);
  const getAllOrders = async () => {
    try {
      // const orders = await getAll(axiosPrivate, 40, 0);
      // if (type === "completed") {
      //   console.log("completed");
      //   const orders = await getAll(axiosPrivate, 40, 0, "completed");

      //   setIsFetching(false);
      //   setOrders(orders);
      //   console.log(orders);
      // } else if (type === "orders") {
      const orders = await axiosPrivate.get("/api/v1/admin/orders/today");
      //   setIsFetching(false);
      console.log(orders.data);
      setOrdersToday(orders.data);

      // ordersToday &&
      //   ordersToday.map((order) => {
      //     console.log(order);
      //   });
      // }
    } catch (err) {
      console.error(err);
      //   setIsFetching(false);
    }
  };
  const rows = ordersToday?.map(
    (order) =>
      order &&
      createData(
        order.id,
        order.customer?.firstName + " " + order.customer?.lastName,
        order.orderDetails[0]?.watch.name,
        order.amount,
        new Date(order.orderDate)
          .toUTCString()
          .split(" ")
          .slice(0, 5)
          .join(" "),
        order.orderStatus?.status
      )
  );

  const handleTodayOrderStatus = async (e, orderId, status, customer) => {
    e.stopPropagation();
    await changeStatusHandle(e, orderId, status, customer);
    // getAllOrders();
    //reset orders'status
  };

  const [ordersByProvince, setOrdersByProvince] = React.useState([]); // Thêm state mới
  const [ordersByStatus, setOrdersByStatus] = React.useState([]); // Thêm state mới
  //   React.useEffect(() => {
  //     const summarizeOrdersByCity = (data) => {
  //       const ordersByCity = {};
  //       data.forEach((item) => {
  //         const city = item.address.city;
  //         if (ordersByCity[city]) {
  //           ordersByCity[city] += 1;
  //         } else {
  //           ordersByCity[city] = 1;
  //         }
  //       });
  //       return ordersByCity;
  //     };
  //     const convertToOrdersByProvince = (summarizedData) => {
  //       const ordersByProvince = Object.keys(summarizedData).map((city) => ({
  //         city: city,
  //         orderCount: summarizedData[city],
  //       }));
  //       return ordersByProvince;
  //     };
  //     if (ordersToday.length > 0) {
  //       const summarizedData = summarizeOrdersByCity(ordersToday);
  //       const ordersByProvince = convertToOrdersByProvince(summarizedData);
  //       setOrdersByProvince(ordersByProvince);
  //     } else {
  //       setOrdersByProvince([]);
  //     }
  //   }, [ordersToday]);
  React.useEffect(() => {
    // const summarizeOrdersByCity = (data) => {
    //   const ordersByCity = {};
    //   const orderStatusAndValue = {};
    //   data.forEach((item) => {
    //     const city = item.address.city;
    //     if (ordersByCity[city]) {
    //       ordersByCity[city] += 1; // Change to increment order count by 1
    //     } else {
    //       ordersByCity[city] = 1;
    //     }
    //     const status = item.orderStatus.status;
    //     if (orderStatusAndValue[status]) {
    //       orderStatusAndValue[status] += 1;
    //     } else {
    //       orderStatusAndValue[status] = 1;
    //     }
    //   });
    //   return { ordersByCity, orderStatusAndValue };
    // };

    // const convertToOrdersByProvince = (
    //   summarizedData,
    //   summarizedDataStatus
    // ) => {
    //   const ordersByProvince = Object.keys(summarizedData).map((city) => ({
    //     city: city,
    //     orderCount: summarizedData[city],
    //   }));
    //   const orderSByStatus = Object.keys(summarizedDataStatus).map(
    //     (status) => ({
    //       status: status,
    //       orderCount: summarizedData[status],
    //     })
    //   );
    //   return { ordersByProvince, orderSByStatus };
    // };

    // if (ordersToday.length > 0) {
    //   const { summarizedData, summarizedDataStatus } =
    //     summarizeOrdersByCity(ordersToday);
    //   const { ordersByProvinceData, orderSbyStatusData } =
    //     convertToOrdersByProvince(summarizedData, summarizedDataStatus);
    //   console.log("Summarized data:", summarizedData);
    //   console.log("Orders by province data:", ordersByProvinceData);

    //   setOrdersByProvince(ordersByProvinceData);
    //   setOrdersByStatus(orderSbyStatusData);
    // }
    const summarizeOrdersByCity = (data) => {
      const ordersByCity = {};
      const orderStatusAndValue = {};
      data.forEach((item) => {
        const city = item.address.city;
        if (ordersByCity[city]) {
          ordersByCity[city] += 1; // Change to increment order count by 1
        } else {
          ordersByCity[city] = 1;
        }
        const status = item.orderStatus.status;
        if (orderStatusAndValue[status]) {
          orderStatusAndValue[status] += 1;
        } else {
          orderStatusAndValue[status] = 1;
        }
      });
      return { ordersByCity, orderStatusAndValue }; // Trả về cả hai object trong một object
    };

    const convertToOrdersByProvince = (
      summarizedData,
      summarizedDataStatus
    ) => {
      const ordersByProvince = Object.keys(summarizedData).map((city) => ({
        city: city,
        orderCount: summarizedData[city],
      }));
      const orderSByStatus = Object.keys(summarizedDataStatus).map(
        (status) => ({
          status: status,
          orderCount: summarizedDataStatus[status],
        })
      );
      return [ordersByProvince, orderSByStatus];
      // Trả về cả hai mảng trong một object
    };

    if (ordersToday.length > 0) {
      const { ordersByCity, orderStatusAndValue } =
        summarizeOrdersByCity(ordersToday);
      const [ordersByProvinceData, orderSbyStatusData] =
        convertToOrdersByProvince(ordersByCity, orderStatusAndValue);
      console.log("Orders by province:", ordersByCity);
      console.log("Orders by status:", orderStatusAndValue);
      console.log("Orders by province:", ordersByProvinceData);
      console.log("Orders by status:", orderSbyStatusData);
      setOrdersByProvince(ordersByProvinceData);
      setOrdersByStatus(orderSbyStatusData);
    }
  }, [ordersToday]);

  return (
    <div className="mb-5 row">
      <h5>TodayOrders</h5>
      <h6>Tổng: {ordersToday?.length}</h6>
      {/* <div
        className="col-12 d-flex"
        style={{
          flexDirection: "column",
          alignItems: "space-between",
          justifyContent,
        }}
      > */}
      {/* <div
          //   style={{
          //     width: "40%",
          //     height: "auto",
          //   }}
          className="col-12"
        >
          {ordersByProvince?.length > 0 && ordersToday?.length > 0 && (
            <PieChartComponent
              data={ordersByProvince}
              dataKey={"city"}
              dataLabel={"orderCount"}
            />
          )}
        </div> */}
      {/* <div className="col-2"></div> */}
      {/* <div
          //   style={{
          //     width: "40%",
          //     height: "auto",
          //   }}
          className="col-12"
        >
          {ordersByStatus.length > 0 && ordersToday.length > 0 && (
            <PieChartComponent
              data={ordersByStatus}
              dataKey={"status"}
              dataLabel={"orderCount"}
            />
          )}
        </div>
      </div> */}
      <button
        onClick={() => setShowTodayOrders(!showTodayOrders)}
        style={{
          backgroundColor: "rgb(130, 101, 101)",
          color: "white",
          padding: "5px 10px",
          borderRadius: "10px",
          cursor: "pointer",
          border: "none",
          marginTop: "20px",
        }}
      >
        {showTodayOrders ? "Đóng" : "Hiển thị các đơn hàng hôm nay"}
      </button>
      {showTodayOrders && (
        <Paper
          sx={{
            p: 0,
            mt: 2,
            width: "100%",
            overflow: "hidden",
            // backgroundColor: `${colors.primary[400]}`,
          }}
        >
          <TableContainer sx={{ maxHeight: 455, maxWidth: "100%" }}>
            <Table stickyHeader aria-label="sticky table">
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
              {/* <TableBody style={{ backgroundColor: `${colors.primary[400]}` }}> */}
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                        onClick={() => selectOrderHandle(row.id)}
                      >
                        {columns.map((column, idx) => {
                          const value = row[column.id];
                          return (
                            <>
                              {column.id !== "action" ? (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{ fontSize: "14px" }}
                                >
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              ) : (
                                <TableCell
                                  key={"action-cell"}
                                  align={"right"}
                                  style={{ fontSize: "14px" }}
                                >
                                  <div className="order-mgt-btn-ctn">
                                    {row.status === "PENDING" && (
                                      <>
                                        <button
                                          className="order-mgt-btn capture-btn"
                                          onClick={(e) =>
                                            capturedOrderHandle(e, row.id)
                                          }
                                        >
                                          Capture
                                        </button>
                                        <button
                                          className="order-mgt-btn cancel-btn"
                                          onClick={(e) =>
                                            refuseOrderHandle(e, row.id)
                                          }
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                    {row.status === "COMPLETED" ||
                                      (row.status === "CAPTURED" && (
                                        <>
                                          <button className="order-mgt-btn refund-btn">
                                            Refund
                                          </button>
                                        </>
                                      ))}
                                    {row.status !== "CANCELLED" && (
                                      <button
                                        className="order-mgt-btn change-stt-btn"
                                        onClick={(e) =>
                                          handleTodayOrderStatus(
                                            e,
                                            row.id,
                                            row.status,
                                            row.customer
                                          )
                                        }
                                      >
                                        Change Status
                                      </button>
                                    )}
                                  </div>
                                </TableCell>
                              )}
                            </>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
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
                //   onClick={() => handleChangePage("prev")}
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
                //   onClick={() => handleChangePage("next")}
              >
                <FcNext />
              </button>
            </div>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};

export default TodayOrders;
