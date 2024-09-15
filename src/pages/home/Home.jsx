import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import BannerCarousel from "../../components/home/BannerCarousel";
import Brands from "../../components/home/Brands";
import BestSellers from "../../components/home/BestSellers";
import TopProductDisplay from "../../components/home/TopProductDisplay";
import { getFavoriteListService } from "../../api/services/favoriteListService";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import axios from "../../api/axios";
import BestPredictions from "../../components/home/BestPredictions";
import Slider from "react-slick";
import BestSellerItems from "../../components/home/BestSellerItems";
import { FcNext, FcPrevious } from "react-icons/fc";

const Home = () => {
  const { auth } = useAuth();
  const { favoriteList, setFavoriteList } = useCart();
  const axiosPrivate = usePrivateRequest();
  // const [recommendations, setRecommendations] = React.useState([]);
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
  }, [auth.userId, axiosPrivate]);

  const [ids, setIds] = useState([]);
  const [recommendedWatches, setRecommendedWatches] = useState([]);

  useEffect(() => {
    const getBestSellerProducts = async () => {
      try {
        console.log("get predictions");
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
    if (auth.userId) {
      getBestSellerProducts();
    }
  }, [auth.userId]);

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

  // console.log(recommendations);

  // const [imgs, setImgs] = React.useState([]);
  // useEffect(() => {
  //   const fetchImages = async () => {
  //     const res = await fetch(
  //       "http://localhost:8080/image/fileSystem/FLHoPMIacAAZM_h.jpeg"
  //     );
  //     const data = await res.json();
  //     console.log(data);
  //     setImgs(data);
  //   };
  //   fetchImages();
  // }, []);

  const [top4Men, setTop4Men] = React.useState([]);
  const [top4Women, setTop4Women] = React.useState([]);
  useEffect(() => {
    const fetchTop4 = async () => {
      const res = await axios.get("/products/get-four-new-watches?gender=Mens");
      setTop4Men(res.data);
    };
    const fetchTop4W = async () => {
      const res = await axios.get(
        "/products/get-four-new-watches?gender=Womens"
      );
      setTop4Women(res.data);
    };
    fetchTop4();
    fetchTop4W();
  }, []);

  console.log(top4Men);
  console.log(top4Women);

  console.log(favoriteList);

  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };
  const navigate = useNavigate();
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
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="home-section">
      {/* <Link to="/admin">Go to the Admin page</Link>
      <Link to="/register">Go to the Register page</Link>
      Home
      <div className="flexGrow">
        <button onClick={signout}>Sign Out</button>
      </div> */}

      <BannerCarousel />
      <div className="mt-5 text-center border-bottom">
        <h4>Thương hiệu</h4>
      </div>
      <Brands />
      {recommendedWatches.length > 0 && (
        <div className="pv-recommended-list-container text-center mt-5 home-watch-area best-sellers-section">
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
      )}

      <BestSellers />
      <div className="home-watch-area best-sellers-section mt-5">
        <div
          className="d-flex"
          style={{
            alignItems: "space-between",
            // justifyContent: "space-between",
          }}
        >
          <div
            style={{
              marginRight: "15px",
              width: "40%",
              position: "relative",
            }}
          >
            <img
              src="./images/banner-imgs/menw.jpg"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "15px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "15px",
                textAlign: "center",
                color: "white",
              }}
            >
              <h3>Đồng hồ nam mới</h3>
              <Link
                to={"/products-page?type=fetch&cate=men&size=20&page=0"}
                style={{
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "#dc1f18",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
                onClick={() =>
                  navigate("/products-page?type=fetch&cate=men&size=20&page=0")
                }
              >
                Khám phá
              </Link>
            </div>
          </div>
          <div
            className="d-flex flex-wrap"
            style={{
              width: "60%",
            }}
          >
            {top4Men.length > 0 &&
              top4Men.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  style={{
                    fontSize: "1rem",

                    width: "50%",
                    padding: "0 10px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Căn giữa các thành phần theo chiều dọc
                    justifyContent: "center", // Căn giữa các thành phần theo chiều ngang
                    textAlign: "center", // Căn giữa văn bản
                  }}
                >
                  <Link
                    to={`/products/${product.reference}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <img
                      src={findMainImage(product.images)}
                      alt=""
                      style={{
                        width: "50%",
                        borderRadius: "15px",
                        marginBottom: "10px",
                      }}
                    />
                    <p>{product.name}</p>
                    {/* Add other product information here */}
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="d-flex">
          <div
            className="d-flex flex-wrap"
            style={{
              width: "60%",
            }}
          >
            {top4Women.length > 0 &&
              top4Women.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  style={{
                    fontSize: "1rem",
                    width: "50%",
                    padding: "0 10px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // Căn giữa các thành phần theo chiều dọc
                    justifyContent: "center", // Căn giữa các thành phần theo chiều ngang
                    textAlign: "center", // Căn giữa văn bản
                  }}
                >
                  <Link
                    to={`/products/${product.reference}`}
                    style={{
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <img
                      src={findMainImage(product.images)}
                      alt=""
                      style={{
                        width: "50%",
                        borderRadius: "15px",
                        marginBottom: "10px",
                      }}
                    />
                    <p>{product.name}</p>
                    {/* <p>{product.defaultPrices}</p> */}
                    {/* Add other product information here */}
                  </Link>
                </div>
              ))}
          </div>

          <div
            className="w-40"
            style={{
              marginLeft: "auto",
              position: "relative",
            }}
          >
            <img
              src="./images/banner-imgs/womenimg.jpg"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "15px",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                // backgroundColor: "rgba(255, 255, 255, 0.7)",
                padding: "10px",
                borderRadius: "15px",
                textAlign: "center",
                color: "white",
              }}
            >
              <h3>Đồng hồ nữ mới</h3>
              <Link
                to={"/products-page?type=fetch&cate=women&size=20&page=0"}
                style={{
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "#dc1f18",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "1.2rem",
                  fontWeight: "600",
                }}
                // onClick={() =>
                //   navigate(
                //     "/products-page?type=fetch&cate=women&size=20&page=0"
                //   )
                // }
              >
                Khám phá
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
