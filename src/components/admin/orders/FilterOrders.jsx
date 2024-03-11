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
import {
  captureOrder,
  getAll,
} from "../../../api/services/admin/OrderServices";
import "./orders.styles.css";

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

const FilterOrders = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const selectOrderHandle = () => {
    console.log("PL");
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = React.useState([]);

  const axiosPrivate = usePrivateRequest();
  React.useEffect(() => {
    const getAllOrders = async () => {
      try {
        const orders = await getAll(axiosPrivate);
        setOrders(orders);
        console.log(orders);
      } catch (err) {
        console.error(err);
      }
    };
    getAllOrders();
  }, []);

  const rows = orders?.map(
    (order) =>
      order &&
      createData(
        order.id,
        order.customer.firstName + " " + order.customer.lastName,
        "order.description",
        order.amount,
        new Date(order.orderDate).toUTCString(),
        order.orderStatus?.status
      )
  );
  console.log("row=" + JSON.stringify(rows[1]));

  const capturedOrderHandle = async (orderId) => {
    try {
      const res = await captureOrder(axiosPrivate, orderId);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
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
                      onClick={selectOrderHandle}
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
                                  {row.status === "UNCAPTURED" && (
                                    <>
                                      <button
                                        className="order-mgt-btn capture-btn"
                                        onClick={() =>
                                          capturedOrderHandle(row.id)
                                        }
                                      >
                                        Capture
                                      </button>
                                      <button
                                        className="order-mgt-btn cancel-btn"
                                        onClick={() =>
                                          capturedOrderHandle(row.id)
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

                                  <button className="order-mgt-btn view-btn">
                                    View
                                  </button>
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default FilterOrders;
