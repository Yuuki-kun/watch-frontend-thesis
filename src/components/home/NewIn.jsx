import React from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import BestSellerItems from "./BestSellerItems";
import Slider from "react-slick";

const NewIn = () => {
  const newInProducts = [
    {
      name: "Mens Depth Charge 'Dive GMT' Silver and Green Stainless Steel Automatic Watch",
      img: "https://d1rkccsb0jf1bk.cloudfront.net/products/100050939/main/medium/D2B108A1913_1Front.jpg",
      price: 245.0,
      discountPercent: 35,
      timeLeaf: 2330,
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
            {newInProducts != null &&
              newInProducts.map((watch, idx) => {
                return <BestSellerItems key={idx} watchItem={watch} />;
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewIn;
