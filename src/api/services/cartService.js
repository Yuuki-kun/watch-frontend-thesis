import { ADD_TO_BAG_URL, GET_CART_ITEMS_URL } from "../../config/rest-api";
import axios from "../axios";

export const getCartItemsService = async (cartId) => {
  try {
    const response = await axios.get(`${GET_CART_ITEMS_URL}?cart=${cartId}`);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addToBagService = async (cartId, watchId, price, quantity) => {
  try {
    const response = await axios.post(`${ADD_TO_BAG_URL}`, {
      cartId,
      watchId,
      price,
      quantity,
    });
    return response?.data;
    console.log(response?.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
