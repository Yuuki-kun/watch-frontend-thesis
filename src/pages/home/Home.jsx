import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import BannerCarousel from "../../components/home/BannerCarousel";
import Brands from "../../components/home/Brands";
import BestSellers from "../../components/home/BestSellers";
import TopProductDisplay from "../../components/home/TopProductDisplay";
const Home = () => {
  return (
    <div className="home-section">
      {/* <Link to="/admin">Go to the Admin page</Link>
      <Link to="/register">Go to the Register page</Link>
      Home
      <div className="flexGrow">
        <button onClick={signout}>Sign Out</button>
      </div> */}

      <BannerCarousel />
      <Brands />
      {/* <BestSellers /> */}
      <TopProductDisplay />
    </div>
  );
};

export default Home;
