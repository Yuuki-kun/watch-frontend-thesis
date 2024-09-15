import React from "react";
import TestPage from "../pages/TestPage";
import OverviewContent from "../components/users/OverviewContent";
import UserOrders from "../components/users/UserOrders";
// import ProductView from "../pages/products/ProductView";
const ActiveAccount = React.lazy(() => import("../pages/ActiveAccountPage"));
const Login = React.lazy(() => import("../components/login/Login"));
const Home = React.lazy(() => import("../pages/home/Home"));
const Register = React.lazy(() => import("../components/register/Register"));
const Register2 = React.lazy(() => import("../components/register/Register2"));
const User = React.lazy(() => import("../pages/users/User"));
const Favorite = React.lazy(() => import("../pages/favorite/Favorite"));
const DashBoard = React.lazy(() =>
  import("../components/admin/dashboard/DashBoard")
);
const Cart = React.lazy(() => import("../pages/cart/Cart"));
const Users = React.lazy(() => import("../components/admin/Users"));
const ProductView = React.lazy(() => import("../pages/products/ProductView"));
const Products = React.lazy(() => import("../pages/products/Products"));
const SearchProduct = React.lazy(() =>
  import("../pages/products/SearchProduct")
);
const CheckOut = React.lazy(() => import("../pages/checkout/CheckOut"));

const OrderManagement = React.lazy(() =>
  import("../components/admin/orders/OrderManagement")
);
const OrderDetails = React.lazy(() =>
  import("../components/admin/orders/OrderDetails")
);

const TrackingOrder = React.lazy(() =>
  import("../components/users/TrackingOrder")
);

const ProductManagement = React.lazy(() =>
  import("../components/admin/products/ProductManagement")
);

const getUserRelatedInfo = React.lazy(() =>
  import("../components/admin/UserRelatedInfo")
);

const Discount = React.lazy(() =>
  import("../components/admin/discount/Discount")
);

const AdminProductDetails = React.lazy(() =>
  import("../components/admin/products/ProductDetails")
);

const UserReviews = React.lazy(() => import("../components/users/UserReviews"));

const UserSettings = React.lazy(() =>
  import("../components/users/UserSettings")
);
const Brands = React.lazy(() => import("../components/admin/Brands"));
const ShippingRates = React.lazy(() =>
  import("../components/admin/ShippingRates")
);
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "test", component: TestPage },
  { path: "cart", component: Cart },
  { path: "products/:reference", component: ProductView },
  { path: "products-page", component: Products },
  { path: "search", component: SearchProduct },
];

export const publicRoutesNoLayout = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "register",
    component: Register,
  },
  {
    path: "register2",
    component: Register2,
  },
  { path: "active-account/:token", component: ActiveAccount },
];

export const userPrivateRoutes = [
  // { path: "user-info/*", component: UserInfoLayout },
  { path: "favorite", component: Favorite },
  { path: "checkout", component: CheckOut },
];
export const userInfoRoutes = [
  { path: "overview", component: OverviewContent },
  { path: "user-orders", component: UserOrders },
  { path: "user-orders/tracking/:id", component: TrackingOrder },
  { path: "comments", component: UserReviews },
  { path: "settings", component: UserSettings },
];

export const adminPrivateRoutes = [
  { path: "/", component: DashBoard },
  { path: "dashboard", component: DashBoard },
  { path: "orders", component: OrderManagement },
  { path: "products", component: ProductManagement },
  { path: "users", component: Users },
  { path: "transaction/details/:id", component: OrderDetails },
  { path: "users", component: Users },
  { path: "transaction/details/:id", component: OrderDetails },
  { path: "users/user-info/:id", component: getUserRelatedInfo },
  { path: "discounts", component: Discount },
  { path: "products/:reference", component: AdminProductDetails },
  { path: "brands", component: Brands },
  { path: "shipping-rates", component: ShippingRates },
];
