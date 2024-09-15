import React, { useEffect, useState } from "react";
import "./user.css";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import useAuth from "../../hooks/useAuth";
import MenuOption from "../../components/users/MenuOption";
import { FaRegUser, FaRegBell } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { BiCommentEdit } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";

import { Outlet } from "react-router-dom";

const User = () => {
  const [cusName, setCusName] = useState(null);
  const axiosPrivate = usePrivateRequest();
  const { auth } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(`/api/v1/user/name/${auth?.email}`);
        setCusName(res.data.fullName);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.email !== undefined) {
      fetchData(); // Gọi hàm async fetchData để lấy dữ liệu
    }
  }, [auth.mail]);

  const [selected, setSelected] = useState("overview");
  console.log("??????");
  return (
    <section>
      <div className="user-info-container container">
        <div className="left-menu">
          <div className="us-customer-name">
            Xin chào, <span className="cus-name">{cusName}!</span>
          </div>
          <MenuOption
            caption={"Tổng Quan"}
            content={"Tổng Quan"}
            optionKey={"overview"}
            selected={selected}
            setSelected={setSelected}
            icon={<FaRegUser size={17} />}
          />

          <MenuOption
            caption={"Quản Lý Đơn Hàng"}
            content={"Danh Sách Đơn Hàng"}
            optionKey={"user-orders"}
            selected={selected}
            setSelected={setSelected}
            icon={<FiBox size={17} />}
          />
          {/* <MenuOption
            caption={"Đánh Giá"}
            content={"Đánh Giá Sản Phẩm"}
            optionKey={"reviews"}
            selected={selected}
            setSelected={setSelected}
            icon={<BiCommentEdit size={17} />}
          /> */}
          <MenuOption
            content={"Nhận Xét Của Tôi"}
            optionKey={"comments"}
            selected={selected}
            setSelected={setSelected}
            icon={<IoNewspaperOutline size={17} />}
          />

          {/* <MenuOption
            caption={"Sản Phẩm Yêu Thích"}
            content={"Danh Sách Yêu Thích"}
            // optionKey={"favorite"}
            selected={selected}
            setSelected={setSelected}
            icon={<GoHeart size={17} />}
          
          /> */}
          <MenuOption
            caption={"Cài Đặt"}
            content={"Tài Khoản"}
            optionKey={"settings"}
            selected={selected}
            setSelected={setSelected}
            icon={<IoMdSettings size={17} />}
          />

          <button className="option-button logout">Đăng Xuất</button>
        </div>
        <div className="right-content">
          {/* {selected === "overview" && <OverviewContent />}
          {selected === 2 && <OverviewContent />}
          {selected === "orders" && <UserOrders />}
          {selected === 4 && <OverviewContent />}
          {selected === 5 && <OverviewContent />} */}
          {/* <UserInfoSelected selected={selected} /> */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default User;
