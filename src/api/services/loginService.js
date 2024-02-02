import { LOGIN_URL } from "../../config/rest-api";
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
