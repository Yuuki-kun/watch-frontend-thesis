import React from "react";
import { useState } from "react";
import { FaRegHeart, FaUser, FaRegComment } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import { replyComment } from "../../api/services/reviewService";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const RenderChildReview = ({ crv, rootFetch, rootId, isChild = false }) => {
  const axiosPrivate = usePrivateRequest();
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  console.log(crv);
  const [isReplying, setIsReplying] = useState(false);
  const [comment, setComment] = useState("");
  const handleReply = async (id) => {
    try {
      setIsReplying(true);
      const res = await replyComment(axiosPrivate, {
        comment: comment,
        parentId: id,
        customerId: auth.userId,
      });
      rootFetch("func", rootId);
      setIsReplying(false);
    } catch (err) {
      if (err.response.status === 403) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        navigate("/login", { state: { from: location }, replace: true });
      }
      console.error(err);
    }
  };
  return (
    <>
      <div
        className={`rv-replies ${isChild ? "reply-child" : ""} ${
          crv?.childReviews?.length === 0 ||
          crv?.childReviews?.length === undefined
            ? "is-leaf"
            : ""
        }`}
      >
        <div className="replies-info-container">
          {/* <img src="" alt="" /> */}
          <div className="replies-customer-avt">
            <FaUser />
          </div>
          <span className="replies-customer-name">
            {crv?.customerDto?.firstName} {crv?.customerDto?.lastName} |
          </span>
          <span className="replies-customer-name">
            {new Date(crv?.datePosted).toLocaleString()}
          </span>
        </div>
        <div className="replies-content">
          <p style={{ marginBottom: "0" }}>{crv?.comment}</p>
        </div>
        {
          <div className="reply-actions d-flex gap-3">
            {/* <button className="rv-heart-btn">
              <FaRegHeart />
              <span>Like</span>
            </button> */}
            <button
              className="rv-heart-btn"
              // onClick={() => handleReply(crv.id)}
              onClick={() => setIsReplying(!isReplying)}
            >
              <FaRegComment />
              <span>Reply</span>
            </button>
          </div>
        }
        {crv?.childReviews?.length > 0 &&
          crv.childReviews.map((crvs) => (
            // RenderChildReview({ ...crvs, isChild: true })
            <RenderChildReview
              crv={crvs}
              rootFetch={rootFetch}
              rootId={rootId}
              isChild={true}
            />
          ))}
        {/* {isChild && (
          <div className="line-container">
            <span className="line"></span>
          </div>
        )} */}
        {isReplying && (
          <div
            className={`leave-comment-container width-95 d-flex flex-column gap-2 ${
              isReplying ? "show-add-comment" : "hide-add-comment"
            }`}
          >
            <textarea
              className="form-control mt-3 width-95"
              placeholder="Leave a comment..."
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                handleReply(crv?.id);
              }}
            >
              Gửi <BsSendFill />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default RenderChildReview;
