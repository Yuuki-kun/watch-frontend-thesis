import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FcPrevious, FcNext } from "react-icons/fc";

const BannerCarousel = () => {
  //   const handleSlideChange = (currentSlide) => {
  //     console.log(currentSlide);
  //     if (currentSlide === 1) {
  //       const video = document.querySelector("#home-banner-video-1");
  //       if (video) {
  //         video.currentTime = 0;
  //         video.play().catch((error) => {
  //           console.error("Autoplay was prevented:", error);
  //         });
  //       }
  //     }
  //   };

  const renderArrowPrev = (clickHandler, hasPrev, label) => {
    return (
      <button
        className="arrow-prev-control"
        type="button"
        onClick={clickHandler}
        title={label}
        style={{ display: hasPrev ? "block" : "none" }}
      >
        <FcPrevious className="icon" />
      </button>
    );
  };

  const renderArrowNext = (clickHandler, hasNext, label) => {
    return (
      <button
        className="arrow-next-control"
        type="button"
        onClick={clickHandler}
        title={label}
        style={{ display: hasNext ? "block" : "none" }}
      >
        <FcNext className="icon" />
      </button>
    );
  };

  return (
    <Carousel
      //   onChange={(idx) => handleSlideChange(idx)}
      autoPlay={true}
      infiniteLoop={true}
      emulateTouch={true}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      showThumbs={false}
      interval={4000}
    >
      <div>
        <img
          src="./images/banner-imgs/brand4.jpeg"
          alt="banner1"
          className="img-fluid"
        />
      </div>

      <div>
        <img
          src="./images/banner-imgs/brand5.jpg"
          alt="banner2"
          className="img-fluid"
        />
      </div>
      <div>
        <img
          src="./images/banner-imgs/brand6.jpeg"
          alt="banner3"
          className="img-fluid"
        />
      </div>
      <div>
        <img
          src="./images/banner-imgs/brand7.jpeg"
          alt="banner4"
          className="img-fluid"
        />
      </div>
    </Carousel>
  );
};

export default BannerCarousel;
