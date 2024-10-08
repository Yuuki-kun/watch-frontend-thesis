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
import {
  addToBagService,
  addToBagUnAuthService,
  getTempoCart,
} from "../../api/services/cartService";
import useAuth from "../../hooks/useAuth";
import {
  Bounce,
  Flip,
  Slide,
  ToastContainer,
  Zoom,
  toast,
} from "react-toastify";
import useCart from "../../hooks/useCart";
import {
  addToFavoriteService,
  getFavoriteListService,
  removeFromFavoriteService,
} from "../../api/services/favoriteListService";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import ClockLoader from "../../components/ClockLoader";
import RenderChildReview from "./RenderChildReview";
import { fetchReviewsByParentId } from "../../api/services/reviewService";
import ReviewComponent from "./ReviewComponent";

const ProductView = () => {
  const { auth } = useAuth();
  const axiosPrivate = usePrivateRequest();
  const { reference } = useParams();
  const [watchDetails, setWatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sizeSelects, setSizeSelects] = useState([]);
  const [selectedSize, setSelectedSize] = useState("No size adjusting");
  const [isToggleDesc, setIsToggleDesc] = useState(false);
  const [isAddingToBag, setIsAddingToBag] = useState(false);
  const [isInWishList, setIsInWishList] = useState(false);

  const [onShowChildComments, setOnShowChildComments] = useState(false);

  const [ratingStarsCount, setRatingStarsCount] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const { favoriteList, setFavoriteList } = useCart();
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

        watchDetails.reviews?.forEach(function (review) {
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

  const [ids, setIds] = useState([]);
  const [recommendedWatches, setRecommendedWatches] = useState([]);

  useEffect(() => {
    const getBestSellerProducts = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/predictions/${auth.userId}`
        );
        console.log("res=" + response);
        const rs = response.data.map((item) => item[0]);
        setIds(rs);
        console.log("rs=" + rs);
      } catch (err) {
        console.error(err);
      }
    };
    getBestSellerProducts();
  }, []);

  useEffect(() => {
    const getWatchesWithIdList = async (idList) => {
      try {
        console.log("start fetch");
        const response = await axios.post(
          `http://127.0.0.1:8080/products/product-by-list-id`,
          idList
        );
        setRecommendedWatches(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (ids) {
      console.log(ids);
      getWatchesWithIdList(ids);
    }
  }, [ids]);

  console.log(recommendedWatches);

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

  const [heartStates, setHeartStates] = useState(
    new Array(watchDetails?.reviews?.length).fill(false)
  );
  const handleHeart = (index) => {
    const updatedStates = [...heartStates];
    updatedStates[index] = !updatedStates[index];
    setHeartStates(updatedStates);
  };

  console.log(auth);

  const notify = () =>
    toast.success(
      <div>
        <img
          src={`http://localhost:8080/image/fileSystem/${watchDetails.images[0].name}`}
          alt=""
          className="notify-watch-img"
        />
        <span>Đã thêm vào giỏ hàng!</span>
      </div>
    );

  console.log(watchDetails);

  const addToBag = async () => {
    setIsAddingToBag(true);
    // Check if auth and watchDetails are defined
    if (auth?.cartId && watchDetails?.id) {
      try {
        const response = await addToBagService(
          auth.cartId,
          watchDetails.id,
          watchDetails.defaultPrices,
          1
        );
        setTimeout(() => {
          response && setIsAddingToBag(false);
          notify();
        }, 200);
      } catch (error) {}
    } else {
      console.log("have not cart");
      console.log(localStorage.getItem("tempo-cart"));
      if (
        localStorage.getItem("tempo-cart") === null ||
        localStorage.getItem("tempo-cart") === "undefined"
      ) {
        console.log("get cart?");

        try {
          const cart_id = await getTempoCart();
          if (cart_id) {
            localStorage.setItem("tempo-cart", cart_id);
          }
          try {
            const response = await addToBagService(
              cart_id,
              watchDetails.id,
              watchDetails.defaultPrices,
              1
            );
            setTimeout(() => {
              response && setIsAddingToBag(false);
              notify();
            }, 200);
          } catch (error) {}
        } catch (err) {
          console.error(err);
        }
      } else {
        const cartId = localStorage.getItem("tempo-cart");
        try {
          const response = await addToBagService(
            cartId,
            watchDetails.id,
            watchDetails.defaultPrices,
            1
          );
          setTimeout(() => {
            response && setIsAddingToBag(false);
            notify();
          }, 200);
        } catch (error) {}
      }
    }
  };

  useEffect(() => {
    const getWishList = async () => {
      try {
        const wishList = await getFavoriteListService(
          auth.userId,
          axiosPrivate
        );
        if (wishList) {
          setFavoriteList(wishList);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (auth.userId) {
      getWishList();
    }
  }, [auth.userId, axiosPrivate, setFavoriteList]);

  useEffect(() => {
    const productIsInWishList = (wid) => {
      if (Array.isArray(favoriteList) && favoriteList.length > 0) {
        return favoriteList.some((item) => item.watchId === wid);
      }
      return false;
    };

    setIsInWishList(productIsInWishList(watchDetails?.id));
  }, [favoriteList, watchDetails]);

  const addToFavoriteList = async (wid) => {
    if (!isInWishList) {
      try {
        const response = await addToFavoriteService(
          auth.userId,
          wid,
          axiosPrivate
        );
        console.log(response);
        setFavoriteList(response);
        setIsInWishList(true);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const response = await removeFromFavoriteService(
          auth.userId,
          wid,
          axiosPrivate
        );
        console.log(response);
        setFavoriteList(response);
        setIsInWishList(false);
      } catch (err) {
        console.error(err);
      }
    }
  };
  const [currentLoadingCommentId, setCurrentLoadingCommentId] = useState(null);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [activeComment, setActiveComment] = useState([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const showComment = async (id) => {
    console.log(id);
    if (activeComment.includes(id)) {
      const newActiveComment = activeComment.filter((item) => item !== id);
      setActiveComment(newActiveComment);
      return;
    }
    try {
      setIsLoadingComment(true);
      setCurrentLoadingCommentId(id);

      const res = await fetchReviewsByParentId(id);
      console.log(res);
      setIsLoadingComment(false);
      setCommentList(res);
      activeComment.push(id);
    } catch (err) {
      console.error(err);
    }
    console.log(id);
  };

  return (
    <>
      {loading ? (
        <ClockLoader />
      ) : (
        <section>
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
                    <img
                      src={`http://localhost:8080/image/fileSystem/${img.name}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                ))}
              </div>
              <div className="col-5 pv-main-img sticky-col">
                <ImageMagnifier
                  imgUrl={`http://localhost:8080/image/fileSystem/${watchDetails?.images[currentImg].name}`}
                />
                {/* {check if the watch is in wish list?} */}
                <button
                  className="pv-wish-list-btn"
                  onClick={() => addToFavoriteList(watchDetails.id)}
                >
                  {isInWishList ? (
                    <FaHeart style={{ color: "red", important: "true" }} />
                  ) : (
                    <FaRegHeart />
                  )}
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
                        ? "CÒN HÀNG"
                        : "HẾT HÀNG"}
                    </div>
                    {/* if discount */}
                    {watchDetails.discount > 0 && (
                      <div className=" pv-prod-status pv-prod-discount">
                        {watchDetails.discount}% OFF
                      </div>
                    )}
                  </div>
                  <div className="pv-reviews">
                    <ReactStars
                      count={5}
                      value={watchDetails.stars}
                      color1={"#aaa"}
                      color2={"#000"}
                      size={24}
                      edit={false}
                    />
                    <p>({watchDetails.stars})</p>
                    <p style={{ fontWeight: "700" }}>
                      ({watchDetails.totalReviews})
                    </p>
                  </div>
                </div>

                {/* {if have discount} */}
                <div className="pv-prices">
                  <span>
                    {watchDetails.discount > 0 && (
                      <span className="pv-default-prices">
                        {(watchDetails.defaultPrices * 1000).toLocaleString()}
                        &#8363;
                      </span>
                    )}
                    <span className="pv-discount-prices">
                      {Number(
                        watchDetails.defaultPrices *
                          1000 *
                          (1 - watchDetails.discount / 100)
                      ).toLocaleString()}
                      &#8363;
                    </span>
                    {watchDetails.discount > 0 && (
                      <span
                        style={{
                          color: "red",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                        }}
                      >
                        Cho đến{" "}
                        {new Date(watchDetails.endDiscountDate).toLocaleString(
                          "vi-VN"
                        )}
                      </span>
                    )}
                  </span>
                  <div className="pv-price-discount-desc">
                    {watchDetails.discount > 0 && (
                      <p style={{ fontSize: "1rem" }}>
                        Giảm giá {watchDetails.discount}% cho mặt hàng này như
                        được hiển thị. Hãy nhanh tay trước khi hết hàng.
                      </p>
                    )}
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
                    <div>
                      <ToastContainer
                        position="bottom-center"
                        autoClose={1000}
                        hideProgressBar={true}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        draggable
                        theme="dark"
                        transition={Bounce}
                        success
                      />
                    </div>
                    <button
                      className="pv-add-to-cart-btn"
                      onClick={addToBag}
                      disabled={watchDetails.inventoryQuantity <= 0}
                    >
                      <div
                        className={`${isAddingToBag ? "spinner" : ""}`}
                      ></div>
                      <span style={{ color: isAddingToBag ? "#bbb" : "#fff" }}>
                        {watchDetails.inventoryQuantity > 0
                          ? isAddingToBag
                            ? "Adding To Your Bag..."
                            : "Add To Bag"
                          : "SOLD OUT"}
                      </span>

                      {/* {isAddingToBag ? "Adding to your bag..." : "Add to bag"} */}
                    </button>
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
                    <p style={{ fontSize: "1rem" }}>
                      {watchDetails.description}
                    </p>
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
                        <p className="details-value">
                          {watchDetails.reference}
                        </p>
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
                    <h6 style={{ color: "black", fontStyle: "italic" }}>
                      Case
                    </h6>
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

                    <h6 style={{ color: "black", fontStyle: "italic" }}>
                      Band
                    </h6>
                    <div className="details-row-container">
                      <div className="details-row">
                        <p className="details-key">TYPE</p>
                        <p className="details-value">
                          {watchDetails.band.type}
                        </p>
                      </div>
                      <div className="details-row">
                        <p className="details-key">MATERIAL</p>
                        <p className="details-value">
                          {watchDetails.band.material}
                        </p>
                      </div>

                      <div className="details-row">
                        <p className="details-key">COLOR</p>
                        <p className="details-value">
                          {watchDetails.band.color}
                        </p>
                      </div>
                      <div className="details-row">
                        <p className="details-key">WIDTH</p>
                        <p className="details-value">
                          {watchDetails.band.width} mm
                        </p>
                      </div>
                      <div className="details-row">
                        <p className="details-key">CLASP</p>
                        <p className="details-value">
                          {watchDetails.band.clasp}
                        </p>
                      </div>
                    </div>

                    <h6 style={{ color: "black", fontStyle: "italic" }}>
                      Dial
                    </h6>
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
                <h2>Bạn có thể thích</h2>
              </div>
              <Slider {...settings}>
                {recommendedWatches != null &&
                  recommendedWatches.map((watch, idx) => {
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
                                watchDetails?.reviews?.length) *
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
                {watchDetails?.reviews?.map((rv, idx) => (
                  <ReviewComponent
                    rv={rv}
                    key={idx}
                    axiosPrivate={axiosPrivate}
                    rootId={rv.id}
                    rootFetch={showComment}
                  />
                  // <div className="review-details row mb-1" key={idx}>
                  //   <div className="reviewer-info-container col-2">
                  //     {/* <img src="" alt="" /> */}
                  //     <div className="rv-customer-avt">
                  //       <FaUser />
                  //     </div>
                  //     <span className="rv-customer-name">
                  //       {rv?.customerDto?.firstName} {rv?.customerDto?.lastName}
                  //     </span>
                  //   </div>
                  //   <div className="review-contents col-10">
                  //     <ReactStars
                  //       value={rv.ratingStars}
                  //       size={22}
                  //       color1={"#aaa"}
                  //       color2={"#000"}
                  //       edit={false}
                  //     />
                  //     <p style={{ marginBottom: "0" }}>
                  //       {new Date(rv.datePosted).toLocaleString()}
                  //     </p>
                  //     <div className="rv-content">
                  //       <p style={{ marginBottom: "0", textAlign: "justify" }}>
                  //         {rv.comment}
                  //       </p>
                  //     </div>
                  //     <div className="pv-btn-container d-flex align-items-end gap-2">
                  //       {/* <button
                  //         className="rv-heart-btn"
                  //         onClick={() => handleHeart(idx)}
                  //       >
                  //         {heartStates[idx] ? (
                  //           <FaHeart className="rv-icons heart-active" />
                  //         ) : (
                  //           <FaRegHeart className="rv-icons" />
                  //         )}

                  //         {rv.loves}
                  //       </button> */}
                  //       {/* <FaHeart className="rv-icons" /> */}
                  //       <button
                  //         className="rv-heart-btn"
                  //         // onClick={() => showComment(rv?.id)}
                  //       >
                  //         {" "}
                  //         <FaRegComment className="rv-icons icon-comment" />
                  //         {rv?.totalChildReviews}
                  //       </button>
                  //       {rv?.totalChildReviews > 0 && (
                  //         <button
                  //           className="rv-heart-btn text-primary link-primary"
                  //           onClick={() => showComment(rv?.id)}
                  //           style={{ fontStyle: "italic" }}
                  //         >
                  //           Hiển thị bình luận
                  //         </button>
                  //       )}
                  //     </div>
                  //     {isAddingComment}
                  //     {isLoadingComment &&
                  //     rv?.id === currentLoadingCommentId ? (
                  //       <ClockLoader />
                  //     ) : (
                  //       <></>
                  //     )}
                  //     {commentList.length > 0 &&
                  //       commentList.map((crv, idx) => (
                  //         // <div className="rv-replies" key={idx}>
                  //         //   <div className="replies-info-container">
                  //         //     {/* <img src="" alt="" /> */}
                  //         //     <div className="replies-customer-avt">
                  //         //       <FaUser />
                  //         //     </div>
                  //         //     <span className="replies-customer-name">
                  //         //       {crv?.customerDto?.firstName}{" "}
                  //         //       {crv?.customerDto?.lastName} |
                  //         //     </span>
                  //         //     <span className="replies-customer-name">
                  //         //       {new Date(crv.datePosted).toLocaleString()}
                  //         //     </span>
                  //         //   </div>
                  //         //   <div className="replies-content">
                  //         //     <p style={{ marginBottom: "0" }}>{crv.comment}</p>
                  //         //   </div>
                  //         // </div>
                  //         <div
                  //           className={`child-comments-list ${
                  //             activeComment.includes(rv?.id)
                  //               ? "show-child-comments"
                  //               : "hide-child-comments"
                  //           }`}
                  //         >
                  //           <RenderChildReview key={idx} {...crv} />
                  //         </div>
                  //       ))}
                  //   </div>
                  // </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductView;
