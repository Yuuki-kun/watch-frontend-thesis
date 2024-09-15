import { GET_USERS, GET_ALL_USERS_INFO } from "../../../config/rest-api";
export const getUsersService = async (axiosPrivate, size, page) => {
  try {
    console.log("size", size);
    const response = await axiosPrivate.get(
      `${GET_USERS}?size=${size}&page=${page}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getUserRelatedInfo = async (axiosPrivate, userId, page, size) => {
  try {
    const response = await axiosPrivate.get(
      `${GET_ALL_USERS_INFO}/${userId}?size=${size}&page=${page}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
