import React from "react";
import TestPage from "../pages/TestPage";

const Login = React.lazy(() => import("../components/login/Login"));
const Home = React.lazy(() => import("../pages/Home"));
const Register = React.lazy(() => import("../components/register/Register"));
const Register2 = React.lazy(() => import("../components/register/Register2"));
const UserInfo = React.lazy(() => import("../components/user-info/UserInfo"));
const DashBoard = React.lazy(() =>
  import("../components/admin/dashboard/DashBoard")
);
const Users = React.lazy(() => import("../components/admin/Users"));

export const publicRoutes = [
  { path: "/", component: Home },
  { path: "test", component: TestPage },
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
];

export const userPrivateRoutes = [{ path: "user-info", component: UserInfo }];

export const adminPrivateRoutes = [
  { path: "", component: DashBoard },
  { path: "db", component: DashBoard },
  { path: "users", component: Users },
];
