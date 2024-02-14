import React, { useState } from "react";
import BestSellers from "./BestSellers";
import NewIn from "./NewIn";
import Sale from "./Sale";

const TopProductDisplay = () => {
  const selections = ["BestSellers", "NewIn", "Sale"];
  const [selectedActiveContent, setSelectedActiveContent] =
    useState("BestSellers");
  const handleButtonClick = (content) => {
    setSelectedActiveContent(content);
  };
  return (
    <div className="top-product-selection">
      <div className="select-active-content">
        <button
          className={
            selectedActiveContent === selections[0] ? "active-content" : ""
          }
          onClick={() => handleButtonClick(selections[0])}
        >
          Best Sellers
        </button>
        <button
          className={
            selectedActiveContent === selections[1] ? "active-content" : ""
          }
          onClick={() => handleButtonClick(selections[1])}
        >
          NewIn
        </button>
        <button
          className={
            selectedActiveContent === selections[2] && "active-content"
          }
          onClick={() => handleButtonClick(selections[2])}
        >
          Sale
        </button>
      </div>
      {selectedActiveContent === selections[0] && <BestSellers />}
      {selectedActiveContent === selections[1] && <NewIn />}
      {selectedActiveContent === selections[2] && <Sale />}
    </div>
  );
};

export default TopProductDisplay;
