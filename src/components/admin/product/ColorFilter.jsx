import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ColorFilter = ({
  colorFilter,
  setColorFilterValue,
  colorFilterValue,
  typeF,
}) => {
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
  const brand = searchParams.get("brand");

  useEffect(() => {
    if (type === "color-filter" && color) {
      setColorFilterValue(color.split(","));
      console.log("Color filter value", colorFilterValue);
    }
  }, []);

  const onSelectColor = (e, color) => {
    if (colorFilterValue.includes(color)) {
      const newColor = colorFilterValue.filter((c) => c !== color);
      // e.target.classList.remove("selected");
      setColorFilterValue(newColor);
      if (cate.includes("color")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${newColor.join(
            ","
          )}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&typeF=${typeF}&brand=${brand}`
        );
      } else
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",color"
          }&start=${start}&end=${end}&color=${newColor.join(
            ","
          )}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&typeF=${typeF}&brand=${brand}`
        );
    } else {
      const newColor = [...colorFilterValue, color];
      setColorFilterValue(newColor);
      // e.target.classList.toggle("selected");
      if (cate.includes("color")) {
        navigate(
          `/products-page?type=filter&cate=${cate}&start=${start}&end=${end}&color=${newColor.join(
            ","
          )}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&brand=${brand}&typeF=${typeF}`
        );
      } else
        navigate(
          `/products-page?type=filter&cate=${
            cate + ",color"
          }&start=${start}&end=${end}&color=${newColor.join(
            ","
          )}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&brand=${brand}&typeF=${typeF}`
        );
    }

    // console.log(e.target);
  };

  useEffect(() => {
    if (colorFilterValue.length === 0 && type == "filter") {
      //remove color from cate

      console.log("color cate = " + colorFilterValue.length);
      // console.log("cate=" + cate !== null && cate.replace(",color", ""));
      navigate(
        `/products-page?type=filter&cate=${
          cate !== null && cate.replace(",color", "")
        }&start=${start}&end=${end}&band=${band}&movement=${mvt}&cs=${cs}&bt=${bt}&brand=${brand}&typeF=${typeF}`
      );
    }
  }, [colorFilterValue]);

  // const handleSelectColor = (e) => {
  //   const color = e.target.innerText;
  //   // colorFilterValue(color);
  //   console.log(color);
  // };
  return (
    <div className={`list-colors ${colorFilter && "openColorFilter"}`}>
      <ul className="item-sub-color">
        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Beige")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Beige") && "selected"
              }`}
              style={{
                backgroundColor: "#f5f5dc",
              }}
            ></span>
            <span>Beige</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Black")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Black") && "selected"
              }`}
              style={{
                backgroundColor: "#000",
              }}
            ></span>
            <span>Black</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Blue")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Blue") && "selected"
              }`}
              style={{
                backgroundColor: "blue",
              }}
            ></span>
            <span>Blue</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Brown")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Brown") && "selected"
              }`}
              style={{
                backgroundColor: "brown",
              }}
            ></span>
            <span>Brown</span>
          </button>
        </li>
        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Gold")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Gold") && "selected"
              }`}
              style={{
                backgroundColor: "#E9AE3D",
              }}
            ></span>
            <span>Gold</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Grey")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Grey") && "selected"
              }`}
              style={{
                backgroundColor: "#8f979d",
              }}
            ></span>
            <span>Grey</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Green")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Green") && "selected"
              }`}
              style={{
                backgroundColor: "#008000",
              }}
            ></span>
            <span>Green</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Orange")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Orange") && "selected"
              }`}
              style={{
                backgroundColor: "#ffa500",
              }}
            ></span>
            <span>Orange</span>
          </button>
        </li>
        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Pink")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Pink") && "selected"
              }`}
              style={{
                backgroundColor: "#fe249a",
              }}
            ></span>
            <span>Pink</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Purple")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Purple") && "selected"
              }`}
              style={{
                backgroundColor: "#800080",
              }}
            ></span>
            <span>Purple</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Red")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Red") && "selected"
              }`}
              style={{
                backgroundColor: "#f00",
              }}
            ></span>
            <span>Red</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Rose-Gold")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Rose-Gold") && "selected"
              }`}
              style={{
                backgroundColor: "#DBC1B4",
              }}
            ></span>
            <span>Rose-Gold</span>
          </button>
        </li>
        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Silver")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Silver") && "selected"
              }`}
              style={{
                backgroundColor: "#C0C0C0",
              }}
            ></span>
            <span>Silver</span>
          </button>
        </li>
        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "White")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("White") && "selected"
              }`}
              style={{
                backgroundColor: "#fff",
              }}
            ></span>
            <span>White</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Yellow")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Yellow") && "selected"
              }`}
              style={{
                backgroundColor: "#ff0",
              }}
            ></span>
            <span>Yellow</span>
          </button>
        </li>

        <li className="filter-item filter-item-color">
          <button
            className="color-filter-btn"
            onClick={(e) => onSelectColor(e, "Two Tone")}
          >
            <span
              className={`swatch-circle ${
                colorFilterValue.includes("Two Tone") && "selected"
              }`}
              style={{
                backgroundColor: "#aaa",
              }}
            ></span>
            <span>Two Tone</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ColorFilter;
