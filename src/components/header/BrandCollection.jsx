import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BrandCollection = ({ families }) => {
  const navigate = useNavigate();
  return (
    <>
      {
        <div
          className="col-7"
          style={{
            // border: "1px solid #d0d0d0",
            backgroundColor: "#f6f6f6",
            // overflowY: "hidden",
            marginBottom: "2rem",
            // marginTop: "1rem",
            padding: "1rem",
            borderRadius: "10px",
            // boxShadow: "0px 0px 5px 2px rgba(0,0,0,0.1)",
          }}
        >
          {families &&
            families.map((family, idx) => (
              <div
                className="family-content"
                style={{ cursor: "pointer", transition: "all .1s ease-in-out" }}
                onClick={() =>
                  navigate(
                    `/products-page?type=fetch&cate=family&fname=${family.familyName}&fid=${family.id}&size=20&page=0`
                  )
                }
              >
                {family.familyName}
              </div>
            ))}
        </div>
      }
    </>
  );
};

export default BrandCollection;
