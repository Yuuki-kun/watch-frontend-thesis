import {
  ADD_FAVORITE_LIST,
  GET_DETAIL_FAVORITE_LIST,
  GET_FAVORITE_LIST,
  REMOVE_FAVORITE_LIST,
} from "../../config/rest-api";
import { axiosPrivate } from "../axiosPrivate";

export const getFavoriteListService = async (id, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(`${GET_FAVORITE_LIST}?id=${id}`);
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addToFavoriteService = async (cid, wid, axiosPrivate) => {
  try {
    const response = await axiosPrivate.post(
      `${ADD_FAVORITE_LIST}/${cid}/${wid}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeFromFavoriteService = async (cid, wid, axiosPrivate) => {
  try {
    const response = await axiosPrivate.delete(
      `${REMOVE_FAVORITE_LIST}/${cid}/${wid}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getDetailFavoriteService = async (cid, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(
      `${GET_DETAIL_FAVORITE_LIST}/${cid}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
