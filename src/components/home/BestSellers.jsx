import React, { useEffect, useState } from "react";
import BestSellerItems from "./BestSellerItems";
import { FcNext, FcPrevious } from "react-icons/fc";
import Slider from "react-slick";
import axios from "../../api/axios";

const BestSellers = () => {
  //best sellers img
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

  const bestSellersProducts = [
    {
      name: "Boss Here Sport Lux Watch",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/100032735/main/medium/1513767_LRG_rgb_Web.jpg",
      price: 399.0,
      discountPercent: 10,
      timeLeaf: 1920,
    },
    {
      name: "Mens Armani Exchange Watch AX2103",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/99953110/main/medium/AX2103_main.jpg",
      price: 169.0,
      discountPercent: 12,
      timeLeaf: 1833,
    },
    {
      name: "Vivienne Westwood Exclusive Ladies Silver Seymour Watch",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/100052014/main/medium/VV240SLBK.jpg",
      price: 215.0,
      discountPercent: 60,
      timeLeaf: 2130,
    },
    {
      name: "Mens Tommy Hilfiger Chase Watch 1791579",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/100037654/main/medium/1791579_LRG_rgb_Web.jpg",
      price: 150.0,
      discountPercent: 30,
      timeLeaf: 2211,
    },
    {
      name: "Mens Ben Sherman Aluminium Multisport BS079U",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/100048607/main/medium/BS079UMainImage.jpg",
      price: 85.0,
      discountPercent: 27,
      timeLeaf: 2400,
    },
  ];
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
  return (
    <section className="best-sellers-section">
      <div className="best-sellers-container">
        <div className="best-sellers-title">BestSellers</div>
        <div className="best-sellers-products">
          <Slider {...settings}>
            {bestSellerItems != null &&
              bestSellerItems.map((watch, idx) => {
                return <BestSellerItems key={idx} watchItem={watch} />;
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
