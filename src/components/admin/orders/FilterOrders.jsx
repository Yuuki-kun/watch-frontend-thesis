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
import {
  captureOrder,
  getAll,
} from "../../../api/services/admin/OrderServices";
import "./orders.styles.css";
import { useNavigate } from "react-router-dom";
import ChangeAddressModal from "../../modal/ChangeAddressModal";
import ChangeOrderStatusModal from "../../modal/ChangeOrderStatusModal";
import ClockLoader from "../../ClockLoader";
import { Button } from "bootstrap";
import TodayOrders from "./TodayOrders";
import PieChartComponent from "../PieChartComponent";
import FilterUserDatePicker from "../FilterUserDatePicker";
import ChartComponent from "../ChartComponent";

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

const FilterOrders = ({ type }) => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(40);
  const [currentSize, setCurrentSize] = React.useState(10);
  console.log(currentPage, "current page", currentSize, "current size");
  const navigate = useNavigate();
  // const handleChangePage = (event, newPage) => {
  //   if (newPage > page) {
  //     setCurrentPAll(currentPAll + 1);
  //   } else {
  //     setCurrentPAll(currentPAll - 1);
  //   }
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const selectOrderHandle = (orderId) => {
    console.log("order id=" + orderId);
    navigate(`/admin/transaction/details/${orderId}`);
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = React.useState([]);

  const axiosPrivate = usePrivateRequest();
  const [isFetching, setIsFetching] = React.useState(false);
  // const [startDate, setStartDate] = React.useState(
  //   new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  // );
  // const [endDate, setEndDate] = React.useState(new Date());
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
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
        const orders = await getAll(
          axiosPrivate,
          currentSize,
          currentPage,
          type
        );
        setIsFetching(false);
        setOrders(orders);
        console.log(orders);
        // }
      } catch (err) {
        console.error(err);
      }
    };
    // getAllOrders();

    const FirstFetchOrderData = async () => {
      console.log("fetching data");
      setIsFetching(true);
      if (startDate === null || endDate === null) {
        // const nowDate = new Date(); // Ngày hiện tại
        // const aMonthAgo = new Date(nowDate); // Ngày cách đó 30 ngày

        // aMonthAgo.setDate(nowDate.getDate() - 30); // Giảm ngày của aMonthAgo đi 30 ngày

        getAllOrders();
      }
      if (startDate > endDate) {
        alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
        return;
      }
      if (startDate === endDate && startDate !== null && endDate !== null) {
        alert("Ngày bắt đầu phải khác ngày kết thúc");
        return;
      }
      if (startDate !== null && endDate !== null && startDate < endDate) {
        try {
          const orders = await axiosPrivate.get(
            `/api/v1/admin/orders-by-date-range/${startDate.getTime()}/${endDate.getTime()}?size=${currentSize}&page=${currentPage}`
          );
          setOrders(orders.data.content);
          setCurrentPage(currentPage);
          setIsFetching(false);
        } catch (err) {
          console.error(err);
          setIsFetching(false);
        }
      }
    };
    FirstFetchOrderData();
  }, [type, currentSize, currentPage, startDate, endDate]);

  // const getAllOrders = async (size, page) => {
  //   try {
  //     const orders = await getAll(axiosPrivate, size, page);
  //     setIsFetching(false);
  //     setOrders(orders);
  //     console.log(orders);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const rows = orders?.map(
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
  console.log("row=" + JSON.stringify(rows));

  const capturedOrderHandle = async (e, orderId) => {
    e.stopPropagation();
    try {
      const res = await captureOrder(axiosPrivate, orderId, "list");
      setOrders(res);
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const [currentOrderSelected, setCurrentOrderSelected] = React.useState(null);
  const [currentStatus, setCurrentStatus] = React.useState(null);
  const [currentCustomer, setCurrentCustomer] = React.useState(null);
  const [refreshTodayOrders, setRefreshTodayOrders] = React.useState(null);
  const changeStatusHandle = (
    e,
    id,
    currentStatus,
    customer,
    setTodayOrders
  ) => {
    e.stopPropagation();
    console.log("change status" + id);
    openModal(id, currentStatus, customer, setTodayOrders);
  };

  //modal
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const openModal = (id, currentStatus, customer, setTodayOrders) => {
    setIsModalOpen(true);
    setCurrentOrderSelected(id);
    setCurrentStatus(currentStatus);
    setCurrentCustomer(customer);
    setRefreshTodayOrders(setTodayOrders);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangePage = async (control_type) => {
    let page = 0;
    if (control_type === "next") {
      page = currentPage + 1;
    } else {
      page = currentPage - 1;
    }
    // setIsFetching(true);
    // console.log("page=" + page);
    // try {
    //   console.log("type=" + control_type, "page=" + page, "type=" + type);
    //   const orders = await getAll(axiosPrivate, 40, page, type);
    //   setIsFetching(false);
    //   setOrders(orders);
    //   console.log(orders);
    //   setCurrentPage(page);
    // } catch (err) {
    //   console.error(err);
    //   setIsFetching(false);
    // }
    setCurrentPage(page);
  };

  const refuseOrderHandle = async (e, orderId) => {
    e.stopPropagation();
    console.log("refuse order" + orderId);
    const reason = window.prompt("Lý do không chấp thuận đơn hàng");
    if (reason !== null) {
      try {
        const res = await axiosPrivate.post(
          `/api/v1/admin-order-mgt/refuse-order/${orderId}?reason=${reason}`
        );
        console.log(res);
        const canceledOrder = res.data;

        const orderIndex = orders.findIndex((order) => order.id === orderId);

        if (orderIndex !== -1) {
          const updatedOrders = [...orders];
          updatedOrders[orderIndex] = canceledOrder;
          setOrders(updatedOrders);
        } else {
          console.warn("Order not found in the orders list.");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // React.useEffect(() => {
  //   const summarizeOrdersByCity = (data) => {
  //     const ordersByCity = {};
  //     data.forEach((item) => {
  //       const city = item.address.city;
  //       if (ordersByCity[city]) {
  //         ordersByCity[city] += 1;
  //       } else {
  //         ordersByCity[city] = 1;
  //       }
  //     });
  //     return ordersByCity;
  //   };
  //   const convertToOrdersByProvince = (summarizedData) => {
  //     const ordersByProvince = Object.keys(summarizedData).map((city) => ({
  //       city: city,
  //       orderCount: summarizedData[city],
  //     }));
  //     return ordersByProvince;
  //   };
  //   const summarizedData = summarizeOrdersByCity(orders);
  //   const ordersByProvince = convertToOrdersByProvince(summarizedData);
  //   setOrdersByProvince(ordersByProvince);
  // }, [orders]);
  // console.log(ordersByProvince);

  const handleFetchOrdersByDateRange = async (startDate, endDate) => {
    // if (startDate === null || endDate === null) {
    //   return;
    // }
    // if (startDate > endDate) {
    //   alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc");
    //   return;
    // }
    // if (startDate === endDate) {
    //   alert("Ngày bắt đầu phải khác ngày kết thúc");
    //   return;
    // }
    // try {
    //   const orders = await axiosPrivate.get(
    //     `/api/v1/admin/orders-by-date-range/${startDate.getTime()}/${endDate.getTime()}?size=${currentSize}&page=0`
    //   );
    //   setOrders(orders.data.content);
    //   setCurrentPage(0);
    // } catch (err) {
    //   console.error(err);
    // }
    setStartDate(startDate);
    setEndDate(endDate);
    setCurrentPage(0);
  };
  const [ordersByProvince, setOrdersByProvince] = React.useState([]); // Thêm state mới
  const [ordersByStatus, setOrdersByStatus] = React.useState([]); // Thêm state mới

  const [totalOrdersByDateRange, setTotalOrdersByDateRange] = React.useState(
    []
  ); // Thêm state mới
  const [ordersByDateToLineChart, setOrdersByDateToLineChart] = React.useState(
    []
  );
  React.useEffect(() => {
    try {
      const fetchOrdersByDateRange = async () => {
        if (startDate !== null && endDate !== null) {
          const orders = await axiosPrivate.get(
            `/api/v1/admin/total-orders-by-date-range/${startDate.getTime()}/${endDate.getTime()}`
          );
          setTotalOrdersByDateRange(orders.data);
        }
      };
      fetchOrdersByDateRange();
    } catch (err) {
      console.log(err);
    }
  }, [startDate, endDate]);

  React.useEffect(() => {
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

    if (totalOrdersByDateRange.length > 0) {
      const { ordersByCity, orderStatusAndValue } = summarizeOrdersByCity(
        totalOrdersByDateRange
      );
      const [ordersByProvinceData, orderSbyStatusData] =
        convertToOrdersByProvince(ordersByCity, orderStatusAndValue);
      console.log("Orders by province:", ordersByCity);
      console.log("Orders by status:", orderStatusAndValue);
      console.log("Orders by province:", ordersByProvinceData);
      console.log("Orders by status:", orderSbyStatusData);
      setOrdersByProvince(ordersByProvinceData);
      setOrdersByStatus(orderSbyStatusData);
    }

    //order date total

    const countByDate = {};

    // Đếm số lượng của mỗi ngày
    totalOrdersByDateRange.forEach((item) => {
      const date = new Date(item.orderDate);
      const formattedDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
      if (countByDate[formattedDate]) {
        countByDate[formattedDate]++;
      } else {
        countByDate[formattedDate] = 1;
      }
    });

    // Tạo mảng mới từ đối tượng countByDate
    const newData = Object.keys(countByDate)
      .map((date) => ({
        date,
        total: countByDate[date],
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    setOrdersByDateToLineChart(newData);
  }, [totalOrdersByDateRange]);

  console.log(startDate, endDate, "date range");
  console.log(totalOrdersByDateRange, "total orders by date range");

  // const orderBy = (value) => {
  //   // if (value === "Id") {
  //   //   console.log("id");
  //   //   setOrders(orders.sort((a, b) => a.id - b.id));
  //   // }

  //   if (value === "amount") {
  //     console.log("amount");
  //     setOrders(orders.sort((a, b) => a.amount - b.amount));
  //   }
  //   // if (value === "date") {
  //   //   console.log("date");
  //   //   setOrders(
  //   //     orders.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate))
  //   //   );
  //   // }
  //   // if (value === "status") {
  //   //   console.log("status");
  //   //   setOrders(
  //   //     orders.sort((a, b) =>
  //   //       a.orderStatus.status.localeCompare(b.orderStatus.status)
  //   //     )
  //   //   );
  //   // }
  // };

  // const [sortType, setSortType] = React.useState("date");
  // const orderBy = (value) => {
  //   setSortType(value);
  // };
  // React.useEffect(() => {
  //   console.log(sortType, "sort type");
  //   if (sortType === "Id") {
  //     setOrders(orders.sort((a, b) => a.id - b.id));
  //   }
  // }, [sortType]);
  return (
    <div style={{ padding: "16px" }}>
      {isFetching && <ClockLoader />}
      <ChangeOrderStatusModal
        currentSize={currentSize}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        orderId={currentOrderSelected}
        currentStatus={currentStatus}
        customer={currentCustomer}
        orders={orders}
        setOrders={setOrders}
        currentPage={currentPage}
        getAllOrders={getAll}
        type={type}
      />
      {/* <div>
        <h1>Biểu đồ số lượng đơn hàng của các tỉnh</h1>
        <div
          style={{
            width: "200px",
            height: "200px",
          }}
        >
          <PieChartComponent data={ordersByProvince} />
        </div>
      </div> */}
      <div className="col-12">
        <TodayOrders
          setIsFetching={setIsFetching}
          selectOrderHandle={selectOrderHandle}
          capturedOrderHandle={capturedOrderHandle}
          changeStatusHandle={changeStatusHandle}
          refuseOrderHandle={refuseOrderHandle}
          allOrders={orders}
        />
        <div className="col-12">
          <div className="d-flex align-items-center justify-content-start">
            {/* //date pick kẻ range */}
            <FilterUserDatePicker
              handleFilterByDate={handleFetchOrdersByDateRange}
            />
          </div>
        </div>
        <div className="col-12">
          {ordersByProvince?.length > 0 &&
            totalOrdersByDateRange?.length > 0 && (
              <PieChartComponent
                data={ordersByProvince}
                dataKey={"city"}
                dataLabel={"orderCount"}
              />
            )}
        </div>
        <div className="col-12">
          {ordersByDateToLineChart?.length > 0 &&
            totalOrdersByDateRange?.length > 0 && (
              <ChartComponent
                data={ordersByDateToLineChart}
                dataKey={"date"}
                dataLabel={"total"}
              />
            )}
        </div>
      </div>

      <div className="line-container">
        <span className="line"></span>
      </div>
      {/* select size */}
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        <select onChange={(e) => setCurrentSize(e.target.value)}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="80">80</option>
          <option value="120">120</option>
          <option value="160">160</option>
        </select>
      </div>

      <Paper
        sx={{
          p: 0,

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
                                        changeStatusHandle(
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
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}

        {/* {page === currentPAll && (
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <button
              type="button"
              class="btn btn-light"
              style={{ alignSelf: "flex-end" }}
              onClick={() => {
                setPage(page);
                getAllOrders(80 * ((currentPAll + 1) / 4), 0);
              }}
            >
              Load more
            </button>
          </div>
        )} */}
      </Paper>
    </div>
  );
};
export default FilterOrders;
