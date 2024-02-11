import React from "react";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";
import "./home.css";
import BannerCarousel from "../../components/home/BannerCarousel";
import Brands from "../../components/home/Brands";
import BestSellers from "../../components/home/BestSellers";
const Home = () => {
  const logout = useLogout();
  const signout = async () => {
    await logout();
  };
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
      <BestSellers />
    </div>
  );
};

export default Home;
