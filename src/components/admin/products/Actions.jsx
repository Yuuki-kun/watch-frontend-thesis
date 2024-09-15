import React, { useEffect, useRef } from "react";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";
import usePrivateRequest from "../../../hooks/usePrivateRequest";
const Actions = ({ status, id, products, setProducts }) => {
  console.log(status);

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (e) => {
    // setAnchorEl(event.currentTarget);
    e.stopPropagation();
    setOpen((prev) => !prev);
  };
  const containerRef = useRef(null);
  const openButtonRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target) &&
      !openButtonRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const axiosPrivate = usePrivateRequest();
  const changeStatus = async (id, status) => {
    try {
      const res = await axiosPrivate.post(
        `/api/v1/admin/products/change-status/${id}/${status}`
      );
      const newProduct = res.data;
      const updatedProducts = products.map((product) => {
        if (product.id === id) {
          return newProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHandle = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await axiosPrivate.delete(`/api/v1/admin/products/${id}`);
      if (res.data === "success") {
        const newProducts = products.filter((product) => product.id !== id);
        setProducts(newProducts);
      } else if (res.data === "cant") {
        alert(
          "Ban khong the xoa san pham nay vi no dang duoc su dung trong don hang"
        );
      }
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div style={{ position: "relative" }}>
        <button
          className="product-mgt-btn more-btn"
          // onClick={(e) =>
          //   capturedOrderHandle(e, row.id)
          // }
          onClick={(e) => handleClick(e)}
          ref={openButtonRef}
        >
          <MoreHorizSharpIcon />
        </button>
        <div
          className={`active-more-options-cont ${
            open ? "active-more-ops" : "hide-more-ops"
          }`}
          // onMouseDown={handleMouseLeave}
          ref={containerRef}
        >
          <div className="active-more-options">
            {/* <button className="active-more-option">Edit</button>
          <button className="active-more-option">Delete</button> */}
            {status === "Active" ? (
              <Active
                id={id}
                changeStatus={changeStatus}
                deleteHandle={deleteHandle}
              />
            ) : null}
            {status === "Archived" ? (
              <Archived
                id={id}
                changeStatus={changeStatus}
                deleteHandle={deleteHandle}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const Active = ({ id, changeStatus, deleteHandle }) => {
  const archiveHandle = async (e, id) => {
    e.stopPropagation();
    await changeStatus(id, "archive");
  };
  return (
    <ul>
      {/* <li>
        <button
          className="active-more-option"
          onClick={(e) => editHandle(e, id)}
        >
          Edit
        </button>
      </li> */}
      <li>
        <button
          className="active-more-option"
          onClick={(e) => archiveHandle(e, id)}
        >
          Archive
        </button>
      </li>
      <li>
        <button
          className="active-more-option"
          onClick={(e) => deleteHandle(e, id)}
        >
          Delete
        </button>
      </li>
    </ul>
  );
};

const Archived = ({ id, changeStatus, deleteHandle }) => {
  const restoreHandle = async (e, id) => {
    e.stopPropagation();
    await changeStatus(id, "active");
  };
  return (
    <ul>
      <li>
        <button
          className="active-more-option"
          onClick={(e) => restoreHandle(e, id)}
        >
          Restore
        </button>
      </li>
      <li>
        <button
          className="active-more-option"
          onClick={(e) => deleteHandle(e, id)}
        >
          Delete
        </button>
      </li>
    </ul>
  );
};

export default Actions;
