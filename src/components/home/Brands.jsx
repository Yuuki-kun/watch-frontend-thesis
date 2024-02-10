import React, { useEffect, useState } from "react";
import Slider from "react-slick";
const Brands = () => {
  const brandList = [
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/brand-logos/gshock-logo2.png",
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/brand/20/casio.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/vivw_s.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/brand/Boss_100x23px.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/brand/Tissot_200x46px.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/brand/EmporioArmani_200x46px.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/brand/4/citizen.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/brand/32/01_timexboutiquelogo.png",
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/brand/16/2015_guess_logo_logo_blk.png",
    "https://d1rkccsb0jf1bk.cloudfront.net/logos/brand/23/fossil_logo.jpg",
    "https://d1rkccsb0jf1bk.cloudfront.net/brand/MichaelKors_200x46px.jpg",
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
  };
  useEffect(() => {
    // Hàm xử lý sự kiện thay đổi kích thước màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Đăng ký sự kiện resize
    window.addEventListener("resize", handleResize);

    // Hủy đăng ký sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (windowWidth <= 578) {
    settings.slidesToShow = 2;
  } else if (windowWidth <= 991 && windowWidth > 578) {
    settings.slidesToShow = 4;
  } else {
    settings.slidesToShow = 6;
  }

  return (
    <section className="container brand-section">
      <div className="brand-slider-container">
        <Slider arrows={false} {...settings}>
          {brandList != null &&
            brandList.map((brand, index) => (
              <div key={index}>
                <img src={brand} alt={"brand " + brand} />
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default Brands;
