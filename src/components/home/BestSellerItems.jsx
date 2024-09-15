import React, { useEffect, useState } from "react";
import { FcNext, FcPrevious } from "react-icons/fc";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "../../pages/home/home.css";
const BestSellerItems = ({ watchItem }) => {
  // const [imageMain, setImageMain] = useState(null);
  // useEffect(() => {
  //   if (watchItem?.images?.length > 0) {
  //     watchItem.images.map((img) => {
  //       if (img.main === true) {
  //         setImageMain(img.name);
  //       }
  //     });
  //   }
  // }, []);

  const findMainImage = (images) => {
    let mainImage = "";
    images.map((img) => {
      if (img.main === true) {
        mainImage = img.name;
      }
    });
    return "http://localhost:8080/image/fileSystem/" + mainImage;
  };

  return (
    <Link
      className="card"
      to={`/products/${watchItem.reference}`}
      target="_top"
    >
      <div className="product">
        <div className="img">
          <img
            src={findMainImage(watchItem.images)}
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
                watchItem.discount > 0 &&
                (Number(watchItem.defaultPrices) * 1000).toLocaleString() +
                  "VND"}
            </div>
            <div className="new-discount-price">
              {watchItem != null &&
                (
                  (Number(watchItem.defaultPrices) *
                    1000 *
                    Number(100 - watchItem.discount)) /
                  100
                )
                  // Number(100 - watchItem.discountPercent)) /100

                  .toLocaleString()}
              VND
              {/* <div>
                <span style={{ color: "black", marginLeft: "8px" }}>in</span>
              </div> */}
              {/* <div className="discount-unit-time">{timeRemaining.hours}</div>: */}
              {/* <div className="discount-unit-time">{timeRemaining.minutes}</div>: */}
              {/* <div className="discount-unit-time">{timeRemaining.seconds}</div> */}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BestSellerItems;
