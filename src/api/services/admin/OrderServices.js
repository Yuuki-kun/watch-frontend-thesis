import { CAPTURE_ORDER, GET_ALL_ORDERS } from "../../../config/rest-api";

export const getAll = async (axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(GET_ALL_ORDERS);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const captureOrder = async (axiosPrivate, orderId) => {
  try {
    const response = await axiosPrivate.post(`${CAPTURE_ORDER}/${orderId}`);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
