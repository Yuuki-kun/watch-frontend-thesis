import { CREATE_ORDER } from "../../config/rest-api";

const createCheckoutSession = async (userId, cartItems, axiosPrivate) => {
  console.log(cartItems);
  //spit id from each cart item into a new list
  const orderDetailsId = JSON.parse(cartItems).map((item) => item.cartId);
  console.log(orderDetailsId);
  try {
    const response = await axiosPrivate.post(CREATE_ORDER, {
      customerId: userId,
      orderDetailsId,
    });

    // Handle the response data here
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // Handle any errors that occurred during the request
    console.error(error);
  }
};

export default createCheckoutSession;
