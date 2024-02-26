import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import BannerCarousel from "../../components/home/BannerCarousel";
import Brands from "../../components/home/Brands";
import BestSellers from "../../components/home/BestSellers";
import TopProductDisplay from "../../components/home/TopProductDisplay";
import { getFavoriteListService } from "../../api/services/favoriteListService";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import usePrivateRequest from "../../hooks/usePrivateRequest";
const Home = () => {
  const { auth } = useAuth();
  const { favoriteList, setFavoriteList, isFetchFavorite, setIsFetchFavorite } =
    useCart();
  const axiosPrivate = usePrivateRequest();
  useEffect(() => {
    const getWishList = async () => {
      try {
        const wishList = await getFavoriteListService(auth.email, axiosPrivate);
        if (wishList) {
          setFavoriteList(wishList);
          setIsFetchFavorite(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (auth.email && !isFetchFavorite) {
      getWishList();
    }
  }, [auth.email, isFetchFavorite, setFavoriteList, axiosPrivate]);
  console.log(favoriteList);
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
