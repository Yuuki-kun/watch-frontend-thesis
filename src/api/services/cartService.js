import {
  ADD_TO_BAG_UNAU_URL,
  ADD_TO_BAG_URL,
  DELETE_ITEMS,
  GET_CART_ITEMS_URL,
  GET_TEMPORARY_CART,
  UPDATE_ITEM_QTY,
} from "../../config/rest-api";
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

export const getTempoCart = async () => {
  try {
    const response = await axios.get(GET_TEMPORARY_CART);
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

export const removeFromBagService = async (cartId, itemId) => {
  try {
    console.log("cart=" + cartId + "itemid=" + itemId);
    const response = await axios.delete(
      `${DELETE_ITEMS}?cart=${cartId}&item=${itemId}`
    );
    console.log(response.data);
    return response?.data;
  } catch (err) {
    console.error(err);
  }
};

export const controlQtyService = async (cartId, itemId, method) => {
  try {
    console.log("cart=" + cartId + "itemid=" + itemId);
    const response = await axios.put(
      `${UPDATE_ITEM_QTY}?cart=${cartId}&item=${itemId}&method=${method}`
    );
    console.log(response.data);
    return response?.data;
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 * @param {*} ids list of order details id
 */
export const getCartItemsWithListId = async (ids, axiosPrivate) => {
  try {
    const response = await axiosPrivate.post(
      "/api/v1/user-cart/checkout-items",
      ids
    );
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
