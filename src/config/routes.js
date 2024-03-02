import React from "react";
import TestPage from "../pages/TestPage";
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

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "test", component: TestPage },
  { path: "cart", component: Cart },
  { path: "products/:reference", component: ProductView },
];

export const publicRoutesNoLayout = [
  {
    path: "login",
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
  { path: "user-info", component: User },
  { path: "favorite", component: Favorite },
];

export const adminPrivateRoutes = [
  { path: "", component: DashBoard },
  { path: "db", component: DashBoard },
  { path: "users", component: Users },
];
