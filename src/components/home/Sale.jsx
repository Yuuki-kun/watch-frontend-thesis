import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import BestSellerItems from "./BestSellerItems";
import Slider from "react-slick";

const Sale = () => {
  const saleItems = [
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
    {
      name: "Michael Kors Darci Watch Rose Gold MK3192",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/99955046/main/medium/MK3192main.jpg",
      price: 239.0,
      discountPercent: 55,
      timeLeaf: 2115,
    },
    {
      name: "Mens Lacoste Watch",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/100043629/main/medium/2011050_1.jpg",
      price: 139.0,
      discountPercent: 60,
      timeLeaf: 1900,
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
  //im using the same css styles with best seller items, change later
  return (
    <section className="best-sellers-section">
      <div className="best-sellers-container">
        <div className="best-sellers-title">NewIn</div>
        <div className="best-sellers-products">
          <Slider {...settings}>
            {saleItems != null &&
              saleItems.map((watch, idx) => {
                return <BestSellerItems key={idx} watchItem={watch} />;
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Sale;
