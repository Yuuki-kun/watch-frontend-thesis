import { LOGIN_CK_URL, LOGIN_URL } from "../../config/rest-api";
import axios from "../axios";

export const LoginService = async ({ email, password }) => {
  try {
    const response = await axios.post(LOGIN_URL, {
      email,
      password,
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const LoginCheckoutService = async (email, password, cartItems) => {
  console.log("log" + email);
  console.log("log" + password);
  console.log("log" + cartItems);

  try {
    const response = await axios.post(LOGIN_CK_URL, {
      email,
      password,
      cartItems,
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
