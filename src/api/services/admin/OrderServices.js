import {
  CAPTURE_ORDER,
  CHANGE_ORDER_STATUS,
  GET_ALL_ORDERS,
  RETRIEVE_ORDER,
} from "../../../config/rest-api";

export const retrieveOrder = async (axiosPrivate, orderId) => {
  try {
    const response = await axiosPrivate.get(`${RETRIEVE_ORDER}/${orderId}`);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAll = async (axiosPrivate, size, page, query) => {
  try {
    const response = await axiosPrivate.get(
      `${GET_ALL_ORDERS}?size=${size}&page=${page}&query=${query}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const captureOrder = async (axiosPrivate, orderId, type) => {
  try {
    const response = await axiosPrivate.post(
      `${CAPTURE_ORDER}/${orderId}?type=${type}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const changeOrderStatus = async (
  axiosPrivate,
  orderId,
  status,
  page
) => {
  try {
    const response = await axiosPrivate.put(
      `${CHANGE_ORDER_STATUS}/${orderId}?status=${status}&pageData=${page}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
