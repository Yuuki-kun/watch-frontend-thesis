import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import Header from "./Header";
import "./orders/orders.styles.css";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Spring } from "react-spring";
import "react-datepicker/dist/react-datepicker.css";

import {
  getUserRelatedInfo,
  getUsersService,
} from "../../api/services/admin/UserServices";
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
import ClockLoader from "../../components/ClockLoader";
import { Tab } from "bootstrap";
import EditUserModal from "../modal/EditUserModal";
import UserChart from "./UserChart";
import { Chart } from "chart.js";
import ReactDatePicker from "react-datepicker";
import MyDatePickerRange from "./MyDatePickerRange";
import FilterUserDatePicker from "./FilterUserDatePicker";
const columns = [
  { id: "id", label: "ID", minWidth: 20, align: "left" },
  { id: "name", label: "Name", minWidth: 200, align: "left" },
  { id: "email", label: "Email", width: 100, align: "left" },

  {
    id: "created",
    label: "Created",
    minWidth: 100,
    align: "left",
  },

  {
    id: "phone",
    label: "Phone",
    minWidth: 70,
    align: "left",
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 50,
    align: "left",
  },
  {
    id: "lastLogin",
    label: "Last Login",
    minWidth: 100,
    align: "left",
  },
  {
    id: "enabled",
    label: "Enabled",
    minWidth: 100,
    align: "left",
  },
  { id: "action", label: "Action", minWidth: 100, align: "right" },
];

function createData(
  img,
  id,
  name,
  email,
  created,
  phone,
  gender,
  lastLogin,
  enabled
) {
  return { img, id, name, email, created, phone, gender, lastLogin, enabled };
}
const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useRefreshToken();

  const [currentSize, setCurrentSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    const getUsers = async () => {
      setIsFetching(true);
      try {
        const data = await getUsersService(axiosPrivate, currentSize, 0);
        setUsers(data.content);
        setIsFetching(false);
        console.log(data);
      } catch (err) {
        console.error(err);
        setIsFetching(false);
      }
    };
    getUsers();
  }, [currentSize]);

  console.log(currentSize);

  const rows =
    users &&
    users?.map(
      (u) =>
        u &&
        createData(
          u.avatarLink,
          u.id,
          u.firstName + " " + u.lastName,
          u.email,
          // u.createdAt[2] + "/" + u.createdAt[1] + "/" + u.createdAt[0],
          new Date(u.createdAt).toUTCString().split(" ").slice(1, 4).join(" "),
          u.phoneNumber,
          u.gender,
          new Date(u.lastLogin).toUTCString().split(" ").slice(1, 4).join(" "),
          u.enabled
        )
    );

  const handleChangePage = async (type) => {
    let page = 0;
    if (type === "next") {
      page = currentPage + 1;
    } else {
      page = currentPage - 1;
    }
    setIsFetching(true);
    try {
      const data = await getUsersService(axiosPrivate, currentSize, page);
      setUsers(data.content);
      setCurrentPage(page);
      setIsFetching(false);
    } catch (err) {
      console.error(err);
      setIsFetching(false);
    }
  };

  const getUserReInfo = async (userId) => {
    try {
      const data = await getUserRelatedInfo(axiosPrivate, userId);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const openModal = (e, c) => {
    e.stopPropagation();
    console.log(c);
    setIsModalOpen(true);
    setSelectedCustomer(c);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeAccountStatus = async (e, userId, status) => {
    e.stopPropagation();
    try {
      setIsFetching(true);
      const data = await axiosPrivate.put(
        `/api/v1/admin-users-mgt/change-account-status/${userId}/${status}`
      );

      console.log(data);
      setIsFetching(false);
      const updatedUsers = users?.map((u) => {
        if (u && u?.id === userId) {
          return {
            ...u,
            enabled: status === "enable" ? "Enabled" : "Disabled",
          };
        }
        return u;
      });
      setUsers(updatedUsers);
    } catch (err) {
      console.error(err);
      setIsFetching(false);
    }
  };
  const sampleDatas = {
    "2024-04-01": 10,
    "2024-04-02": 20,
    "2024-04-03": 15,
  };
  const [dateUserCreated, setDateUserCreated] = useState([]);
  const [totalUserCreatedByDateRange, setTotalUserCreatedByDateRange] =
    useState([]);
  // useEffect(() => {
  //   const fetchUserCreated = async () => {
  //     const today = new Date(); // Lấy thời gian hiện tại
  //     const sevenDaysAgo = new Date(today); // Tạo một đối tượng Date mới từ thời gian hiện tại
  //     sevenDaysAgo.setDate(today.getDate() - 7); // Giảm 7 ngày từ ngày hiện tại
  //     // const date1 = new Date("2024-04-21").getTime();
  //     // const date2 = new Date("2024-05-9").getTime();

  //     try {
  //       // const res = await axiosPrivate.get(
  //       //   `/api/v1/admin-users-mgt/get-user-created-by-date-to-date/${today.getTime()}/${sevenDaysAgo.getTime()}?size=20&page=0`
  //       // );
  //       const res = await axiosPrivate.get(
  //         `/api/v1/admin-users-mgt/get-user-created-by-date-to-date/${today}/${sevenDaysAgo}?size=20&page=0`
  //       );

  //       handleProcessCreatedData(res);

  //       // setDateUserCreated(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchUserCreated();
  // }, []);

  const handleProcessCreatedData = (res) => {
    const objects = res.data;
    console.log(objects);
    // Đối tượng Map để lưu trữ số lượng đối tượng cho mỗi ngày
    const countByDate = new Map();

    // Duyệt qua mảng các đối tượng và thêm vào đối tượng Map
    objects.forEach((obj) => {
      // Lấy ngày từ createdAt
      if (obj !== null) {
        const date = new Date(obj.createdAt).toISOString().split("T")[0]; // Chuyển đổi số milliseconds thành định dạng ngày và sau đó lấy ngày

        // Kiểm tra xem đã tồn tại key cho ngày này trong đối tượng Map chưa
        if (countByDate.has(date)) {
          // Nếu đã tồn tại, tăng giá trị số lượng lên 1
          countByDate.set(date, countByDate.get(date) + 1);
        } else {
          // Nếu chưa tồn tại, khởi tạo giá trị số lượng là 1
          countByDate.set(date, 1);
        }
      }
    });
    const result = Array.from(countByDate).map(([date, total]) => ({
      date,
      total,
    }));

    result.sort((a, b) => {
      // Chuyển đổi chuỗi ngày thành đối tượng Date để so sánh
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      // Sử dụng toán tử so sánh để so sánh ngày
      if (dateA < dateB) {
        return -1; // Trả về -1 nếu ngày của a trước ngày của b
      }
      if (dateA > dateB) {
        return 1; // Trả về 1 nếu ngày của a sau ngày của b
      }
      return 0; // Trả về 0 nếu ngày của a và ngày của b bằng nhau
    });

    setDateUserCreated(result);
  };

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = document.getElementById("chart-container").clientWidth;
      setContainerWidth(width);
    };

    handleResize(); // Lấy kích thước ban đầu
    window.addEventListener("resize", handleResize); // Lắng nghe sự kiện resize của cửa sổ

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const handleSelectedRangeDate = async (fromDate, toDate) => {
    try {
      const res = await axiosPrivate.get(
        `/api/v1/admin-users-mgt/get-user-created-by-date-to-date/${fromDate.getTime()}/${toDate.getTime()}?size=20&page=0`
      );
      console.log("res data = " + res.data);
      console.log("???????");
      setTotalUserCreatedByDateRange(res.data);

      setFromDate(fromDate);
      setToDate(toDate);
      handleProcessCreatedData(res);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(totalUserCreatedByDateRange);
  const [filterType, setFilterType] = useState([]);
  const setFilterTypeHandle = (type) => {
    if (filterType.includes(type)) {
      setFilterType([...filterType.filter((t) => t !== type)]);
    } else {
      setFilterType([...filterType, type]);
    }
  };
  const handleFilterByDate = async (startDate, endDate) => {
    try {
      setIsFetching(true);
      startDate = startDate.getTime();
      endDate = endDate.getTime();
      const res = await axiosPrivate.get(
        `/api/v1/admin-users-mgt/get-user-created-by-date-to-date-page/${startDate}/${endDate}?size=${currentSize}&page=${currentPage}`
      );
      console.log(res);
      setUsers(res.data.content);
      setIsFetching(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="ad-orders-container">
      {isFetching && <ClockLoader />}
      <EditUserModal
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        currentPage={currentPage}
        customer={selectedCustomer}
        setUsers={setUsers}
      />
      <div className="row">
        <div className="col-12">
          <Header
            title={"Customers"}
            subtitle={"Management your customer's accounts"}
          />
        </div>
        <div className="col-12 d-flex align-items-center justify-content-center">
          <div
            id="chart-container"
            className="chart-container mt-2 mb-2"
            style={{ width: "95%" }}
          >
            <h5 className="mb-4">
              Biểu đồ số lượng khách hàng đăng ký tài khoản
            </h5>
            {/* <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
              {(props) => (
                <div style={props} className="position-relative"> */}
            <MyDatePickerRange
              handleSelectedRangeDate={handleSelectedRangeDate}
            />
            <div
              style={{
                marginTop: "10px",
              }}
            >
              Tổng:{" "}
              {totalUserCreatedByDateRange &&
                totalUserCreatedByDateRange.length}
            </div>
            <UserChart data={dateUserCreated} width={containerWidth} />
            {/* </div> */}
            {/* )}
            </Spring> */}
          </div>
        </div>

        <div className="line-container">
          <div className="line"></div>
        </div>
        <div className="col-12" style={{ padding: "16px" }}>
          <div className="mb-2">
            <span>Select Size</span>
            <select
              name=""
              id=""
              onChange={(e) => {
                setCurrentSize(e.target.value);
                setRowsPerPage(e.target.value);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="40">40</option>
              <option value="40">50</option>
            </select>
          </div>

          {/* <div className="mb-2">
            <span>Lọc theo</span>
            <div className="d-flex align-item-center justify-content-start gap-2">
              <div>
                <button onClick={() => setFilterTypeHandle("date")}>
                  Ngày Tham Gia
                </button>
                {filterType.includes("date") && (
                  <FilterUserDatePicker
                    handleFilterByDate={handleFilterByDate}
                  />
                )}
              </div>
              <div>
                <button onClick={() => setFilterTypeHandle("sex")}>
                  Giới Tính
                </button>
                {filterType.includes("sex") && (
                  <div>
                    <select name="gender" id="gender" defaultValue="Nam">
                      <option value="Nam">Nam</option>
                      <option value="Nu">Nữ</option>
                    </select>{" "}
                  </div>
                )}
              </div>

              <div>
                <button onClick={() => setFilterTypeHandle("status")}>
                  Trạng thái
                </button>
                {filterType.includes("status") && (
                  <div>
                    <select name="gender" id="gender" defaultValue="Enabled">
                      <option value="Enabled">Đang Hoạt Động</option>
                      <option value="Disabled">Đã Khóa</option>
                    </select>{" "}
                  </div>
                )}
              </div>
            </div>
          </div> */}

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
                                    display: column.id === "name" ? "flex" : "",
                                    alignItems: "center",
                                  }}
                                  onClick={() =>
                                    navigate(`user-info/${row.id}`)
                                  }
                                >
                                  {column.id === "enabled" && (
                                    <span
                                      style={{
                                        fontWeight: "bold",
                                        width: "80px",
                                        color:
                                          value === "Enabled" ? "green" : "red",
                                        padding: "3px 8px",
                                        borderRadius: "10px",
                                        background:
                                          value === "Enabled"
                                            ? "#e6ffe6"
                                            : "#ffcccc",
                                        border: "1px solid #ddd",
                                      }}
                                    >
                                      {column.format &&
                                      typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </span>
                                  )}
                                  {column.id !== "action" &&
                                    column.id === "name" && (
                                      <>
                                        <img
                                          src={`${
                                            row.img !== null
                                              ? "http://localhost:8080/image/fileSystem/avatar/" +
                                                row.img
                                              : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                                          }`}
                                          style={{
                                            width: "55px",
                                            height: "auto",
                                            marginRight: "10px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {value}
                                        </span>
                                      </>
                                    )}{" "}
                                  {column.id !== "enabled" &&
                                    column.id !== "name" &&
                                    value}
                                  {column.id === "action" && (
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "10px",
                                        width: "100%",
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <button
                                        onClick={(e) =>
                                          openModal(
                                            e,
                                            users.filter(
                                              (u) => u.id === row.id
                                            )[0]
                                          )
                                        }
                                        style={{
                                          border: "none",
                                          background: "transparent",
                                          cursor: "pointer",
                                          color: "	#ce7800",
                                          fontSize: "20px",
                                          fontWeight: "bold",
                                          border: "1px solid #cecece",
                                          width: "35px",
                                          height: "35px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <ManageAccountsOutlinedIcon fontSize="large" />
                                      </button>
                                      {row.enabled === "Enabled" ? (
                                        <button
                                          onClick={(e) =>
                                            handleChangeAccountStatus(
                                              e,
                                              row && row.id,
                                              "disable"
                                            )
                                          }
                                          style={{
                                            border: "none",
                                            background: "transparent",
                                            cursor: "pointer",
                                            color: "	#ff4444",
                                            fontSize: "25px",
                                            fontWeight: "bold",
                                            border: "1px solid #cecece",
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "10px",
                                          }}
                                        >
                                          <PersonOffOutlinedIcon fontSize="large" />
                                        </button>
                                      ) : (
                                        <button
                                          onClick={(e) =>
                                            handleChangeAccountStatus(
                                              e,
                                              row && row.id,
                                              "enable"
                                            )
                                          }
                                          style={{
                                            border: "none",
                                            background: "transparent",
                                            cursor: "pointer",
                                            color: "	green",
                                            fontSize: "25px",
                                            fontWeight: "bold",
                                            border: "1px solid #cecece",
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "10px",
                                          }}
                                        >
                                          <PersonOutlineOutlinedIcon fontSize="large" />
                                        </button>
                                      )}

                                      <button
                                        onClick={() =>
                                          getUserReInfo(row && row.id)
                                        }
                                        style={{
                                          border: "none",
                                          background: "transparent",
                                          cursor: "pointer",
                                          color: "#ff4444",
                                          fontSize: "25px",
                                          fontWeight: "bold",
                                          border: "1px solid #cecece",
                                          width: "35px",
                                          height: "35px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        <PersonRemoveOutlinedIcon fontSize="large" />
                                      </button>
                                    </div>
                                  )}
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
      </div>
    </div>
  );
};

export default Users;
