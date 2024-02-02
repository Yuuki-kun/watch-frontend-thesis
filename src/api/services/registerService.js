import { REGISTER_URL } from "../../config/rest-api";
import axios from "../axios";

export const RegisterService = async (registerUser) => {
  try {
    const response = await axios.post(REGISTER_URL, registerUser);
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
