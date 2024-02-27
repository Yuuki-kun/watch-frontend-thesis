import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginService } from "../../api/services/loginService";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  console.log(location.state);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [showpwd, setShowpwd] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response_data = await LoginService({ email, password });
      console.log(response_data);

      const accessToken = response_data?.access_token;
      const roles = response_data?.roles;
      const cartId = response_data?.cartId;
      const userId = response_data?.userId;

      setAuth({
        email,
        accessToken,
        roles,
        cartId,
        userId,
      });

      setEmail("");
      setpassword("");

      localStorage.setItem("refreshToken", response_data?.refresh_token);

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      if (!err?.response) {
        setErrMsg("No server response.");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing username or password.");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed!");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <div className="container regis-page-container">
        <div className="register-container d-block">
          <div className="regis-head">
            <h1>Đăng nhập TimeFlow</h1>
            <p>Welcome to us</p>
            <div className="regis-head-bottom-in-line"></div>
          </div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>
            {errMsg}
            <FontAwesomeIcon icon={faXmark} />
          </p>

          <form className="login-form" onSubmit={handSubmitLogin}>
            <div className="email-i-field">
              <label htmlFor="email" className="form-label">
                Email:{" "}
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                required
                className="form-control"
              />
            </div>

            <div className="password-i-field">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type={showpwd ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="off"
                required
                className="form-control"
              />

              <div
                className="showpwdlogin"
                onClick={() => setShowpwd(!showpwd)}
              >
                <FontAwesomeIcon
                  className={`showpwdlogin ${
                    password !== "" ? "show-eye" : "hide-eye"
                  }`}
                  icon={showpwd ? faEye : faEyeSlash}
                />
              </div>
            </div>
            <button className="login-btn">Sign In</button>
            <div className="persistCheck">
              <input
                type="checkbox"
                id="persist"
                onChange={togglePersist}
                checked={persist}
              />
              <label htmlFor="persist">Trust this device</label>
            </div>
          </form>
          <p>
            Need an account?
            <br />
            <span className="line">
              <Link to="/register">Sign Up</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
