import React, { useEffect } from "react";
import "./favorite.css";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import { getFavoriteListService } from "../../api/services/favoriteListService";
const Favorite = () => {
  const { auth } = useAuth();

  const { favoriteList, setFavoriteList } = useCart();
  const axiosPrivate = usePrivateRequest();
  useEffect(() => {
    const getWishList = async () => {
      try {
        const wishList = await getFavoriteListService(
          auth.userId,
          axiosPrivate
        );
        if (wishList) {
          setFavoriteList(wishList);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (auth.userId) {
      getWishList();
    }
  }, [auth.userId, setFavoriteList, axiosPrivate]);
  console.log(favoriteList);
  return (
    <section className="section-favorite-container">
      <div className="container favorite-container">
        <div className="row">
          <div className="col-12">MY LIST ({favoriteList?.length})</div>
          {favoriteList && favoriteList.map((fv, idx) => <div></div>)}
        </div>
      </div>
    </section>
  );
};

export default Favorite;
