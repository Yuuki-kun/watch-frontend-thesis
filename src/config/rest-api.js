export const REGISTER_URL = "/api/v1/authentication/register";
export const LOGIN_URL = "/api/v1/authentication/authenticate";
export const LOGIN_CK_URL = "/api/v1/authentication/authenticate-checkout";

export const REFRESH_TOKEN_URL = "/api/v1/authentication/refresh-token";
export const LOGOUT_URL = "/api/v1/authentication/logout";

export const GET_CART_ITEMS_URL = "/api/v1/user-cart";
export const ADD_TO_BAG_URL = "/api/v1/user-cart/add-to-cart";
export const GET_TEMPORARY_CART = "/api/v1/user-cart/tempo-cart";

export const DELETE_ITEMS = "/api/v1/user-cart/delete-items";
export const UPDATE_ITEM_QTY = "/api/v1/user-cart/update-quantity";

export const GET_FAVORITE_LIST = "/api/v1/favorite";
export const GET_DETAIL_FAVORITE_LIST = "/api/v1/favorite/list-detail";

export const ADD_FAVORITE_LIST = "/api/v1/favorite/add-to-favorite-list";
export const REMOVE_FAVORITE_LIST = "/api/v1/favorite";

export const GET_USER_INFO = "/api/v1/user/cus-info";
export const GET_USER_ADDRESS = "/api/v1/user/cus-address";
export const UPDATE_DEFAULT_ADDRESS = "/api/v1/user/cus-address/default";

export const CREATE_ORDER = "/api/v1/checkout/create-payment-session";
export const GET_ORDERS = "/api/v1/user/cus-orders";
export const RETRIEVE_ORDER = "/api/v1/orders/retrieve-order";

//reviews
export const ADD_MULTI_REVIEW = "/api/v1/reviews/create-multi-review";
export const ADD_COMMENT = "/api/v1/reviews/reply-review";

//admin
export const GET_ALL_ORDERS = "/api/v1/admin/orders";
export const CAPTURE_ORDER = "/api/v1/admin-order-mgt/capture";
export const CHANGE_ORDER_STATUS = "/api/v1/admin-order-mgt/status";
export const GET_USERS = "/api/v1/admin-users-mgt";
export const GET_ALL_USERS_INFO = "/api/v1/admin-users-mgt/all-info";
export const GET_ALL_PROMOTIONS = "api/v1/admin-promotions-mgt/get-promotions";
export const CREATE_PROMOTION = "api/v1/admin-promotions-mgt/create-promotions";
