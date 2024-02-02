import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div>
      UserLayout
      <Outlet />
    </div>
  );
};

export default UserLayout;
