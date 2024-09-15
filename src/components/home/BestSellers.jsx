import React, { useEffect, useState } from "react";
import BestSellerItems from "./BestSellerItems";
import { FcNext, FcPrevious } from "react-icons/fc";
import Slider from "react-slick";
import axios from "../../api/axios";
import ClockLoader from "../ClockLoader";

const BestSellers = () => {
  //best sellers img
  const [bestSellerItems, setBestSellerItems] = useState([]);
  const [selectedTime, setSelectedTime] = useState("month");
  const [isFetching, setIsFetching] = useState(false);
  const getBestSellerProducts = async () => {
    try {
      setIsFetching(true);
      const response = await axios.get(
        `/products/popular?time=${selectedTime}`
      );
      // if (response?.data) {
      //   const tripledArray = [];
      //   for (let i = 0; i < response.data.length; i += 1) {
      //     for (let j = 0; j < 3; j++) {
      //       if (
      //         response.data[i] !== undefined &&
      //         response.data[i + 1] !== undefined
      //       ) {
      //         tripledArray.push(response.data[i]);
      //         tripledArray.push(response.data[i + 1]);
      //       }
      //     }
      //   }
      //   setBestSellerItems(tripledArray);
      // }
      setBestSellerItems(response.data);
      setIsFetching(false);

      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(bestSellerItems);
  useEffect(() => {
    getBestSellerProducts();
  }, [selectedTime]);

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
          <h4>Đồng hồ bán chạy</h4>
          <select name="" id="" onChange={handleChange} value={selectedTime}>
            <option value="week">Tuần</option>
            <option value="month">Tháng</option>
          </select>
        </div>
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
