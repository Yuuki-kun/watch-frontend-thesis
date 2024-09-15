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
import React, { useEffect } from "react";
import { tokens } from "../../../layout/admin/theme";

import Actions from "./Actions";
import { getProducts } from "../../../api/services/productService";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";
import ClockLoader from "../../ClockLoader";
import { useNavigate } from "react-router-dom";

const columns = [
  { id: "id", label: "Id", width: 100, align: "left" },
  { id: "name", label: "Name", minWidth: 300, align: "left" },
  { id: "reference", label: "Reference", width: 100, align: "left" },

  {
    id: "pricing",
    label: "Pricing",
    minWidth: 100,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "created",
    label: "Created",
    minWidth: 150,
    align: "left",
  },

  {
    id: "updated",
    label: "Updated",
    minWidth: 150,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
  },
];

function createData(id, name, pricing, created, updated, status) {
  return { id, name, pricing, created, updated, status };
}
const FilterProductAll = ({ type }) => {
  const [currentSize, setCurrentSize] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [totalProducts, setTotalProducts] = React.useState(0);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const rows = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     pricing: "$10.00",
  //     created: "2021-10-10",
  //     updated: "2021-10-10",
  //     status: "Active",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     pricing: "$20.00",
  //     created: "2021-10-10",
  //     updated: "2021-10-10",
  //     status: "Archived",
  //   },
  // ];

  const [currentPage, setCurrentPage] = React.useState(0);

  const displayActions = (e) => {
    console.log("display actions");
  };
  const [products, setProducts] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);
  React.useEffect(() => {
    const getP = async () => {
      setIsFetching(true);
      try {
        const data = await getProducts(type, currentSize, 0);
        setProducts(data.data.content);
        setTotalProducts(data.data.totalElements);
        setIsFetching(false);
        console.log(data);
      } catch (err) {
        console.error(err);
        setIsFetching(false);
      }
    };
    getP();
  }, [currentSize]);
  //     id: 1,
  //     name: "Product 1",
  //     pricing: "$10.00",
  //     created: "2021-10-10",
  //     updated: "2021-10-10",
  //     status: "Active",
  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };

  const rows =
    products &&
    products?.map(
      (p) =>
        p &&
        createData(
          findMainImage(p.images),
          p.id,
          p.reference,
          p.name,
          p.defaultPrices,
          new Date(p.createdDate).toLocaleString("vi-VN"),
          new Date(p.createdDate).toLocaleString("vi-VN"),
          p.active ? "Active" : "Archived"
        )
    );
  console.log(rows);
  function createData(
    img,
    id,
    reference,
    name,
    pricing,
    created,
    updated,
    status
  ) {
    return { img, id, reference, name, pricing, created, updated, status };
  }
  const handleChangePage = async (typec) => {
    let page = 0;
    if (typec === "next") {
      page = currentPage + 1;
    } else {
      page = currentPage - 1;
    }
    setIsFetching(true);
    try {
      const data = await getProducts(type, currentSize, page);
      setProducts(data.data.content);
      setCurrentPage(page);
      setTotalProducts(data.data.totalElements);
      setIsFetching(false);
      console.log(data);
    } catch (err) {
      console.error(err);
      setIsFetching(false);
    }
  };
  console.log(currentSize);
  const navigate = useNavigate();

  const [sortType, setSortType] = React.useState("Id");
  const handleChangeSort = (type) => {
    setSortType(type);
  };

  const sortProductsById = (products) => {
    const sortedProducts = [...products].sort((a, b) => a.id - b.id);
    setProducts(sortedProducts);
  };

  const sortProductsByDate = (products) => {
    const sortedProducts = [...products].sort(
      (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
    );
    setProducts(sortedProducts);
  };

  const sortProductsByPrice = (products) => {
    const sortedProducts = [...products].sort(
      (a, b) => a.defaultPrices - b.defaultPrices
    );
    setProducts(sortedProducts);
  };

  useEffect(() => {
    if (sortType === "Id") {
      sortProductsById(products);
    } else if (sortType === "date") {
      sortProductsByDate(products);
    } else if (sortType === "price") {
      sortProductsByPrice(products);
    }
  }, [sortType]);

  return (
    <div style={{ padding: "16px" }}>
      {isFetching && <ClockLoader />}
      <div>
        <h5>Tổng: {totalProducts} sản phẩm</h5>
      </div>
      <div className="mb-2">
        <span>Chọn số lượng hiển thị</span>
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
      <div className="mb-2">
        <span>Sắp xếp</span>
        <select
          name=""
          id=""
          onChange={(e) => {
            handleChangeSort(e.target.value);
          }}
        >
          <option value="Id">ID</option>
          <option value="date">Ngày tạo</option>
          <option value="price">Giá</option>
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
                              style={{
                                fontSize: "14px",
                                display: column.id === "name" ? "flex" : "",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                navigate(`/admin/products/${row.reference}`)
                              }
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
                                      }}
                                    />
                                  )}
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </>
                              ) : (
                                <Actions
                                  status={row.status}
                                  id={row.id}
                                  products={products}
                                  setProducts={setProducts}
                                />
                              )}
                            </TableCell>

                            //   <>
                            //     {column.id !== "action" ? (
                            //       <TableCell
                            //         key={column.id}
                            //         align={column.align}
                            //         style={{ fontSize: "14px" }}
                            //       >
                            //         {column.id === "name" && (
                            //           <img
                            //             src="https://www.w3schools.com/w3images/avatar2.png"
                            //             style={{
                            //               width: "50px",
                            //               height: "auto",
                            //               marginRight: "10px",
                            //             }}
                            //           />
                            //         )}
                            //         {column.format && typeof value === "number"
                            //           ? column.format(value)
                            //           : value}
                            //       </TableCell>
                            //     ) : (
                            //       <TableCell
                            //         key={"action-cell"}
                            //         align={"right"}
                            //         style={{ fontSize: "14px" }}
                            //       >
                            //         <div className="order-mgt-btn-ctn product-mgt-active-btn-cont">
                            //           {row.status === "Active" && <ActiveActions />}
                            //           {row.status === "Archived" && (
                            //             <ArchivedActions />
                            //           )}
                            //         </div>
                            //       </TableCell>
                            //     )}
                            //   </>
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
  );
};

export default FilterProductAll;
