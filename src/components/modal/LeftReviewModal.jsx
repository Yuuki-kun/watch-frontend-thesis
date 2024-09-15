import React, { useEffect } from "react";
import Modal from "react-modal";
import ReactStars from "react-stars";

const LeftReviewModal = ({
  isModalOpen,
  closeModal,
  submitReview,
  orderDetailsToReview,
  cusId,
}) => {
  //review list
  const [reviews, setReviews] = React.useState([]);
  useEffect(() => {
    Modal.setAppElement("body");
    if (orderDetailsToReview && reviews.length === 0) {
      // Kiểm tra xem mảng reviews có rỗng không
      const newReviews = orderDetailsToReview.map((details) => ({
        watchId: details.watch.id,
        comment: "",
        ratingStars: 0,
        customerId: cusId,
      }));
      setReviews(newReviews);
    }
    return () => {
      Modal.setAppElement(null);
    };
  }, [orderDetailsToReview]); // Thêm orderDetailsToReview vào dependencies để useEffect chạy lại khi nó thay đổi
  console.log(reviews);
  const submitAllReview = () => {
    submitReview(reviews);

    closeModal();
  };

  const commentChanged = (e, id) => {
    console.log(id, e?.target?.value);
    setReviews(
      reviews.map((review) =>
        review.watchId === id ? { ...review, comment: e.target.value } : review
      )
    );
  };
  const ratingChanged = (newRating, id) => {
    console.log(id, newRating);
    setReviews(
      reviews.map((review) =>
        review?.watchId === id ? { ...review, ratingStars: newRating } : review
      )
    );
  };

  console.log(reviews);

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
    <Modal
      className="style-modal"
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Viết nhận xét"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "650px",
          height: "auto",
          maxHeight: "80%",
          margin: "auto",
          marginTop: "10%",
        },
      }}
    >
      {" "}
      <h3>Viết nhận xét</h3>
      {orderDetailsToReview &&
        orderDetailsToReview.map((details, idx) => (
          <>
            <div
              className="d-flex gap-2 align-items-center"
              key={idx}
              id={`review-id-${details.id}`}
            >
              <img
                src={findMainImage(details.watch.images)}
                alt=""
                className="img-fluid"
                style={{ width: "100px", height: "auto" }}
              />
              <div>
                <h5>{details.watch.name}</h5>
                <ReactStars
                  size={24}
                  onChange={(newRating) =>
                    ratingChanged(newRating, details?.watch?.id)
                  }
                  value={
                    reviews.find(
                      (review) => review.watchId === details?.watch?.id
                    )?.ratingStars
                  }
                />
              </div>
            </div>
            <textarea
              id={`comment-${details.id}`}
              className="form-control mt-3"
              placeholder="Nhận xét của bạn..."
              onChange={(e) => commentChanged(e, details.watch.id)}
            />
            <div className="line-container">
              <span className="line"></span>
            </div>
          </>
        ))}
      <button
        className="modal-btn modal-accept-btn"
        onClick={() => submitAllReview()}
      >
        Gửi đánh giá
      </button>
    </Modal>
  );
};

export default LeftReviewModal;
