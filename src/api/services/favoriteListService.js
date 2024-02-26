import { GET_FAVORITE_LIST } from "../../config/rest-api";

export const getFavoriteListService = async (email, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(
      `${GET_FAVORITE_LIST}?email=${email}`
    );
    return response?.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
