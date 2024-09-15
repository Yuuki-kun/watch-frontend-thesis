import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaGreaterThanSolid } from "react-icons/lia";

const HeaderNavigate = ({ father, navigateFrom, currentPos }) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center mt-2 ms-3 gap-1">
      <div
        className="link-grey header-navigate d-inline"
        onClick={() => navigate(`/${father}/${navigateFrom}`)}
        style={{
          cursor: "pointer",
          fontStyle: "italic",
          color: "#666",
        }}
      >
        {navigateFrom}
      </div>
      <LiaGreaterThanSolid className="link-grey" />
      <div
        className="link-grey header-navigate d-inline"
        // onClick={() => navigate(`/${father}/${navigateFrom}`)}
        style={{
          cursor: "pointer",
          fontStyle: "italic",
          color: "#666",
        }}
      >
        {currentPos}
      </div>
    </div>
  );
};

export default HeaderNavigate;
