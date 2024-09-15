import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ImageSearchOutlinedIcon from "@mui/icons-material/ImageSearchOutlined";
import Collections from "./Collections";
const TestNav = () => {
  const { auth } = useAuth();
  const [showSideBar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
  const navigate = useNavigate();

  const goSearch = () => {
    navigate(`/products-page?type=search&query=${searchValue}`);
    setShowSearch(false);
  };
  const [openCollection, setOpenCollection] = useState(false);
  return (
    <>
      <nav
        className="user-nav nav-s"
        style={{ backgroundColor: "#f8f8f8 !important" }}
      >
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
            <Link to={"/products-page?type=fetch&cate=men&size=20&page=0"}>
              {" "}
              Men{" "}
            </Link>
          </li>
          <li className="hide-on-mobile">
            <Link to={"/products-page?type=fetch&cate=women&size=20&page=0"}>
              Women{" "}
            </Link>
          </li>
          <li
            className="hide-on-mobile"
            // style={{ position: "relative" }}
          >
            <a
              onMouseEnter={() => setOpenCollection(true)}
              // onMouseLeave={() => setOpenCollection(false)}
              href="#"
            >
              {" "}
              Collection{" "}
            </a>
            <div
              className="product-collections-dropdown-container"
              style={{
                width: `100%`,
                height: `${openCollection ? "600%" : "0"}`,
                position: "absolute",
                top: "100%",
                left: "0%",
                backgroundColor: "#fff",
                transition: "height 0.2s ease",
                zIndex: "1000 !important",
                overflowY: "scroll",
                boxShadow: "0px 5px 7px 2px rgba(0,0,0,0.1)",
                borderBottom: "1px solid #f7f7f7",
              }}
              onMouseLeave={() => setOpenCollection(false)}
            >
              <Collections />
            </div>
          </li>

          <li className="hide-on-mobile">
            <div className="h-100 product-link-container">
              <Link
                className="product-link"
                to={"/products-page?type=fetch&cate=none&size=20&page=0"}
              >
                Products
              </Link>
              {/* <div className="product-link-dropdown-content">
                <div>cate a</div>
                <div>cate b</div>
                <div>cate c</div>
                <div>cate d</div>
              </div> */}
            </div>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> About </a>
          </li>
          <li className="hide-on-mobile text-danger">
            <a style={{ color: "red" }} href="#">
              {" "}
              Sale{" "}
            </a>
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
                style={{
                  borderRadius: "20%",
                  padding: "0px !important",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100% !important",
                }}
              >
                {auth.email && cusAvatar !== null ? (
                  <img
                    src={`http://localhost:8080/image/fileSystem/avatar/${cusAvatar}`}
                    alt="avt"
                    className="user-avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "cover",
                      maxWidth: "40px",
                    }}
                  />
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
                        <Link to={"/user-info/overview"}>
                          Thông tin tài khoản
                        </Link>
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
            <input
              ref={inputSearchRef}
              type="text"
              placeholder="Bạn cần tìm kiếm gì?"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="search-string-btn" onClick={() => goSearch()}>
              <SearchOutlinedIcon />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default TestNav;
