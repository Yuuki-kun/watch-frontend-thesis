import ReactStars from "react-stars";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import ImageMagnifier from "../../components/image-magnify/ImageMagnifier";
import { FaRegHeart } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

import "./productview.css";

const ProductView = () => {
  const { reference } = useParams();
  const [watchDetails, setWatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizeSelects, setSizeSelects] = useState([]);
  const [selectedSize, setSelectedSize] = useState("No size adjusting");
  const [isToggleDesc, setIsToggleDesc] = useState(false);
  console.log(reference);

  useEffect(() => {
    const fetchWatch = async () => {
      try {
        const response = await axios.get(`/products/details/${reference}`);
        setWatchDetails(response.data);
        setSizeSelects(response.data.bracelet.braceletSizes);
        setLoading(false);
        console.log(response?.data);
        console.log(response.status);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWatch();
  }, [reference]);
  const [currentImg, setCurrentImg] = useState(0);
  const hoverImagePV = (i) => {
    setCurrentImg(i);
  };

  const handleSizeChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedSize(selectedValues);
  };
  const toggleDesc = () => {
    if (isToggleDesc) {
      document.querySelector("#pv-prod-desc").style.webkitLineClamp = "3";
    } else {
      document.querySelector("#pv-prod-desc").style.webkitLineClamp = "unset";
    }
    setIsToggleDesc(!isToggleDesc);
  };
  return (
    <>
      {loading ? (
        <div>Loading items...</div>
      ) : (
        <div className="product-view-container container">
          <div className="pv-brand-name">{watchDetails.brand.brandName}</div>
          <div className="row">
            <div className="col-1 list-product-img sticky-col">
              {watchDetails.images.map((img, i) => (
                <div
                  className={`pv-product-img ${
                    currentImg == i ? "active" : ""
                  }`}
                  key={i}
                  onMouseEnter={() => hoverImagePV(i)}
                >
                  <img src={img.image} alt="" className="img-fluid" />
                </div>
              ))}
            </div>
            <div className="col-5 pv-main-img sticky-col">
              <ImageMagnifier imgUrl={watchDetails?.images[currentImg].image} />
              {/* {check if the watch is in wish list?} */}
              <button className="pv-wish-list-btn">
                <FaRegHeart />
              </button>
            </div>
            <div className="col-6 pv-info-container">
              <div className="pv-content-header">
                <h1 className="pv-pd-name">{watchDetails.name}</h1>
              </div>
              <div className="pv-reference">
                <p>{watchDetails.reference}</p>
              </div>
              <div className="pv-status">
                <div className="d-flex gap-1">
                  <div
                    className={`pv-prod-status ${
                      watchDetails.inventoryQuantity > 0
                        ? "in-stock"
                        : "out-of-stock"
                    }`}
                  >
                    {watchDetails.inventoryQuantity > 0
                      ? "IN STOCK"
                      : "OUT OF STOCK"}
                  </div>
                  {/* if discount */}
                  <div className=" pv-prod-status pv-prod-discount">
                    30% OFF
                  </div>
                </div>
                <div className="pv-reviews">
                  <ReactStars
                    count={5}
                    value={4}
                    color1={"#aaa"}
                    color2={"#000"}
                    size={24}
                    edit={false}
                  />
                  <p>({watchDetails.stars})</p>
                  <p style={{ fontWeight: "700" }}>(13 reviews)</p>
                </div>
              </div>

              {/* {if have discount} */}
              <div className="pv-prices">
                <span>
                  <span className="pv-default-prices">
                    {(
                      Number(watchDetails.defaultPrices) *
                      24520 *
                      1000
                    ).toLocaleString()}
                    &#8363;
                  </span>
                  <span className="pv-discount-prices">
                    {(
                      Number(watchDetails.defaultPrices) *
                      24520 *
                      1000 *
                      (1 - 30 / 100)
                    ).toLocaleString()}
                    &#8363;
                  </span>
                </span>
                <div className="pv-price-discount-desc">
                  <p style={{ fontSize: "1rem" }}>
                    Enjoy 30% off of this item, price as shown. Hurry before
                    it's out of stock.
                  </p>
                  <span style={{ fontSize: "1.2rem", color: "green" }}>
                    Free shipping
                  </span>
                </div>
                <div className="pv-add-to-cart-container">
                  {sizeSelects.length > 0 && (
                    <select
                      className="pv-size-select"
                      name=""
                      id=""
                      value={selectedSize}
                      onChange={handleSizeChange}
                    >
                      <option value={"No size adjusting"}>
                        No size adjusting
                      </option>
                      {sizeSelects.map((size, i) => (
                        <option value={size.size} key={i}>
                          {size.size}
                        </option>
                      ))}
                    </select>
                  )}
                  <button className="pv-add-to-cart-btn">Add to bag</button>
                </div>
                <div className="line-container">
                  <span className="line"></span>
                </div>
                <div className="warranty-content">
                  <IoShieldCheckmarkOutline className="warranty-check-icon" />
                  <p>{watchDetails.warranty} year limited warranty</p>
                </div>
                <div id="pv-prod-desc" className="pv-price-discount-desc">
                  <h6 style={{ color: "black" }}>Product Description:</h6>
                  <p style={{ fontSize: "1rem" }}>{watchDetails.description}</p>
                  {/* <span>{watchDetails.description}</span> */}
                </div>
                <button onClick={toggleDesc} className="pv-toggle-desc">
                  {isToggleDesc ? "Show less" : "Read more"}
                </button>
                <div className="pv-prod-details">
                  <h6
                    style={{
                      color: "black",
                      marginBottom: ".5rem",
                    }}
                  >
                    Product Details:
                  </h6>
                  <h6 style={{ color: "black", fontStyle: "italic" }}>
                    Information
                  </h6>
                  <div className="details-row-container">
                    <div className="details-row">
                      <p className="details-key">BRAND</p>
                      <p className="details-value">
                        {watchDetails.brand.brandName}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">COLLECTION NAME</p>
                      <p className="details-value">
                        {watchDetails.family.familyName}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">GENDER</p>
                      <p className="details-value">{watchDetails.gender}</p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">REFERENCE</p>
                      <p className="details-value">{watchDetails.reference}</p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">MOVEMENT ORIGIN</p>
                      <p className="details-value">{watchDetails.origin}</p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">MOVEMENT</p>
                      <p
                        className="details-value"
                        style={{ color: "blue", cursor: "pointer" }}
                      >
                        {watchDetails.movement.name}
                      </p>
                    </div>
                  </div>
                  <h6 style={{ color: "black", fontStyle: "italic" }}>Case</h6>
                  <div className="details-row-container">
                    <div className="details-row">
                      <p className="details-key">CASE SIZE</p>
                      <p className="details-value">
                        {watchDetails.watchCase.diameter} mm
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">THICKNESS</p>
                      <p className="details-value">
                        {watchDetails.watchCase.thickness} mm
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">MATERIAL</p>
                      <p className="details-value">
                        {watchDetails.watchCase.material}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">SHAPE</p>
                      <p className="details-value">
                        {watchDetails.watchCase.shape}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">BACK</p>
                      <p className="details-value">
                        {watchDetails.watchCase.back}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">BEZEL</p>
                      <p className="details-value">
                        {watchDetails.watchCase.bezel}
                      </p>
                    </div>

                    <div className="details-row">
                      <p className="details-key">CRYSTAL</p>
                      <p className="details-value">
                        {watchDetails.watchCase.crystal}
                        <br />
                        {watchDetails.watchCase.crystalDescription}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">LUG WIDTH</p>
                      <p className="details-value">
                        {watchDetails.watchCase.lugWidth} mm
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">WATER RESISTANCE</p>
                      <p className="details-value">
                        {watchDetails.watchCase.waterResistance}
                      </p>
                    </div>
                  </div>

                  <h6 style={{ color: "black", fontStyle: "italic" }}>Band</h6>
                  <div className="details-row-container">
                    <div className="details-row">
                      <p className="details-key">TYPE</p>
                      <p className="details-value">
                        {watchDetails.bracelet.type}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">MATERIAL</p>
                      <p className="details-value">
                        {watchDetails.bracelet.material}
                      </p>
                    </div>

                    <div className="details-row">
                      <p className="details-key">COLOR</p>
                      <p className="details-value">
                        {watchDetails.bracelet.color}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">WIDTH</p>
                      <p className="details-value">
                        {watchDetails.bracelet.width} mm
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">CLASP</p>
                      <p className="details-value">
                        {watchDetails.bracelet.clasp}
                      </p>
                    </div>
                  </div>

                  <h6 style={{ color: "black", fontStyle: "italic" }}>Dial</h6>
                  <div className="details-row-container">
                    <div className="details-row">
                      <p className="details-key">COLOR</p>
                      <p className="details-value">
                        {watchDetails.dials[0].color}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">TYPE</p>
                      <p className="details-value">
                        {watchDetails.dials[0].type}
                      </p>
                    </div>

                    <div className="details-row">
                      <p className="details-key">HANDS</p>
                      <p className="details-value">
                        {watchDetails.dials[0].hands}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">INDEXES</p>
                      <p className="details-value">
                        {watchDetails.dials[0].indexes}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">SUB DIALS</p>
                      <p className="details-value">
                        {watchDetails.dials[0].subDials}
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">LUMINESCENCE</p>
                      <p className="details-value">
                        {watchDetails.dials[0].luminescence}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
