import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const UserLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default UserLayout;
