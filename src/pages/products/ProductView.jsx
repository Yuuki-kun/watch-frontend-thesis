import ReactStars from "react-stars";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import ImageMagnifier from "../../components/image-magnify/ImageMagnifier";
import { FaRegHeart, FaUser, FaRegComment } from "react-icons/fa";

import { IoShieldCheckmarkOutline } from "react-icons/io5";
import "../home/home.css";
import "./productview.css";
import { FcNext, FcPrevious } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaHeart } from "react-icons/fa";

import BestSellerItems from "../../components/home/BestSellerItems";
import Slider from "react-slick";

const ProductView = () => {
  const { reference } = useParams();
  const [watchDetails, setWatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizeSelects, setSizeSelects] = useState([]);
  const [selectedSize, setSelectedSize] = useState("No size adjusting");
  const [isToggleDesc, setIsToggleDesc] = useState([]);

  const [ratingStarsCount, setRatingStarsCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  // console.log(reference);

  useEffect(() => {
    const fetchWatch = async () => {
      try {
        const response = await axios.get(`/products/details/${reference}`);
        setWatchDetails(response.data);
        setSizeSelects(response.data.band.braceletSizes);
        setLoading(false);
        // console.log(response?.data);
        // console.log(response.status);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWatch();
  }, [reference]);

  useEffect(() => {
    setRatingStarsCount({
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    });
    if (watchDetails) {
      setRatingStarsCount((prevCount) => {
        const updatedRatingStarsCount = { ...prevCount };

        watchDetails.reviews.forEach(function (review) {
          const ratingStars = review.ratingStars;
          if (updatedRatingStarsCount.hasOwnProperty(ratingStars)) {
            updatedRatingStarsCount[ratingStars]++;
          }
        });

        return updatedRatingStarsCount;
      });
    }
  }, [watchDetails]);

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

  const [bestSellerItems, setBestSellerItems] = useState([]);
  const getBestSellerProducts = async () => {
    try {
      const response = await axios.get("/products");
      if (response?.data) {
        const tripledArray = [];
        for (let i = 0; i < response.data.length; i += 2) {
          for (let j = 0; j < 3; j++) {
            if (
              response.data[i] !== undefined &&
              response.data[i + 1] !== undefined
            ) {
              tripledArray.push(response.data[i]);
              tripledArray.push(response.data[i + 1]);
            }
          }
        }
        setBestSellerItems(tripledArray);
      }
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBestSellerProducts();
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="control-btn" onClick={onClick}>
        <button className="next">
          <FcNext />
        </button>
      </div>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="control-btn" onClick={onClick}>
        <button className="prev">
          <FcPrevious />
        </button>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // const [scrollPosition, setScrollPosition] = useState(0);
  //check if scroll down or up
  // const handleScroll = () => {
  //   const currentPosition = window.scrollY;
  //   const isScrollingDown = currentPosition > scrollPosition;

  //   console.log("Current Position:", currentPosition);
  //   console.log("Scroll Position:", scrollPosition);

  //   if (isScrollingDown) {
  //     console.log("Scrolling down");
  //   } else {
  //     console.log("Scrolling up");
  //   }

  //   setScrollPosition(currentPosition);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [scrollPosition]);

  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const handleScroll = () => {
    const element = document.getElementById("prod-info-id");
    if (!element) return;
    //kiem tra co scrroll het chieu cao cua 1 phan tu
    // const scrollTop = window.scrollY || document.documentElement.scrollTop;
    // const windowHeight = window.innerHeight;
    // const elementHeight = element.clientHeight;
    // console.log(elementHeight);
    // const scrollableDistance = elementHeight - windowHeight;

    // setIsScrolledToBottom(scrollTop >= scrollableDistance);
    //--------------//
    ///mot phan tu roi khoi man hinh
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    // console.log(rect.bottom);
    // Kiểm tra xem phần tử đã rời 1/2 phía trên hoặc phía dưới màn hình không
    setIsScrolledToBottom(
      rect.top > windowHeight / 2 || rect.bottom < windowHeight / 2
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(isScrolledToBottom);

  // const getDateFromTimestamp = (datePosted) => {
  //   const postedDate = new Date(datePosted);

  //   // Lấy thông tin về năm, tháng, ngày, giờ, phút và giây
  //   const year = postedDate.getFullYear();
  //   const month = ("0" + (postedDate.getMonth() + 1)).slice(-2); // Thêm 1 vì tháng bắt đầu từ 0
  //   const day = ("0" + postedDate.getDate()).slice(-2);
  //   const hours = ("0" + postedDate.getHours()).slice(-2);
  //   const minutes = ("0" + postedDate.getMinutes()).slice(-2);
  //   const seconds = ("0" + postedDate.getSeconds()).slice(-2);

  //   // Tạo định dạng ngày tháng năm mới
  //   return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // };

  const [heartStates, setHeartStates] = useState(
    new Array(watchDetails?.reviews?.length).fill(false)
  );
  const handleHeart = (index) => {
    const updatedStates = [...heartStates];
    updatedStates[index] = !updatedStates[index];
    setHeartStates(updatedStates);
  };

  return (
    <>
      {loading ? (
        <div>Loading items...</div>
      ) : (
        <div className="product-view-container container">
          <div className="pv-brand-name">{watchDetails.brand.brandName}</div>
          <div id="prod-info-id" className="row">
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
                      <p className="details-value">{watchDetails.band.type}</p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">MATERIAL</p>
                      <p className="details-value">
                        {watchDetails.band.material}
                      </p>
                    </div>

                    <div className="details-row">
                      <p className="details-key">COLOR</p>
                      <p className="details-value">{watchDetails.band.color}</p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">WIDTH</p>
                      <p className="details-value">
                        {watchDetails.band.width} mm
                      </p>
                    </div>
                    <div className="details-row">
                      <p className="details-key">CLASP</p>
                      <p className="details-value">{watchDetails.band.clasp}</p>
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
          <div className="pv-recommended-list-container">
            <div>
              <h2>You may also like</h2>
            </div>
            <Slider {...settings}>
              {bestSellerItems != null &&
                bestSellerItems.map((watch, idx) => {
                  return <BestSellerItems key={idx} watchItem={watch} />;
                })}
            </Slider>
          </div>
          <div className="pv-reviews-container row">
            <div>
              <h2>Reviews</h2>
            </div>
            <div className="reviews-snapshot-container col-6">
              <h4>Rating stars</h4>
              {Object.keys(ratingStarsCount)
                .reverse()
                .map((id) => (
                  <div className="stars-snapshot-content" key={id}>
                    <div className="stars">
                      {id} {id !== "1" ? "stars" : "star"}
                    </div>
                    <div className="star-percent-container">
                      <span
                        style={{
                          width: `${
                            (ratingStarsCount[id] /
                              watchDetails.reviews.length) *
                            100
                          }%`,
                        }}
                        className="star-percent-progress"
                      ></span>
                    </div>
                    <div className="total-stars">{ratingStarsCount[id]}</div>
                  </div>
                ))}
            </div>

            <div className="reviews-overall-rating-stars col-6">
              <h4>Overall Rating</h4>
              <div className="overall-details">
                <h1>{watchDetails.stars}</h1>
                <ReactStars
                  value={watchDetails.stars}
                  size={22}
                  color1={"#aaa"}
                  color2={"#000"}
                  edit={false}
                />
              </div>
              <p>({watchDetails?.reviews?.length} reviews)</p>
            </div>
            <div className="reviews-details-container">
              {watchDetails?.reviews.map((rv, idx) => (
                <div className="review-details row" key={idx}>
                  <div className="reviewer-info-container col-2">
                    {/* <img src="" alt="" /> */}
                    <div className="rv-customer-avt">
                      <FaUser />
                    </div>
                    <span className="rv-customer-name">
                      {rv.customerDto.firstName} {rv.customerDto.lastName}
                    </span>
                  </div>
                  <div className="review-contents col-10">
                    <ReactStars
                      value={rv.ratingStars}
                      size={22}
                      color1={"#aaa"}
                      color2={"#000"}
                      edit={false}
                    />
                    <p style={{ marginBottom: "0" }}>
                      {new Date(rv.datePosted).toLocaleString()}
                    </p>
                    <div className="rv-content">
                      <p style={{ marginBottom: "0", textAlign: "justify" }}>
                        {rv.comment}
                      </p>
                    </div>
                    <button
                      className="rv-heart-btn"
                      onClick={() => handleHeart(idx)}
                    >
                      {heartStates[idx] ? (
                        <FaHeart className="rv-icons heart-active" />
                      ) : (
                        <FaRegHeart className="rv-icons" />
                      )}

                      {rv.loves}
                    </button>
                    {/* <FaHeart className="rv-icons" /> */}
                    <FaRegComment className="rv-icons icon-comment" />{" "}
                    {rv.childReviews?.length}
                    {rv.childReviews?.map((crv, idx) => (
                      <div className="rv-replies" key={idx}>
                        <div className="replies-info-container">
                          {/* <img src="" alt="" /> */}
                          <div className="replies-customer-avt">
                            <FaUser />
                          </div>
                          <span className="replies-customer-name">
                            {crv.customerDto.firstName}{" "}
                            {crv.customerDto.lastName} |
                          </span>
                          <span className="replies-customer-name">
                            {new Date(crv.datePosted).toLocaleString()}
                          </span>
                        </div>
                        <div className="replies-content">
                          <p style={{ marginBottom: "0" }}>{crv.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductView;
