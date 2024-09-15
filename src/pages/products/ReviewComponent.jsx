import React, { useEffect } from "react";
import { useState } from "react";
import { FaRegHeart, FaUser, FaRegComment } from "react-icons/fa";
import ReactStars from "react-stars";
import {
  fetchReviewsByParentId,
  replyComment,
} from "../../api/services/reviewService";
import ClockLoader from "../../components/ClockLoader";
import RenderChildReview from "./RenderChildReview";
import { BsSendFill } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import usePrivateRequest from "../../hooks/usePrivateRequest";

const ReviewComponent = ({ rv }) => {
  const [currentLoadingCommentId, setCurrentLoadingCommentId] = useState(null);
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [activeComment, setActiveComment] = useState([]);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  const [totalChildReviews, setTotalChildReviews] = useState(
    rv?.totalChildReviews
  );

  const showComment = async (type, id) => {
    // console.log(currentLoadingCommentId);
    if (type === "btn" && activeComment.includes(id)) {
      const newActiveComment = activeComment.filter((item) => item !== id);
      setActiveComment(newActiveComment);
      return;
    }
    try {
      setIsLoadingComment(true);
      setCurrentLoadingCommentId(id);
      // console.log("fetch id = ", id);

      const res = await fetchReviewsByParentId(id);
      // console.log(res);
      setCommentList(res);
      // setTotalChildReviews(res.length);

      activeComment.push(id);
      setIsLoadingComment(false);
    } catch (err) {
      console.error(err);
    }
    console.log(id);
  };

  useEffect(() => {
    const fetchdata = async () => {
      const totalReview = await axios.get(
        `/api/v1/reviews/total-reviews/${rv?.id}`
      );

      // console.log(totalReview?.data);
      setTotalChildReviews(totalReview?.data);
    };
    console.log("????????");
    fetchdata();
  }, [commentList]);

  const [comment, setComment] = useState("");
  const handleReply = async (id, comment) => {
    try {
      setIsAddingComment(true);
      const res = await replyComment(axiosPrivate, {
        comment: comment,
        parentId: id,
        customerId: auth.userId,
      });
      // setCommentList(res);
      showComment("func", rv?.id);
      //   rootFetch(rootId);

      setIsAddingComment(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="review-details row mb-1">
      <div className="reviewer-info-container col-2">
        {/* <img src="" alt="" /> */}
        <div className="rv-customer-avt">
          <FaUser />
        </div>
        <span className="rv-customer-name">
          {rv?.customerDto?.firstName} {rv?.customerDto?.lastName}
        </span>
      </div>
      <div className="review-contents col-10">
        <ReactStars
          value={rv.ratingStars}
          size={22}
          color1={"#aaa"}
          color2={"#000"}
          edit={false}
        />
        <p style={{ marginBottom: "0" }}>
          {new Date(rv.datePosted).toLocaleString()}
        </p>
        <div className="rv-content">
          <p style={{ marginBottom: "0", textAlign: "justify" }}>
            {rv.comment}
          </p>
        </div>
        <div className="pv-btn-container d-flex align-items-end gap-2">
          {/* <button
                          className="rv-heart-btn"
                          onClick={() => handleHeart(idx)}
                        >
                          {heartStates[idx] ? (
                            <FaHeart className="rv-icons heart-active" />
                          ) : (
                            <FaRegHeart className="rv-icons" />
                          )}

                          {rv.loves}
                        </button> */}
          {/* <FaHeart className="rv-icons" /> */}
          <button
            className="rv-heart-btn"
            onClick={() => setIsAddingComment(!isAddingComment)}
          >
            {" "}
            <FaRegComment className="rv-icons icon-comment" />
            {totalChildReviews}
          </button>
          {totalChildReviews > 0 && (
            <button
              className="rv-heart-btn text-primary link-primary"
              onClick={() => showComment("btn", rv?.id)}
              style={{ fontStyle: "italic" }}
            >
              Hiển thị bình luận
            </button>
          )}
        </div>
        {isLoadingComment && rv?.id === currentLoadingCommentId ? (
          <ClockLoader />
        ) : (
          <></>
        )}
        {commentList.length > 0 &&
          commentList.map((crv, idx) => (
            // <div className="rv-replies" key={idx}>
            //   <div className="replies-info-container">
            //     {/* <img src="" alt="" /> */}
            //     <div className="replies-customer-avt">
            //       <FaUser />
            //     </div>
            //     <span className="replies-customer-name">
            //       {crv?.customerDto?.firstName}{" "}
            //       {crv?.customerDto?.lastName} |
            //     </span>
            //     <span className="replies-customer-name">
            //       {new Date(crv.datePosted).toLocaleString()}
            //     </span>
            //   </div>
            //   <div className="replies-content">
            //     <p style={{ marginBottom: "0" }}>{crv.comment}</p>
            //   </div>
            // </div>
            <div
              className={`child-comments-list ${
                activeComment.includes(rv?.id)
                  ? "show-child-comments"
                  : "hide-child-comments"
              }`}
            >
              <RenderChildReview
                key={idx}
                crv={crv}
                userId={auth.userId}
                axiosPrivate={axiosPrivate}
                rootFetch={showComment}
                rootId={rv?.id}
              />
            </div>
          ))}
        {isAddingComment && (
          <div
            className={`leave-comment-container width-95 d-flex flex-column gap-2 ${
              isAddingComment ? "show-add-comment" : "hide-add-comment"
            }`}
          >
            <textarea
              className="form-control mt-3 width-95"
              placeholder="Leave a comment..."
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="btn btn-outline-dark"
              onClick={() => handleReply(rv?.id, comment)}
            >
              Gửi <BsSendFill />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
