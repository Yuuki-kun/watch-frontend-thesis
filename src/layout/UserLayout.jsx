import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "./Footer";
// import { Footer } from "antd/es/layout/layout";
const UserLayout = () => {
  // Created by B2012113 - Tong Cong Minh

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      {/* <Footer style={{ textAlign: "center" }}>
        <div>
          <a href=" ">Terms and Conditions</a>
          <span> | </span>
          <a href=" ">Privacy Policy</a>
          <span> | </span>
          <a href=" ">Contact Us</a>
          <span> | </span>
          <a href=" ">About Us</a>
        </div>
      </Footer> */}
    </div>
  );
};

export default UserLayout;
