import React, { useState } from "react";
import "./style.user.css";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const MenuOption = (props) => {
  console.log(props);
  const navigate = useNavigate();
  return (
    <div className="left-menu-option">
      {props.caption !== undefined && (
        <span
          style={{ fontWeight: "500", fontSize: ".95rem", marginTop: "15px" }}
        >
          {props.caption}
        </span>
      )}
      <div className="option-btn-container">
        <button
          className={`option-button ${
            props.selected === props.optionKey ? "selected" : ""
          }`}
          onClick={() => {
            props.setSelected(props.optionKey);
            navigate(props.optionKey);
          }}
        >
          <div className="content">
            {props.icon}
            {props.content}
          </div>
          <GoArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default MenuOption;
