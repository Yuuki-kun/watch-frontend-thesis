import { GET_USER_INFO } from "../../config/rest-api";

export const fetchUser = async (userId, axiosPrivate) => {
  try {
    const response = await axiosPrivate.get(`${GET_USER_INFO}/${userId}`);
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
