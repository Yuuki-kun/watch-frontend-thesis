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

export const LoginCheckoutService = async (email, password, tempoCartId) => {
  console.log("log" + email);
  console.log("log" + password);

  try {
    const response = await axios.post(`${LOGIN_CK_URL}/${tempoCartId}`, {
      email,
      password,
    });
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
