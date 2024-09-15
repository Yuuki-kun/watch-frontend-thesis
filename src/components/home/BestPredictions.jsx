import React, { useEffect, useState } from "react";
import BestSellerItems from "./BestSellerItems";
import { FcNext, FcPrevious } from "react-icons/fc";
import Slider from "react-slick";
import axios from "../../api/axios";
import ClockLoader from "../ClockLoader";

const BestPredictions = ({ data }) => {
  //best sellers img
  const [bestSellerItems, setBestSellerItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState("month");
  const [isFetching, setIsFetching] = useState(false);

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
  const handleChange = (e) => {
    setSelectedTime(e.target.value);
  };
  return (
    <section className="best-sellers-section">
      {isFetching && <ClockLoader />}
      <div className="best-sellers-container">
        <div className="best-sellers-title text-center mb-2">
          <h4>Gợi ý cho bạn</h4>
        </div>
        <div className="best-sellers-products">
          <Slider {...settings}>
            {data != null &&
              data.map((watch, idx) => {
                return <BestSellerItems key={idx} watchItem={watch} />;
              })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BestPredictions;
