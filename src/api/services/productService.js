import axios from "../axios";

export const getProducts = async (type, size, page) => {
  try {
    const response = await axios.get(
      `/products/page?type=${type}&size=${size}&page=${page}`
    );
    console.log(response);
    return response;
  } catch (err) {
    console.error(err);
  }
};
