import React, { useEffect, useMemo, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "../../../api/axios";
import "./brand.css";
import { useLocation, useNavigate } from "react-router-dom";
const BrandFilter = ({ brandFilter, typeF }) => {
  const [brandName, setBrandName] = useState("");
  const [brands, setBrands] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const color = searchParams.get("color");
  const type = searchParams.get("type");

  const cate = searchParams.get("cate");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const band = searchParams.get("band");
  const mvt = searchParams.get("movement");
  const cs = searchParams.get("cs");
  const bt = searchParams.get("bt");
  useEffect(() => {
    const fetchSimilarBrands = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/products/search-similar/brands/${brandName}`
        );
        console.log(response.data);
        setBrands(response.data);
        setTimeout(() => {}, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    if (brandName.length > 0) fetchSimilarBrands();
    else {
      setBrands([]);
      setIsFiltering(false);
    }
  }, [brandName]);
  return (
    <div className={`list-brands ${brandFilter && "openBrandFilter"}`}>
      <div className="input-brand-name w-100">
        <input
          type="text"
          placeholder="Find a brand"
          value={brandName}
          onMouseDown={() => setIsFiltering(true)}
          onChange={(e) => {
            setBrandName(e.target.value);
            // setIsFiltering(true);
          }}
        />
        <span>
          <IoIosSearch />
        </span>
        <div className="list-brand w-100 pt-1 rounded-3">
          {isFiltering &&
            brands.length > 0 &&
            brandFilter &&
            brands.map((brand, idx) => (
              <div
                className="brand p-2 rounded-3"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  width: "100%",
                  color: "white",
                }}
                key={idx}
                onClick={() => {
                  setBrandName(brand.brandName);
                  setIsFiltering(false);
                  if (cate.includes("brand")) {
                    navigate(
                      `/products-page?type=filter&cate=${cate}&color=${color}&start=${start}&end=${end}&brand=${brand.brandName}&movement=${mvt}&cs=${cs}&bt=${bt}&typeF=${typeF}`
                    );
                  } else {
                    navigate(
                      `/products-page?type=filter&cate=${
                        cate + ",brand"
                      }&color=${color}&start=${start}&end=${end}&brand=${
                        brand.brandName
                      }&movement=${mvt}&cs=${cs}&bt=${bt}&typeF=${typeF}`
                    );
                  }
                }}
              >
                {brand.brandName}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BrandFilter;
