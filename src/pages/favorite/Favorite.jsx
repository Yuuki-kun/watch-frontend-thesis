import React, { useEffect, useState } from "react";
import "./favorite.css";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import {
  getDetailFavoriteService,
  getFavoriteListService,
  removeFromFavoriteService,
} from "../../api/services/favoriteListService";
import ReactStars from "react-stars";
import { addToBagService } from "../../api/services/cartService";
import { Bounce, ToastContainer, toast } from "react-toastify";
const Favorite = () => {
  const { auth } = useAuth();

  const [fvrDetailList, setFvrDetailList] = useState([]);
  const axiosPrivate = usePrivateRequest();
  useEffect(() => {
    const getWishList = async () => {
      try {
        const wishList = await getDetailFavoriteService(
          auth.userId,
          axiosPrivate
        );
        if (wishList) {
          setFvrDetailList(wishList);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (auth.userId) {
      getWishList();
    }
  }, [auth.userId, axiosPrivate]);
  console.log(fvrDetailList);

  const moveToBag = async (watchDetails) => {
    // Check if auth and watchDetails are defined
    if (auth?.cartId && watchDetails?.id) {
      try {
        const response = await addToBagService(
          auth.cartId,
          watchDetails.id,
          watchDetails.defaultPrices,
          1
        );
        notify(watchDetails.images[0].image);
      } catch (error) {}
    } else {
      console.error("auth.cartId or watchDetails.id is undefined.");
    }
  };

  const remove = async (wid) => {
    try {
      const response = await removeFromFavoriteService(
        auth?.userId,
        wid,
        axiosPrivate
      );
      console.log(wid);
      const updatedItems = fvrDetailList.filter(
        (item) => item.watch.id !== wid
      );
      setFvrDetailList(updatedItems);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(fvrDetailList);

  const notify = (wimg) =>
    toast.success(
      <div>
        <img src={wimg} alt="" className="notify-watch-img" />
        <span>Đã thêm vào giỏ hàng!</span>
      </div>
    );

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
    <section className="section-favorite-container">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        draggable
        theme="dark"
        transition={Bounce}
        success
      />
      <div className="container favorite-container">
        <div className="row">
          <div className="col-12">MY LIST ({fvrDetailList?.length})</div>
          {fvrDetailList &&
            fvrDetailList.map((fv, idx) => (
              <div
                className="col-6 fav-item-container"
                style={{
                  height: "auto",
                }}
                key={idx}
              >
                <div
                  className={`fav-stock-status ${
                    fv.watch.inventoryQuantity > 0 ? "in-stock" : "out-stock"
                  }`}
                >
                  <div className="stock-content">
                    {fv.watch.inventoryQuantity > 0 ? "Còn hàng" : "Hết hàng"}
                  </div>
                </div>
                <div className="fav-item">
                  <div className="fav-watch-img">
                    <img
                      src={findMainImage(fv.watch.images)}
                      alt={fv.watch.name}
                      className="fv-img"
                    />
                  </div>
                  <div className="fav-item-info">
                    <div>
                      <h3>{fv.watch.brand.brandName}</h3>
                      <p className="fav-prod-name">{fv.watch.name}</p>
                      <p className="fav-inf">{fv.watch.reference}</p>

                      <span>
                        {(fv.watch.defaultPrices * 1000).toLocaleString()}đ
                      </span>
                      <ReactStars
                        edit={false}
                        value={fv.watch.stars}
                        size={20}
                      />
                      <p className="fav-inf">
                        Date Added: {new Date(fv.dateAdded).toLocaleString()}
                      </p>
                    </div>
                    <div className="fav-btn-container">
                      <button
                        className="fav-btn fav-move-bag"
                        onClick={() => moveToBag(fv.watch)}
                        disabled={fv.watch.inventoryQuantity <= 0}
                      >
                        {fv.watch.inventoryQuantity > 0
                          ? "Move To Bag"
                          : "Sold Out"}
                      </button>
                      <button
                        className="fav-btn fav-rm"
                        onClick={() => remove(fv.watch.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Favorite;
