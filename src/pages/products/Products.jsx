import React, { useEffect, useMemo, useState } from "react";
import "./product-page.css";
import { FaXmark } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

import ColorFilter from "../../components/admin/product/ColorFilter";
import BrandFilter from "../../components/admin/product/BrandFilter";
import ProductList from "./ProductList";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ClockLoader from "../../components/ClockLoader";
const Products = () => {
  const [collapseFilter, setCollapseFilter] = useState(false);
  const [priceFilter, setPriceFilter] = useState(true);
  const [colorFilter, setColorFilter] = useState(true);
  const [brandFilter, setBrandFilter] = useState(true);
  const [movementFilter, setMovementFilter] = useState(true);
  const [caseShapeFilter, setCaseShapeFilter] = useState(true);
  const [bandTypeFilter, setBandTypeFilter] = useState(true);
  const collapsePriceFilter = () => {
    const listPrices = document.querySelector(".list-prices");
    // if (priceFilter) {
    //   listPrices.style.height = "0";
    //   listPrices.style.padding = "0";
    // } else {
    //   listPrices.style.height = "150px";
    //   listPrices.style.padding = "5px";
    // }
    setPriceFilter(!priceFilter);
  };
  const collapseColorFilter = () => {
    setColorFilter(!colorFilter);
  };

  const collapseBrandFilter = () => {
    setBrandFilter(!brandFilter);
  };

  const collapseMovementFilter = () => {
    setMovementFilter(!movementFilter);
  };

  const collapseCaseShapeFilter = () => {
    setCaseShapeFilter(!caseShapeFilter);
  };

  const collapseBandTypeFilter = () => {
    setBandTypeFilter(!bandTypeFilter);
  };

  const [filterPriceValue, setFilterPriceValue] = useState([0, 0]);
  const [colorFilterValue, setColorFilterValue] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const size = searchParams.get("size");
  const page = searchParams.get("page");
  const type = searchParams.get("type");
  const cate = searchParams.get("cate");
  const color = searchParams.get("color");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const brand = searchParams.get("brand");
  const mvt = searchParams.get("mvt");
  const cs = searchParams.get("cs");
  const bt = searchParams.get("bt");
  const [movementFilterValue, setMovementFilterValue] = useState([]);
  const [caseShapeFilterValue, setCaseShapeFilterValue] = useState([]);
  const [bandTypeFilterValue, setBandTypeFilterValue] = useState([]);
  const [typeOfFilter, setTypeOfFilter] = useState("Full");
  const [currentSelectedPrice, setCurrentSelectedPrice] = useState(-1);
  const handFilterPrice = (start, end) => {
    // setFilterPriceValue([start, end]);
    if ((start < end && start >= 0 && end >= 0) || end === "inf") {
      if (cate?.includes("price")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",price"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
    } else alert("Invalid price range");
  };

  const handleFilterMovement = (movement) => {
    if (movementFilterValue?.includes(movement)) {
      const index = movementFilterValue.indexOf(movement);
      movementFilterValue.splice(index, 1);
      if (cate?.includes("mvt")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else {
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",mvt"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      }
    } else {
      movementFilterValue.push(movement);
      if (cate?.includes("mvt")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else {
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",mvt"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      }
    }
    console.log(movementFilterValue);
  };

  const handleFilterCaseShape = (caseShape) => {
    if (caseShapeFilterValue?.includes(caseShape)) {
      const index = caseShapeFilterValue.indexOf(caseShape);
      caseShapeFilterValue.splice(index, 1);
      if (cate?.includes("cs")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else {
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",cs"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      }
    } else {
      caseShapeFilterValue.push(caseShape);
      if (cate?.includes("cs")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else {
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",cs"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      }
    }
    console.log(caseShapeFilterValue);
  };
  const [isClear, setIsClear] = useState(true);
  const handleFilterBandType = (bandType) => {
    if (bandTypeFilterValue?.includes(bandType)) {
      const index = bandTypeFilterValue.indexOf(bandType);
      bandTypeFilterValue.splice(index, 1);
      if (cate?.includes("bt")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else {
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",bt"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      }
    } else {
      bandTypeFilterValue.push(bandType);
      if (cate?.includes("bt")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      } else {
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",bt"
          }&start=${start}&end=${end}&color=${colorFilterValue.join(
            ","
          )}&brand=${brand}&movement=${movementFilterValue.join(
            ","
          )}&cs=${caseShapeFilterValue.join(",")}&bt=${bandTypeFilterValue.join(
            ","
          )}&typeF=${typeOfFilter}`
        );
      }
    }
    console.log(bandTypeFilterValue);
  };

  console.log(colorFilterValue);
  const [isFetching, setIsFetching] = useState(false);
  return (
    <section>
      {isFetching && <ClockLoader />}
      <div className="container-fluid">
        <div className="product-page-container row">
          <div
            className={`col-2 left-filter ${
              collapseFilter ? "closeFilter" : ""
            }`}
          >
            <div className="left-column-filter">
              <div className="filter">
                <div className="d-flex align-items-center justify-content-between mb-2 filter-container-header">
                  <h5>Filters</h5>
                  <button
                    className="bg-lighter border-0 fs-4 rounded-5 text-muted"
                    style={{ width: "40px", height: "40px" }}
                    onClick={() => setCollapseFilter(!collapseFilter)}
                  >
                    <FaXmark />
                  </button>
                </div>
                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Loại</h5>
                  </div>
                  <button
                    style={{
                      padding: "4px 8px",
                      border: "1px solid #cecece",
                      borderRadius: "10px",
                      backgroundColor:
                        typeOfFilter === "Full" ? "black" : "white", // Xác định màu sắc dựa trên giá trị của typeOfFilter
                      color:
                        typeOfFilter === "Full" ? "#fff" : "rgba(0,0,0,.8)",
                      marginBottom: "10px",
                    }}
                    onClick={() => {
                      searchParams.set("typeF", "Full");
                      const newUrl = new URL(window.location.href);
                      const searchParamsCopy = new URLSearchParams(
                        searchParams.toString()
                      );
                      searchParamsCopy.forEach((value, key) => {
                        const replacedValue = value.replace(/,/g, "_comma_");
                        searchParamsCopy.set(key, replacedValue);
                      });
                      newUrl.search = searchParamsCopy.toString();
                      newUrl.search = newUrl.search.replace(/_comma_/g, ",");
                      window.history.pushState({}, "", newUrl);
                      setTypeOfFilter("Full");
                    }}
                  >
                    Khớp tất cả thuộc tính
                  </button>
                  <button
                    style={{
                      padding: "4px 8px",
                      border: "1px solid #cecece",
                      borderRadius: "10px",
                      backgroundColor:
                        typeOfFilter === "Any" ? "black" : "white", // Xác định màu sắc dựa trên giá trị của typeOfFilter
                      color: "rgba(0,0,0,.7)",
                      fontWeight: "600",
                      color: typeOfFilter === "Any" ? "#fff" : "rgba(0,0,0,.8)",
                    }}
                    onClick={() => {
                      searchParams.set("typeF", "Any");
                      const newUrl = new URL(window.location.href);
                      const searchParamsCopy = new URLSearchParams(
                        searchParams.toString()
                      );
                      searchParamsCopy.forEach((value, key) => {
                        const replacedValue = value.replace(/,/g, "_comma_");
                        searchParamsCopy.set(key, replacedValue);
                      });
                      newUrl.search = searchParamsCopy.toString();
                      newUrl.search = newUrl.search.replace(/_comma_/g, ",");
                      window.history.pushState({}, "", newUrl);
                      setTypeOfFilter("Any");
                    }}
                  >
                    Khớp một trong các thuộc tính
                  </button>

                  <button
                    style={{
                      padding: "4px 8px",
                      border: "1px solid #cecece",
                      borderRadius: "10px",
                      backgroundColor: "white", // Xác định màu sắc dựa trên giá trị của typeOfFilter
                      color: "rgba(0,0,0,.8)",
                      marginTop: "10px",
                    }}
                    onClick={() => {
                      navigate(
                        "/products-page?type=fetch&cate=none&size=20&page=0"
                      );
                      setTypeOfFilter("Any");
                      setCurrentSelectedPrice(-1);
                      setFilterPriceValue([]);
                      setColorFilterValue([]);
                      setMovementFilterValue([]);
                      setCaseShapeFilterValue([]);
                      setBandTypeFilterValue([]);
                      setIsClear(true);
                      // setBrandFilter(true);
                    }}
                  >
                    Làm mới
                  </button>

                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>
                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Price</h5>
                    <button
                      onClick={collapsePriceFilter}
                      className="border-0
                    bg-white text-muted rounded fw-bold text-decoration-underline"
                    >
                      {priceFilter ? `Close` : "Open"}
                    </button>
                  </div>
                  <div
                    className={`list-prices ${
                      priceFilter && "openPriceFilter"
                    }`}
                  >
                    <div
                      className={`ft-price-content ${
                        currentSelectedPrice === 0 && "selectedPrice"
                      }`}
                      onClick={() => {
                        handFilterPrice(0, 2.5);
                        setCurrentSelectedPrice(0);
                      }}
                    >
                      0-2,5tr
                    </div>
                    <div
                      className={`ft-price-content ${
                        currentSelectedPrice === 1 && "selectedPrice"
                      }`}
                      onClick={() => {
                        handFilterPrice(2.5, 7);
                        setCurrentSelectedPrice(1);
                      }}
                    >
                      2,5tr-7tr
                    </div>
                    <div
                      className={`ft-price-content ${
                        currentSelectedPrice === 2 && "selectedPrice"
                      }`}
                      onClick={() => {
                        handFilterPrice(7, 12);
                        setCurrentSelectedPrice(2);
                      }}
                    >
                      7tr-12tr
                    </div>
                    <div
                      className={`ft-price-content ${
                        currentSelectedPrice === 3 && "selectedPrice"
                      }`}
                      onClick={() => {
                        handFilterPrice(12, 24);
                        setCurrentSelectedPrice(3);
                      }}
                    >
                      12tr-24tr
                    </div>
                    <div
                      className={`ft-price-content ${
                        currentSelectedPrice === 4 && "selectedPrice"
                      }`}
                      onClick={() => {
                        handFilterPrice(24, 49);
                        setCurrentSelectedPrice(4);
                      }}
                    >
                      24tr-49tr
                    </div>
                    <div
                      className={`ft-price-content ${
                        currentSelectedPrice === 5 && "selectedPrice"
                      }`}
                      onClick={() => {
                        handFilterPrice(50, "inf");
                        setCurrentSelectedPrice(5);
                      }}
                    >
                      50tr+
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <input
                        className="ft-price-input"
                        style={{
                          padding: "5px 10px",
                        }}
                        type="number"
                        min={0}
                        onChange={(e) => {
                          setFilterPriceValue([
                            e.target.value,
                            filterPriceValue[1],
                          ]);
                        }}
                      />
                      <span>&minus;</span>
                      <input
                        className="ft-price-input"
                        style={{
                          padding: "5px 10px",
                        }}
                        type="number"
                        min={0}
                        onChange={(e) => {
                          setFilterPriceValue([
                            filterPriceValue[0],
                            e.target.value,
                          ]);
                        }}
                      />
                      <button
                        className="border-0 bg-light rounded fw-bold text-muted"
                        onClick={() =>
                          handFilterPrice(
                            filterPriceValue[0],
                            filterPriceValue[1]
                          )
                        }
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Color</h5>
                    <button
                      onClick={collapseColorFilter}
                      className="border-0
                    bg-white text-muted rounded fw-bold text-decoration-underline"
                    >
                      {colorFilter ? `Close` : "Open"}
                    </button>
                  </div>
                  <ColorFilter
                    colorFilter={colorFilter}
                    setColorFilterValue={setColorFilterValue}
                    colorFilterValue={colorFilterValue}
                    typeF={typeOfFilter}
                  />
                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Brand</h5>
                    <button
                      onClick={collapseBrandFilter}
                      className="border-0
                    bg-white text-muted rounded fw-bold text-decoration-underline"
                    >
                      {brandFilter ? `Close` : "Open"}
                    </button>
                  </div>
                  <BrandFilter
                    brandFilter={brandFilter}
                    typeF={typeOfFilter}
                    isClear={isClear}
                  />
                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Movement</h5>
                    <button
                      onClick={collapseMovementFilter}
                      className="border-0
                    bg-white text-muted rounded fw-bold text-decoration-underline"
                    >
                      {movementFilter ? `Close` : "Open"}
                    </button>
                  </div>
                  <div
                    className={`list-movements ${
                      movementFilter && "openMovementFilter"
                    }`}
                  >
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="mvt-automatic"
                        onChange={() => handleFilterMovement("Automatic")}
                        checked={
                          isClear && movementFilterValue?.includes("Automatic")
                        }
                      />
                      <label htmlFor="mvt-automatic">Automatic</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="mvt-eco"
                        onChange={() => handleFilterMovement("Eco-Drive")}
                        checked={
                          isClear && movementFilterValue?.includes("Eco-Drive")
                        }
                      />
                      <label htmlFor="mvt-eco">Eco-Drive</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="mvt-handwind"
                        onChange={() => handleFilterMovement("Hand Wind")}
                        checked={
                          isClear && movementFilterValue?.includes("Hand Wind")
                        }
                      />
                      <label htmlFor="mvt-handwind">Hand Wind</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="mvt-quartz"
                        onChange={() => handleFilterMovement("Quartz")}
                        checked={
                          isClear && movementFilterValue?.includes("Quartz")
                        }
                      />
                      <label htmlFor="mvt-quartz">Quartz</label>
                    </div>
                  </div>
                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Case Shape</h5>
                    <button
                      onClick={collapseCaseShapeFilter}
                      className="border-0
                    bg-white text-muted rounded fw-bold text-decoration-underline"
                    >
                      {caseShapeFilter ? `Close` : "Open"}
                    </button>
                  </div>
                  <div
                    className={`list-case-shapes ${
                      caseShapeFilter && "openCaseShapeFilter"
                    }`}
                  >
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-cushion"
                        onChange={() => handleFilterCaseShape("Cushion")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Cushion")
                        }
                      />
                      <label htmlFor="cs-cushion">Cushion</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-dodecagon"
                        onChange={() => handleFilterCaseShape("Dodecagon")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Dodecagon")
                        }
                      />
                      <label htmlFor="cs-dodecagon">Dodecagon</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-octagon"
                        onChange={() => handleFilterCaseShape("Octagon")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Octagon")
                        }
                      />
                      <label htmlFor="cs-octagon">Octagon</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-rectangle"
                        onChange={() => handleFilterCaseShape("Rectangle")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Rectangle")
                        }
                      />
                      <label htmlFor="cs-rectangle">Rectangle</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-round"
                        onChange={() => handleFilterCaseShape("Round")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Round")
                        }
                      />
                      <label htmlFor="cs-round">Round</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-square"
                        onChange={() => handleFilterCaseShape("Square")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Square")
                        }
                      />
                      <label htmlFor="cs-square">Square</label>
                    </div>
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="cs-triangle"
                        onChange={() => handleFilterCaseShape("Triangle")}
                        checked={
                          isClear && caseShapeFilterValue?.includes("Triangle")
                        }
                      />
                      <label htmlFor="cs-triangle">Triangle</label>
                    </div>
                  </div>
                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>

                <div className="filter-group">
                  <div className="ft-header">
                    <h5>Band Type</h5>
                    <button
                      onClick={collapseBandTypeFilter}
                      className="border-0
                        bg-white text-muted rounded fw-bold text-decoration-underline"
                    >
                      {bandTypeFilter ? `Close` : "Open"}
                    </button>
                  </div>
                  <div
                    className={`list-band-types ${
                      bandTypeFilter && "openBandTypeFilter"
                    }`}
                  >
                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="bt-bracelet"
                        onChange={() => handleFilterBandType("Bracelet")}
                      />
                      <label htmlFor="bt-bracelet">Bracelet</label>
                    </div>

                    <div className="movement-item">
                      <input
                        type="checkbox"
                        id="bt-strap"
                        onChange={() => handleFilterBandType("Strap")}
                      />
                      <label htmlFor="bt-strap">Strap</label>
                    </div>
                  </div>
                  <div className="line-container">
                    <span className="line"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`col-right ${collapseFilter ? "right-master" : ""}`}>
            <div className={`right-column ${collapseFilter ? "" : "d-none"}`}>
              <div
                className={`${
                  collapseFilter ? "closedFilterBtn" : "hide-collapse-btn"
                }`}
              >
                <button
                  className="toggle-filters-btn"
                  onClick={() => setCollapseFilter(!collapseFilter)}
                >
                  Filter
                  <span className="span-arrow">
                    <FaArrowRightLong />
                  </span>
                </button>
              </div>
            </div>
            {/* //get products and display them here */}
            <ProductList
              setIsFetching={setIsFetching}
              typeOfFilter={typeOfFilter}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
