import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import ClockLoader from "../ClockLoader";
import BrandCollection from "./BrandCollection";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const [data, setData] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const res = await axios.get(
          "http://localhost:8080/products/fetch-collections"
        );
        setIsFetching(false);
        res.data && setData(res.data);
      } catch (err) {
        console.error(err);
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  const [currentBrandSelected, setCurrentBrandSelected] = useState(0);
  console.log(currentBrandSelected);
  const navigate = useNavigate();
  return (
    <div>
      {isFetching && <ClockLoader />}
      <div className="collections-container">
        <h5
          className="collections-title fw-bold mt-2 w-100"
          style={{
            textAlign: "center",

            textDecoration: "underline",
          }}
        >
          Khám Phá Các Thương Hiệu & Bộ Sưu Tập
        </h5>
        <div className="collections container mt-4 ">
          <div
            className="row position-relative"

            // onMouseEnter={() => setCurrentBrandSelected(idx)}
          >
            <div className="col-5">
              {" "}
              <h6 className="fw-bold">Thương Hiệu</h6>
            </div>
            <div className="col-7">
              {" "}
              <h6 className="fw-bold">Bộ Sưu Tập</h6>
            </div>

            <div className="col-4">
              {data.length > 0 &&
                data.map((collection, idx) => (
                  <div
                    className="col-4"
                    onMouseEnter={() => setCurrentBrandSelected(idx)}
                    style={{
                      marginBottom: "0px",
                      color:
                        currentBrandSelected === idx ? "#8fd8d8" : "#444444",
                      fontWeight: currentBrandSelected === idx ? "bold" : "500",
                      backgroundColor:
                        currentBrandSelected === idx ? "#747474" : "white",
                      width: "100%",
                      padding: "5px",
                      cursor: "pointer",
                      transition: "all .1s ease-in-out",
                    }}
                    onClick={() =>
                      navigate(
                        `/products-page?type=fetch&cate=brand&name=${collection.brand.brandName}&bid=${collection.brand.id}&size=20&page=0`
                      )
                    }
                  >
                    {collection.brand.brandName}
                  </div>
                ))}
            </div>
            <div className="col-1"></div>
            <BrandCollection
              families={data.length > 0 && data[currentBrandSelected].family}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;
