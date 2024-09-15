import { CREATE_PROMOTION, GET_ALL_PROMOTIONS } from "../../../config/rest-api";

export const getPromotions = async (axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(`${GET_ALL_PROMOTIONS}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createPromotion = async (axiosPrivate, data) => {
  try {
    const response = await axiosPrivate.post(`${CREATE_PROMOTION}`, data);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
