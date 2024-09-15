import React, { useEffect, useState } from "react";
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
import { tokens } from "../../../layout/admin/theme";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import ClockLoader from "../../ClockLoader";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
import { getPromotions } from "../../../api/services/admin/PromotionServices";
import Header from "../Header";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import AddProduct from "../products/AddProduct";
import "../products/product.style.css";
import AddDiscount from "./AddDiscount";
import axios from "../../../api/axios";

const columns = [
  { id: "id", label: "Id", minWidth: 50, align: "left" },

  { id: "name", label: "Name", minWidth: 200, align: "left" },
  {
    id: "status",
    label: "Status",
    minWidth: 80,
    align: "left",
    format: (value) => (value ? "Active" : "Inactive"),
  },
  {
    id: "type",
    label: "Type",
    minWidth: 80,
    align: "center",
  },
  {
    id: "value",
    label: "Value",
    minWidth: 80,
    align: "center",
  },
  {
    id: "scope",
    label: "Scope",
    minWidth: 80,
    align: "center",
  },
  {
    id: "priority",
    label: "Priority",
    minWidth: 80,
    align: "center",
  },
  {
    id: "start",
    label: "Starts at",
    minWidth: 70,
    align: "left",
    format: (value) =>
      new Date(value).toLocaleTimeString("vi-VN") +
      ", " +
      new Date(value).toLocaleDateString("vi-VN"),
  },

  {
    id: "expire",
    label: "Expires at",
    minWidth: 70,
    align: "left",
    format: (value) =>
      new Date(value).toLocaleTimeString("vi-VN") +
      ", " +
      new Date(value).toLocaleDateString("vi-VN"),
  },
  {
    id: "description",
    label: "Description",
    minWidth: 150,
    align: "left",
  },

  {
    id: "action",
    label: "Action",
    minWidth: 70,
    align: "right",
  },
];

function createData(
  id,
  name,
  status,
  type,
  value,
  scope,
  priority,
  start,
  expire,
  description
) {
  return {
    id,
    name,
    status,
    type,
    value,
    scope,
    priority,
    start,
    expire,
    description,
  };
}

const Discount = () => {
  const axiosPrivate = usePrivateRequest();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const r_data = await getPromotions(axiosPrivate);
        setData(r_data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isFetching, setIsFetching] = React.useState(false);
  const [currentSize, setCurrentSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows =
    data &&
    data?.map(
      (d) =>
        d &&
        createData(
          d.id,
          d.name,
          d.active,
          d.type,
          d.value,
          d.scope,
          d.priority,
          d.dateStart,
          d.dateEnd,
          d.description
        )
    );
  const [addDiscount, setAddDiscount] = useState(false);
  const openAddDiscount = () => {
    setAddDiscount(true);
  };
  const closeAddDiscount = () => {
    setAddDiscount(false);
  };
  console.log(rows);

  const [currentPromotion, setCurrentPromotion] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const editPromotionHandle = (id) => {
    console.log(id);
    const promotion = data.find((p) => p.id === id);
    console.log(promotion);
    setCurrentPromotion(promotion);
    setOpenEdit(!openEdit);
  };
  function getDefaultDateTime(date) {
    // Trả về một chuỗi ngày/giờ hiện tại (hoặc bất kỳ giá trị mặc định nào bạn muốn)
    const now = new Date(date);
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let day = now.getDate();
    day = day < 10 ? "0" + day : day;
    let hour = now.getHours();
    hour = hour < 10 ? "0" + hour : hour;
    let minute = now.getMinutes();
    minute = minute < 10 ? "0" + minute : minute;
    return `${year}-${month}-${day}T${hour}:${minute}`;
  }

  const [productApplyPromotion, setProductApplyPromotion] = useState([]); // [id, name, img, price, discount, finalPrice, quantity, total, status
  const [listSelectedProductId, setListSelectedProductId] = useState([]); // [id, name, img, price, discount, finalPrice, quantity, total, status]
  const [listProductToAdd, setListProductToAdd] = useState([]); // [id, name, img, price, discount, finalPrice, quantity, total, status
  //

  useEffect(() => {
    const getProductApplyPromotion = async () => {
      try {
        const productApply = await axiosPrivate.get(
          `/api/v1/admin-promotions-mgt/get-products-promotion/${currentPromotion.id}`
        );
        setProductApplyPromotion(productApply.data);
        setListSelectedProductId(productApply.data.map((p) => p.id));
        console.log(productApply.data);
      } catch (e) {
        console.log(e);
      }
    };
    const getProducts = async () => {
      //lay cac san pham va thong tin khuyen mai hien co cua chung
      try {
        const response = await axios.get("/products/get-all/watch");
        setListProductToAdd(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    openEdit && getProductApplyPromotion(currentPromotion.id);
    openEdit && getProducts();
  }, [openEdit]);
  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };
  const handDeleteProductFromPromotion = (productId) => {
    //update listSelectedProductId
    const newListSelectedProductId = listSelectedProductId.filter(
      (id) => id !== productId
    );
    setListSelectedProductId(newListSelectedProductId);
    //update productApplyPromotion
    const newProductApplyPromotion = productApplyPromotion.filter(
      (p) => p.id !== productId
    );
    setProductApplyPromotion(newProductApplyPromotion);
  };

  console.log(listSelectedProductId);

  const [discountName, setDiscountName] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountScope, setDiscountScope] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountPriority, setDiscountPriority] = useState(-1);
  const [discountStartDate, setDiscountStartDate] = useState(null);
  const [discountStartTime, setDiscountStartTime] = useState(null);
  const [discountEndDate, setDiscountEndDate] = useState(null);
  const [discountEndTime, setDiscountEndTime] = useState(null);
  const [promotionStatus, setPromotionStatus] = useState("");
  useEffect(() => {
    if (currentPromotion) {
      setDiscountName(currentPromotion.name);
      setDiscountType(currentPromotion.type);
      setDiscountScope(currentPromotion.scope);
      setDiscountValue(currentPromotion.value);
      setDiscountPriority(currentPromotion.priority);
      setDiscountStartDate(getDefaultDateTime(currentPromotion.dateStart));
      setDiscountEndDate(getDefaultDateTime(currentPromotion.dateEnd));
      // setPromotionStatus(currentPromotion.active);
    }
  }, [currentPromotion]);

  const convertToBackendDateFormat = (datetimeLocalValue) => {
    const [datePart, timePart] = datetimeLocalValue.split("T");
    const [year, month, day] = datePart.split("-");
    const [hour, minute] = timePart.split(":");
    return new Date(year, month - 1, day, hour, minute); // Tháng trong JavaScript tính từ 0
  };
  //update promotion and set its products
  console.log(promotionStatus);
  const handleUpdatePromotion = async () => {
    console.log(currentPromotion.id, listSelectedProductId);
    const data = {
      id: currentPromotion.id,
      name: discountName,
      type: discountType,
      value: discountValue,
      scope: discountScope,
      priority: discountPriority,
      dateStart: convertToBackendDateFormat(discountStartDate),
      dateEnd: convertToBackendDateFormat(discountEndDate),
      active: promotionStatus === "true" ? true : false,
    };
    console.log(data);
    try {
      const response = await axiosPrivate.put(
        `/api/v1/admin-promotions-mgt/update/${currentPromotion.id}`,
        { promotionDto: data, watchIds: listSelectedProductId }
      );
      console.log(response);
      //update productApplyPromotion
      const newProductApplyPromotion = productApplyPromotion.map((p) => {
        return {
          id: p.id,
          name: p.name,
          images: p.images,
          defaultPrices: p.defaultPrices,
        };
      });
      setProductApplyPromotion(newProductApplyPromotion);
      //update listSelectedProductId
      setListSelectedProductId([]);
      setOpenEdit(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleStatusChange = (e) => {
    setPromotionStatus(e.target.value); // Cập nhật giá trị state từ event
  };
  console.log(productApplyPromotion);
  console.log(listSelectedProductId);
  return (
    <>
      <div style={{ padding: "16px" }}>
        {isFetching && <ClockLoader />}
        <div className="d-flex gap-5 align-items-start justify-content-between mb-4">
          <Header
            title={"Discounts Management"}
            subtitle={"Management your product's"}
          />{" "}
          <button
            style={{
              width: "250px",
              height: "35px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: "10px",
              padding: "0 10px",
              fontSize: "18px",
              fontWeight: "500",
              backgroundColor: "rgb(130, 101, 101)",
              color: "white",
              border: "none",
              borderRadius: "15px",
            }}
            onClick={openAddDiscount}
          >
            <AddCircleOutlinedIcon />
            Add New Discount
          </button>
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
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                fontSize="16px"
                              >
                                {column.id !== "action" ? (
                                  <>
                                    {column.id === "name" && (
                                      <img
                                        src={row.img}
                                        style={{
                                          width: "75px",
                                          height: "auto",
                                          marginRight: "10px",
                                          fontSize: "16px",
                                        }}
                                      />
                                    )}
                                    {(column.format &&
                                      typeof value === "number") ||
                                    typeof value === "boolean"
                                      ? column.format(value)
                                      : value}
                                  </>
                                ) : (
                                  <div>
                                    <button
                                      style={{
                                        backgroundColor: "rgb(130, 101, 101)",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        border: "none",
                                        marginRight: "10px",
                                      }}
                                      onClick={() =>
                                        editPromotionHandle(row.id)
                                      }
                                    >
                                      Chỉnh sửa
                                    </button>
                                    {/* <button
                                      style={{
                                        backgroundColor: "rgb(130, 101, 101)",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        border: "none",
                                        marginRight: "10px",
                                      }}
                                    >
                                      Disable
                                    </button> */}
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
      </div>
      {openEdit && (
        <div style={{ padding: "16px", display: "flex", gap: "2%" }}>
          <div style={{ width: "30%" }}>
            <h4>Chỉnh sửa khuyến mãi</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <label htmlFor="name" style={{ marginTop: "10px" }}>
                Tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={discountName}
                onChange={(e) => setDiscountName(e.target.value)}
              />
              <label htmlFor="status" style={{ marginTop: "10px" }}>
                Trạng thái
              </label>
              <select
                id="status"
                name="status"
                value={promotionStatus}
                onChange={handleStatusChange}
                defaultValue={"true"}
              >
                <option value="">Chọn trạng thái</option>

                <option value="true">Đang áp dụng</option>
                <option value="false">Ngưng</option>
              </select>
              <label htmlFor="type" style={{ marginTop: "10px" }}>
                Loại
              </label>
              <input
                type="text"
                id="type"
                name="type"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
              />
              <label htmlFor="value" style={{ marginTop: "10px" }}>
                Giá trị
              </label>
              <input
                type="number"
                id="value"
                name="value"
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
              />
              <label htmlFor="scope" style={{ marginTop: "10px" }}>
                Phạm vi
              </label>
              <input
                type="text"
                id="scope"
                name="scope"
                value={discountScope}
                onChange={(e) => setDiscountScope(e.target.value)}
              />
              <label htmlFor="priority" style={{ marginTop: "10px" }}>
                Ưu tiên
              </label>
              <input
                type="number"
                id="priority"
                name="priority"
                value={discountPriority}
                onChange={(e) => setDiscountPriority(e.target.value)}
              />
              <label htmlFor="startDate" style={{ marginTop: "10px" }}>
                Ngày hiệu lực
              </label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={
                  // new Date(currentPromotion.dateStart).toLocaleTimeString(
                  //   "vi-VN"
                  // ) +
                  // ", " +
                  // new Date(currentPromotion.dateEnd).toLocaleDateString("vi-VN")
                  // new Date(currentPromotion.dateStart)
                  discountStartDate
                }
                onChange={(e) => setDiscountStartDate(e.target.value)}
              />{" "}
              <label htmlFor="endDate" style={{ marginTop: "10px" }}>
                Ngày hết hạn
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={discountEndDate}
                onChange={(e) => setDiscountEndDate(e.target.value)}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
              }}
            >
              <button
                style={{
                  backgroundColor: "rgb(130, 101, 101)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={handleUpdatePromotion}
              >
                Lưu
              </button>
              <button
                style={{
                  backgroundColor: "rgb(130, 101, 101)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                }}
                onClick={() => setOpenEdit(false)}
              >
                Hủy
              </button>
            </div>
          </div>
          {currentPromotion && currentPromotion.scope === "specific" && (
            <div
              style={{
                width: "40%",
                height: "100%",
                overflowY: "auto",
              }}
            >
              <h5>Các sản phẩm đang được áp dụng khuyến mãi này:</h5>
              {productApplyPromotion &&
                productApplyPromotion.length > 0 &&
                productApplyPromotion.map((p) => (
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      marginBottom: "5px",
                    }}
                  >
                    <img
                      src={findMainImage(p.images)}
                      style={{
                        width: "75px",
                        height: "auto",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <p>{p.name}</p>
                      <p>Giá gốc: {p.defaultPrices}</p>
                      <p>
                        Giá sau khuyến mãi:{" "}
                        {p.defaultPrices * (1 - currentPromotion.value / 100)}{" "}
                        VND
                      </p>
                    </div>
                    <button
                      type="button"
                      style={{
                        marginLeft: "auto",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                      }}
                      onClick={() => handDeleteProductFromPromotion(p.id)}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          )}
          <div
            style={{
              flex: 1,
              height: "500px",
              overflowY: "auto",
              fontSize: "14px",
            }}
          >
            <h5>Thêm sản phẩm mới</h5>
            {listProductToAdd &&
              listProductToAdd.map((p) => (
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    marginBottom: "5px",
                    backgroundColor: `${
                      listSelectedProductId.includes(p.id) ||
                      p.promotion.includes(currentPromotion.name)
                        ? "rgba(0, 0, 0, 0.4)"
                        : ""
                    }`,
                  }}
                >
                  <img
                    src={findMainImage(p.images)}
                    style={{
                      width: "75px",
                      height: "auto",
                      marginRight: "10px",
                      borderRadius: "5px",
                    }}
                  />
                  <div>
                    <p>{p.name}</p>
                    <p>Giá gốc: {p.defaultPrices}</p>
                    <p>Đang áp dụng các khuyến mãi:</p>
                    {p.promotion &&
                      p.promotion.map((promo) => (
                        <p
                          style={{
                            color: "red",
                            fontWeight: "700",
                          }}
                        >
                          {promo}
                        </p>
                      ))}
                  </div>
                  <button
                    type="button"
                    style={{
                      marginLeft: "auto",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                    }}
                    disabled={
                      listSelectedProductId.includes(p.id) ||
                      p.promotion.includes(currentPromotion.name)
                    }
                    onClick={() => {
                      setProductApplyPromotion([
                        ...productApplyPromotion,
                        {
                          id: p.id,
                          name: p.name,
                          images: p.images,
                          defaultPrices: p.defaultPrices,
                        },
                      ]);
                      setListSelectedProductId([
                        ...listSelectedProductId,
                        p.id,
                      ]);
                    }}
                  >
                    +
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
      <div
        className={`overlay ${addDiscount ? "show-add-prod" : "hide-add-prod"}`}
      ></div>
      <AddDiscount closeAddProduct={closeAddDiscount} isShow={addDiscount} />
    </>
  );
};

export default Discount;
