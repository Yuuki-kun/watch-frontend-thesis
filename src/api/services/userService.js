import {
  GET_ORDERS,
  GET_USER_ADDRESS,
  GET_USER_INFO,
  UPDATE_DEFAULT_ADDRESS,
} from "../../config/rest-api";

export const fetchUser = async (userId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(`${GET_USER_INFO}/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getCustomerAddress = async (userId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(`${GET_USER_ADDRESS}/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updateDefaultAddress = async (cusId, addressId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.put(
      `${UPDATE_DEFAULT_ADDRESS}/${cusId}/${addressId}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchOrders = async (userId, axiosPrivate, status) => {
  try {
    const response = await axiosPrivate.get(
      `${GET_ORDERS}/${userId}/${status}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
