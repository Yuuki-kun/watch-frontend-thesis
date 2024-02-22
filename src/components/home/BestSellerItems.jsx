import React, { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const BestSellerItems = ({ watchItem }) => {
  // console.log(watchItem);
  //   props.map((p, i) => {
  //     console.log(i + " " + p.name);
  //   });
  const targetTime = new Date();
  // targetTime.setHours(watchItem.timeLeaf / 100);
  // targetTime.setMinutes(watchItem.timeLeaf % 100);
  targetTime.setHours(3000 / 100);
  targetTime.setMinutes(3000 % 100);
  targetTime.setSeconds(0);

  const calculateTimeRemaining = () => {
    const currentTime = new Date();
    const difference = targetTime - currentTime;
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
    const hours = Math.floor(difference / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);
    return { hours, minutes, seconds };
  };
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  return (
    <Link
      className="card"
      to={`/products/${watchItem.reference}`}
      target="_top"
    >
      <div className="product">
        <div className="img">
          <img
            src={watchItem != null ? watchItem.images[0].image : "img"}
            alt="img"
            className="img-fluid"
          />
        </div>
        <div className="product-info">
          <div className="content">
            <h3 className="desc">{watchItem != null && watchItem.name}</h3>
          </div>
          <div className="price">
            <div className="default-price">
              {watchItem != null &&
                (Number(watchItem.defaultPrices) * 1000000).toLocaleString()}
              đ
            </div>
            <div className="new-discount-price">
              {watchItem != null &&
                (
                  (Number(watchItem.defaultPrices) * 1000 * Number(100 - 20)) /
                  100
                )
                  // Number(100 - watchItem.discountPercent)) /100

                  .toLocaleString()}
              đ
              <div>
                <span style={{ color: "black", marginLeft: "8px" }}>in</span>
              </div>
              <div className="discount-unit-time">{timeRemaining.hours}</div>:
              <div className="discount-unit-time">{timeRemaining.minutes}</div>:
              <div className="discount-unit-time">{timeRemaining.seconds}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestSellerItems;
