import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import usePrivateRequest from "../../hooks/usePrivateRequest";

const TestNav = () => {
  const { auth } = useAuth();
  const [showSideBar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const inputSearchRef = useRef();
  const userMenuRef = useRef();
  const userIconRef = useRef();
  // useEffect(() => {
  //   const search = document.querySelector(".search-container");
  //   if (showSearch) {
  //     search.classList.add("active-search");
  //     search.classList.remove("inactive-search");
  //   } else {
  //     search.classList.remove("active-search");
  //     search.classList.add("inactive-search");
  //   }

  //   const handleScroll = () => {
  //     console.log("Scrolled!");
  //     setShowSearch(false);
  //   };

  //   if (showSearch) {
  //     inputSearchRef.current.focus();
  //     window.addEventListener("scroll", handleScroll, { passive: true });
  //   } else {
  //     window.addEventListener("scroll", handleScroll, { passive: true });
  //   }

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [showSearch]);

  const [openDropdownUser, setOpenDropdownUser] = useState(false);
  const [mobileProductMenu, setMobileProductMenu] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // console.log(e.target);
      if (
        !userMenuRef.current.contains(e.target) &&
        !userIconRef.current.contains(e.target)
      ) {
        setOpenDropdownUser(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [setOpenDropdownUser]);

  window.addEventListener("scroll", function () {
    const fixed_nav = document.querySelector(".nav-s");
    fixed_nav?.classList?.toggle("active", window.scrollY > 75);

    const fixed_head_info = this.document.querySelector(".head-infor");
    fixed_head_info?.classList?.toggle("hide", this.window.scrollY > 75);

    const scrolled_search = document.querySelector(".search-container");
    scrolled_search?.classList?.toggle(
      "scrolled-search-active",
      window.scrollY > 40
    );

    if (showSearch) {
      setShowSearch(false);
    }
  });

  useEffect(() => {
    const search = document.querySelector(".search-container");

    if (showSearch) {
      inputSearchRef.current.focus();
      search.classList.add("active-search");
      search.classList.remove("inactive-search");
    } else {
      search.classList.remove("active-search");
      search.classList.add("inactive-search");
    }
  }, [showSearch]);
  console.log("auth=" + JSON.stringify(auth));

  const logout = useLogout();
  const signout = async () => {
    await logout();
  };
  const location = useLocation();

  const [cusName, setCusName] = useState(null);
  const [cusAvatar, setCusAvatar] = useState(null);

  const axiosPrivate = usePrivateRequest();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get(`/api/v1/user/name/${auth?.email}`);
        setCusName(res.data.fullName);
        setCusAvatar(res.data.avatar);
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (auth.email !== undefined) {
      fetchData(); // Gọi hàm async fetchData để lấy dữ liệu
    }
  }, [auth.email]);

  console.log(cusName);
  return (
    <>
      <nav className="nav-s">
        <ul className={`sideBar ${showSideBar ? "open" : "none"}`}>
          <li>
            <a href="#"> Blogs </a>
          </li>
          <li className="mobile-menu-container">
            <button
              className="mobileProductBtn"
              onClick={() => {
                setMobileProductMenu(!mobileProductMenu);
              }}
            >
              Products
            </button>
            <div
              className={`mobile-product-menu ${
                mobileProductMenu ? "active" : ""
              }`}
            >
              <p>a</p>
              <p>b</p>
              <p>c</p>
            </div>
          </li>

          <li>
            <a href="#"> About </a>
          </li>
          <li>
            <a href="#"> Forum </a>
          </li>
          <li>
            <a href="#"> Login </a>
          </li>
          <li>
            <input type="text" />
          </li>
        </ul>
        <ul>
          <li>
            <Link className="logo-link" to={"/"}>
              <img src="/logo512.png" alt="logo512" className="logo-home" />
            </Link>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Men </a>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Women </a>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Collection </a>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Blogs </a>
          </li>
          <li className="hide-on-mobile">
            <div className="h-100 product-link-container">
              <a className="product-link" href="#">
                Products
              </a>
              <div className="product-link-dropdown-content">
                <div>cate a</div>
                <div>cate b</div>
                <div>cate c</div>
                <div>cate d</div>
              </div>
            </div>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> About </a>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Forum </a>
          </li>
          <li
            className="hide-on-mobile"
            onClick={() => setShowSearch((prev) => !prev)}
          >
            <button>
              <IoSearch className="navbar-icon" />
            </button>
          </li>
          <li className="hide-on-mobile">
            <Link to={"cart"}>
              <AiOutlineShoppingCart className="navbar-icon" />
            </Link>
          </li>
          <li className="hide-on-mobile">
            <div className="menu-container h-100">
              <button
                ref={userIconRef}
                className="menu-trigger-user"
                onClick={() => setOpenDropdownUser(!openDropdownUser)}
              >
                {auth.email && cusAvatar !== null ? (
                  <img src={cusAvatar} alt="avt" className="user-avatar" />
                ) : (
                  <FaRegUser className="navbar-icon" />
                )}
              </button>
              <span>{cusName}</span>

              <div
                ref={userMenuRef}
                className={`dropdown-user-menu ${
                  openDropdownUser
                    ? "open-dropdown-user"
                    : "none-open-dropdown-user"
                }`}
              >
                <h3>
                  <span className="nav-user-email" style={{ fontSize: "1rem" }}>
                    {auth?.email}
                  </span>
                </h3>
                <ul className="dropdown-list">
                  {auth?.email ? (
                    <>
                      <li className="dropdown-item">
                        <Link to={"/user-info"}>Thông tin tài khoản</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to={"/favorite"}>Danh sách yêu thích</Link>
                      </li>
                      <li className="dropdown-item">
                        <button onClick={() => signout()}>logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="dropdown-item">
                        <Link to={"/login"} state={{ from: location }}>
                          Đăng nhập
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to={"/register"} state={{ from: location }}>
                          Đăng ký
                        </Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to={"/favorite"}>Danh sách yêu thích</Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </li>
          <li className={`menu-btn ${showSideBar ? "active" : "inactive"}`}>
            <button
              className="menu-trigger-btn"
              onClick={() => setShowSidebar((prev) => !prev)}
            >
              <FontAwesomeIcon icon={showSideBar ? faXmark : faBars} />
            </button>
          </li>
        </ul>
        <div className={`search-container`}>
          <div className="input-container">
            <input ref={inputSearchRef} type="text" />
          </div>
          <div className="recommend-category">
            recommend links
            <ul>
              <li>login</li>
              <li>a</li>
              <li>a</li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default TestNav;
