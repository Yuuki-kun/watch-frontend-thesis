import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import DatePicker from "react-datepicker";
import ChartDashBoardComponent from "../ChartDashBoardComponent";
// import "react-datepicker/dist/react-datepicker.module.css";
import "react-datepicker/dist/react-datepicker.css";
import ChartComponent from "../ChartComponent";
import DoubleChartComponent from "../DoubleChartComponent";
import ColumnChartComponent from "../ColumnChartComponent";
import DashBoardStatusChart from "../DashBoardStatusChart";
import PieChartComponent from "../PieChartComponent";
import ClockLoader from "../../ClockLoader";

const DashBoard = () => {
  const axiosPrivate = usePrivateRequest();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  useEffect(() => {
    // Tính toán ngày 30 ngày trước
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);

    // Cập nhật state với ngày 30 ngày trước và ngày hiện tại
    setStartDate(thirtyDaysAgo);
    setEndDate(new Date());
  }, []);

  console.log("startDate", startDate);
  console.log("endDate", endDate);

  const [userData, setUserData] = React.useState(null);
  const [orderData, setOrderData] = React.useState(null);
  const [totalOrderPrice, setTotalOrderPrice] = React.useState(null);
  const [isFetching, setIsFetching] = React.useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      setIsFetching(true);
      const response = await axiosPrivate.get(
        `/api/v1/admin-users-mgt/get-user-created-by-date-to-date/${startDate.getTime()}/${endDate.getTime()}`
      );
      setIsFetching(false);
      setUserData(response.data.length);
    };

    const fetchOrderData = async () => {
      setIsFetching(true);

      const response = await axiosPrivate.get(
        `/api/v1/admin/total-orders-by-date-range/${startDate.getTime()}/${endDate.getTime()}`
      );
      setIsFetching(false);

      setOrderData(response.data);
      let total = 0;
      response.data.forEach((order) => {
        total += order.amount;
      });
      setTotalOrderPrice(total);
    };

    fetchUserData();
    fetchOrderData();
  }, [startDate, endDate]);
  console.log("userData", userData);
  console.log("orderData", orderData);
  console.log("totalOrderPrice", totalOrderPrice);

  const [totalOrdersByDate, setTotalOrdersByDate] = useState({});
  const [totalAmountByDate, setTotalAmountByDate] = useState({});
  const [orderStatusCountsByDate, setOrderStatusCountsByDate] = useState({});
  const [statusAndValue, setStatusAndValue] = useState([]);
  // Lặp qua mảng các đơn hàng
  useEffect(() => {
    var totalOrdersByDate = {};
    var totalAmountByDate = {};
    var orderStatusCountsByDate = {};
    orderData &&
      orderData.forEach((order) => {
        // Chuyển đổi orderDate sang định dạng ngày tháng (ví dụ: dd/mm/yyyy)
        const orderDate = new Date(order.orderDate);
        const formattedOrderDate = `${orderDate.getDate()}/${
          orderDate.getMonth() + 1
        }/${orderDate.getFullYear()}`;

        // Lưu trữ tổng số đơn hàng cho mỗi ngày
        if (!totalOrdersByDate[formattedOrderDate]) {
          totalOrdersByDate[formattedOrderDate] = 1;
        } else {
          totalOrdersByDate[formattedOrderDate] += 1;
        }

        // Lưu trữ tổng số tiền cho mỗi ngày
        if (!totalAmountByDate[formattedOrderDate]) {
          totalAmountByDate[formattedOrderDate] = order.amount;
        } else {
          totalAmountByDate[formattedOrderDate] += order.amount;
        }

        // Lưu trữ số lượng trạng thái đơn hàng cho mỗi ngày
        if (!orderStatusCountsByDate[formattedOrderDate]) {
          orderStatusCountsByDate[formattedOrderDate] = {};
        }
        if (
          !orderStatusCountsByDate[formattedOrderDate][order.orderStatus.status]
        ) {
          orderStatusCountsByDate[formattedOrderDate][
            order.orderStatus.status
          ] = 1;
        } else {
          orderStatusCountsByDate[formattedOrderDate][
            order.orderStatus.status
          ] += 1;
        }
      });

    const transformedTotalOrdersByDate = Object.keys(totalOrdersByDate).map(
      (date) => ({
        date: date,
        value: totalOrdersByDate[date],
      })
    );

    const transformedTotalAmountByDate = Object.keys(totalAmountByDate).map(
      (date) => ({
        date: date,
        value: totalAmountByDate[date] / 1000,
      })
    );

    const transformedOrderStatusCountsByDate = Object.keys(
      orderStatusCountsByDate
    ).map((date) => ({
      date: date,
      value: orderStatusCountsByDate[date],
    }));

    setTotalOrdersByDate(transformedTotalOrdersByDate);
    setTotalAmountByDate(transformedTotalAmountByDate);
    setOrderStatusCountsByDate(transformedOrderStatusCountsByDate);
    const newArray = transformedOrderStatusCountsByDate.map((obj) => {
      // Tính tổng các giá trị trong đối tượng value
      const total = Object.values(obj.value).reduce((acc, cur) => acc + cur, 0);
      // Trả về đối tượng mới với cấu trúc "status" và "total"
      return { status: Object.keys(obj.value)[0], total };
    });
    const mergedData = {};

    newArray.forEach((item) => {
      if (!mergedData[item.status]) {
        mergedData[item.status] = item.total;
      } else {
        mergedData[item.status] += item.total;
      }
    });

    // Chuyển đổi mergedData thành mảng mới
    const newData = Object.keys(mergedData).map((status) => ({
      status,
      total: mergedData[status],
    }));

    setStatusAndValue(newData);
  }, [orderData]);

  // In ra 3 object để kiểm tra kết quả
  console.log("Total orders by date:", totalOrdersByDate);
  console.log("Total amount by date:", totalAmountByDate);
  console.log("Order status counts by date:", orderStatusCountsByDate);
  console.log("user=", userData);
  console.log("statusAndValue=", statusAndValue);
  return (
    <div
      style={{
        margin: "16px",
      }}
    >
      {" "}
      <div>
        <label>Start Date:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      </div>
      <div className="d-flex gap-3 mt-2">
        {isFetching && <ClockLoader />}
        <div
          className="col-3"
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            // margin: "10px",
            border: "1px solid #ccc",
            fontSize: "20px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span>Khách hàng</span>
          <span>{userData}</span>
        </div>
        <div
          className="col-3"
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            // margin: "10px",
            border: "1px solid #ccc",
            fontSize: "20px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span>Đơn hàng</span>
          <span>{orderData?.length}</span>
        </div>{" "}
        <div
          className="col-3"
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "10px",
            // margin: "10px",
            border: "1px solid #ccc",
            fontSize: "20px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <span>Tổng Giá Trị</span>
          <span>
            {totalOrderPrice &&
              Math.ceil(totalOrderPrice * 1000).toLocaleString()}
            VND
          </span>
        </div>{" "}
      </div>
      <div className="mt-5">
        <div className="row">
          <div className="col-6">
            <h4>Biểu đồ doanh thu</h4>
            <div className="">
              {orderData && totalAmountByDate && (
                <ChartComponent
                  // data={totalOrdersByDate}
                  dataKey={"date"}
                  dataLabel={"value"}
                  data={totalAmountByDate}
                />
              )}
            </div>
          </div>
          <div className="col-6">
            <h4>Biểu số lượng đơn hàng</h4>
            <div className="">
              {orderData && totalOrdersByDate && (
                <ChartComponent
                  // data={totalOrdersByDate}
                  dataKey={"date"}
                  dataLabel={"value"}
                  data={totalOrdersByDate}
                />
              )}
            </div>
          </div>
          <div className="col-6">
            <h4>Trạng thái đơn hàng trong các ngày</h4>
            <div>
              {orderData && orderStatusCountsByDate && (
                <DashBoardStatusChart
                  // data={totalOrdersByDate}

                  data={orderStatusCountsByDate}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
{
  /* <div className="col-6"> */
}
{
  /* <h4>Trạng thái đơn hàng trong các ngày</h4> */
}
{
  /* <div>
              {orderData && statusAndValue.length > 0 && (
                <ColumnChartComponent
                  // data={totalOrdersByDate}

                  data={statusAndValue}
                  dataKey={"status"}
                  dataLabel={"total"}
                />
              )}
            </div>
          </div> */
}
