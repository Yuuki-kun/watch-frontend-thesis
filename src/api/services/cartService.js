import { GET_CART_ITEMS_URL } from "../../config/rest-api";
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
