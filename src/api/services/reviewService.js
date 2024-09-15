import {
  ADD_COMMENT,
  ADD_MULTI_REVIEW,
  ADD_REVIEW,
} from "../../config/rest-api";
import axios from "../axios";

//fetch reviews by parent id
export const fetchReviewsByParentId = async (parentId) => {
  try {
    const response = await axios.get(
      `/api/v1/reviews/reviews/parent/${parentId}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createMultiReview = async (axiosPrivate, review) => {
  try {
    const response = await axiosPrivate.post(ADD_MULTI_REVIEW, review);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const replyComment = async (axiosPrivate, review) => {
  try {
    const response = await axiosPrivate.post(ADD_COMMENT, review);
    return response?.data;
  } catch (err) {
    console.error(err);

    throw err;
  }
};
