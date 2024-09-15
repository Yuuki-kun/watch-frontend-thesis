import React, { useEffect, useRef } from "react";
import MoreHorizSharpIcon from "@mui/icons-material/MoreHorizSharp";

const ActiveActions = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = () => {
    // setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };
  const containerRef = useRef(null);
  const openButtonRef = useRef(null);
  const handleOutsideClick = (event) => {
    console.log(event.target);
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

  return (
    <>
      <button
        className="product-mgt-btn more-btn"
        // onClick={(e) =>
        //   capturedOrderHandle(e, row.id)
        // }
        onClick={handleClick}
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
          <button className="active-more-option">Edit</button>
          <button className="active-more-option">Delete</button>
        </div>
      </div>
    </>
  );
};

export default ActiveActions;
