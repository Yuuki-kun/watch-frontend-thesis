import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaBars } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { IoSearch } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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

    const scrolled_search = document.querySelector(".search-container");
    scrolled_search?.classList?.toggle(
      "scrolled-search-active",
      window.scrollY > 40
    );
    console.log("scrolllllllllll");

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
  console.log(auth?.email);
  return (
    <>
      <nav className="nav-s">
        <ul className={`sideBar ${showSideBar ? "open" : "none"}`}>
          <li>
            <a href="#"> Blogs </a>
          </li>
          <li>
            <a href="#"> Products </a>
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
            <Link className="logo-link">
              <img src="/logo512.png" alt="logo512" className="logo-home" />
            </Link>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Home </a>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Blogs </a>
          </li>
          <li className="hide-on-mobile">
            <a href="#"> Products </a>
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
            <a href="#">
              <AiOutlineShoppingCart className="navbar-icon" />
            </a>
          </li>
          <li className="hide-on-mobile">
            <div className="menu-container h-100">
              <button
                ref={userIconRef}
                className="menu-trigger-user"
                onClick={() => setOpenDropdownUser(!openDropdownUser)}
              >
                <FaRegUser className="navbar-icon" />
              </button>
              <div
                ref={userMenuRef}
                className={`dropdown-menu ${
                  openDropdownUser
                    ? "open-dropdown-user"
                    : "none-open-dropdown-user"
                }`}
              >
                <h3>
                  Test dropdown <span>tcm</span>
                </h3>
                <ul className="dropdown-list">
                  {auth?.email ? (
                    <>
                      <li className="dropdown-item">
                        <p>item 1</p>
                      </li>
                      <li className="dropdown-item">
                        <p>item 1</p>
                      </li>
                      <li className="dropdown-item">
                        <p>item 1</p>
                      </li>
                      <li className="dropdown-item">
                        <p>item 1</p>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="dropdown-item">
                        <Link to={"login"}>login</Link>
                      </li>
                      <li className="dropdown-item">
                        <Link to={"register"}>register</Link>
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
      </nav>
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
    </>
  );
};
export default TestNav;
