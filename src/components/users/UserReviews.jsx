import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import ClockLoader from "../ClockLoader";
import ReactStars from "react-stars";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = usePrivateRequest();
  useEffect(() => {
    setIsFetching(true);
    auth.userId &&
      axiosPrivate
        .get(`/api/v1/reviews/reviews-by-user/${auth.userId}`)
        .then((res) => {
          setReviews(res.data);
          setIsFetching(false);
        })
        .catch((err) => {
          console.log(err);
          setIsFetching(false);
        });
  }, [auth.userId]);
  console.log(reviews);
  return (
    <div className="ui-content">
      <h5>Đánh giá của bạn</h5>
      <div className="line-container">
        <span className="line"></span>
      </div>
      {isFetching && <ClockLoader />}

      <div className="reviews-container">
        {reviews.length > 0 &&
          reviews.map((review, idx) => {
            return (
              <>
                <div className="review-item d-flex mb-5" key={idx}>
                  <div className="review-item-header">
                    <div
                      className="review-item-avatar d-flex"
                      style={{
                        // width: "50%",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        src={`http://localhost:8080/image/fileSystem/${review.wimage}`}
                        alt="avatar"
                        className="review-avatar"
                        style={{ width: "90px", height: "90px" }}
                      />
                      <div className="review-item-info">
                        <div className="review-item-name">{review.wname}</div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="review-item-content"
                    style={{
                      width: "50%",
                      marginLeft: "auto",
                    }}
                  >
                    <div className="review-item-rating">
                      <div className="review-item-time">
                        {new Date(review.datePosted).toLocaleDateString()}
                      </div>
                      <span>Đánh giá: </span>
                      <ReactStars value={review.ratingStars} />
                    </div>
                    <div className="review-item-comment">
                      <span>Bình luận: </span>
                      <span>{review.comment}</span>
                    </div>
                  </div>
                </div>
                <div className="line-container">
                  <span className="line"></span>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default UserReviews;
