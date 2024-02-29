import React, { useEffect, useRef, useState } from "react";
import { RegisterService } from "../../api/services/registerService";
import { EMAIL_REGEX, NAME_REGEX, PWD_REGEX } from "../../config/regex";
import "./register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import SockJS from "sockjs-client";
const Register = () => {
  const refresh = useRefreshToken();

  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "USER",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const signUpRefBtn = useRef();

  const firstNameRef = useRef();
  const errorRef = useRef();

  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [validFirstName, setValidFirstName] = useState(false);
  const [fnameFocus, setFNameFocus] = useState(false);

  const [validLastName, setValidLastName] = useState(false);
  const [lnameFocus, setLNameFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    firstNameRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(registerUser.email);
    setValidEmail(result);
  }, [registerUser.email]);

  useEffect(() => {
    const result = PWD_REGEX.test(registerUser.password);
    setValidPassword(result);
    const match = registerUser.password === matchPwd;
    setValidMatch(match);

    if ((registerUser.password && !result) || result) {
      document.getElementById("valid-pwd")?.classList.remove("hint-hide");
    }
    if (
      !registerUser.password ||
      (registerUser.password && registerUser.password === "")
    ) {
      document.getElementById("valid-pwd")?.classList.add("hint-hide");
    }

    if ((matchPwd && !match) || match) {
      document.getElementById("valid-match")?.classList.remove("hint-hide");
    }
    if (!matchPwd || (matchPwd && matchPwd === "")) {
      document.getElementById("valid-match")?.classList.add("hint-hide");
    }
  }, [registerUser.password, matchPwd]);

  useEffect(() => {
    const result = NAME_REGEX.test(registerUser.firstName);
    setValidFirstName(result);
  }, [registerUser.firstName]);

  useEffect(() => {
    const result = NAME_REGEX.test(registerUser.lastName);
    setValidLastName(result);
  }, [registerUser.lastName]);

  useEffect(() => {
    setErrMsg("");
  }, [registerUser, matchPwd]);

  const [showPwd, setShowPwd] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

  const handleToggle = (stateSetter) => {
    stateSetter((prevState) => !prevState);
  };

  const { auth, setAuth } = useAuth();

  //register
  const register = async (e) => {
    console.log("resu=" + registerUser);
    setStartListener(true);
    e.preventDefault();
    setAuth({});
    try {
      const response_data = await RegisterService(registerUser);
      console.log(response_data);

      handleAuthAndLocalStorage(response_data, setAuth);

      // setRegisterUser({
      //   firstName: "",
      //   lastName: "",
      //   email: "",
      //   password: "",
      //   role: "USER",
      // });

      // setSuccess(true);

      setErrMsg(
        // "Registration success, please check out your email to active your account!"
        "Registration success!"
      );
      errorRef.current.focus();
    } catch (error) {
      handleRegistrationErrors(error, setErrMsg, errorRef);
    }
    console.log(errMsg);
  };

  const handleRegistrationErrors = (error, setErrMsg, errorRef) => {
    if (!error?.response) {
      setErrMsg("No server response");
    } else if (error.response?.status === 409) {
      setErrMsg(error.response.data.message);
    } else {
      setErrMsg("Registration failed");
    }
    if (errorRef.current) {
      errorRef.current.focus();
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleAuthAndLocalStorage = (response_data, setAuth) => {
    setAuth({
      email: registerUser.email,
      role: response_data?.roles,
      accessToken: response_data?.access_token,
      userId: response_data?.userId,
      cartId: response_data?.cartId,
    });

    localStorage.setItem("refreshToken", response_data?.refresh_token);
    setSuccess(true);
  };
  //register

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  console.log("from=" + from);

  const [localStorageValue, setLocalStorageValue] = useState(
    localStorage.getItem("refreshToken")
  );

  const [startListener, setStartListener] = useState(false);

  // useEffect(() => {
  //   if (startListener) {
  //     localStorage.setItem("from", from);
  //     //set some user's prev info
  //     const intervalId = setInterval(() => {
  //       const newValue = localStorage.getItem("refreshToken");
  //       console.log("waiting");
  //       if (newValue !== localStorageValue) {
  //         // window.close();
  //       }
  //     }, 1000);
  //     const stopInterval = setTimeout(() => {
  //       clearInterval(intervalId);
  //     }, 15 * 60 * 1000);
  //     return () => {
  //       clearInterval(intervalId);
  //       clearTimeout(stopInterval);
  //     };
  //   }
  // }, [startListener, localStorageValue]);

  const refreshTokenAsynFunc = async () => {
    try {
      await refresh();
      setSuccess(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (success) {
      console.log("success");
      navigate(from, { replace: true });
    }
  }, [success]);
  console.log(startListener);
  console.log(localStorageValue);

  return (
    <>
      {success ? (
        // <Navigate to={from} replace />
        <div>success</div>
      ) : (
        <div className="container regis-page-container">
          <div className="register-container">
            <div className="regis-head">
              <h1>Đăng ký TimeFlow</h1>
              <p>Welcome to us</p>
              <div className="regis-head-bottom-in-line"></div>
            </div>
            <p ref={errorRef} className={errMsg ? "errmsg" : "offscreen"}>
              {errMsg}
              <FontAwesomeIcon icon={faXmark} />
            </p>

            <form onSubmit={register} className="register-form">
              <div className="name-input-container">
                <div className="input-container">
                  <label htmlFor="firstName" className="form-label">
                    First Name:
                  </label>
                  <span className="span-input">
                    <input
                      ref={firstNameRef}
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={registerUser.firstName}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      aria-invalid={validFirstName ? "false" : "true"}
                      onFocus={() => setFNameFocus(true)}
                      onBlur={() => setFNameFocus(false)}
                      className={
                        registerUser.firstName && !validFirstName
                          ? "form-control active"
                          : "form-control"
                      }
                    />
                    <div className="hint-container">
                      <span
                        id="valid-fname"
                        className={
                          registerUser.firstName && validFirstName
                            ? "valid"
                            : "in-valid"
                        }
                      >
                        {registerUser.firstName && (
                          <FontAwesomeIcon
                            icon={
                              validFirstName ? faCircleCheck : faCircleXmark
                            }
                          />
                        )}
                      </span>
                    </div>
                  </span>
                  <p
                    id="fnamenote"
                    className={
                      registerUser.firstName && !validFirstName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    Invalid name
                  </p>
                </div>
                <div className="input-container">
                  <label htmlFor="lastName" className="form-label">
                    Last Name:
                  </label>
                  <span className="span-input">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={registerUser.lastName}
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      aria-invalid={validLastName ? "false" : "true"}
                      aria-describedby="lnamenote"
                      onFocus={() => setLNameFocus(true)}
                      onBlur={() => setLNameFocus(false)}
                      className={
                        registerUser.lastName && !validLastName
                          ? "form-control active"
                          : "form-control"
                      }
                    />
                    <div className="hint-container">
                      <span
                        id="valid-lastname"
                        className={
                          registerUser.lastName && validLastName
                            ? "valid"
                            : "in-valid"
                        }
                      >
                        {registerUser.lastName && (
                          <FontAwesomeIcon
                            icon={validLastName ? faCircleCheck : faCircleXmark}
                          />
                        )}
                      </span>
                    </div>
                  </span>
                  <p
                    id="lnamenote"
                    className={
                      registerUser.lastName && !validLastName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    Invalid name
                  </p>
                </div>
              </div>

              <div className="input-container">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <span className="span-input">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={registerUser.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="eidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className={
                      registerUser.email && !validEmail
                        ? "form-control active"
                        : "form-control"
                    }
                  />
                  <div className="hint-container">
                    <span
                      id="valid-email"
                      className={
                        registerUser.email && validEmail ? "valid" : "in-valid"
                      }
                    >
                      {registerUser.email && (
                        <FontAwesomeIcon
                          icon={validEmail ? faCircleCheck : faCircleXmark}
                        />
                      )}
                    </span>
                  </div>
                </span>
                <p
                  id="eidnote"
                  className={
                    registerUser.email && !validEmail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  4 to 24 characters. Must begin with a letter. Letters,
                  numbers, underscores, hyphens allowed.
                </p>
              </div>

              <div className="input-container">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number:
                </label>
                <span className="span-input">
                  <input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={registerUser.phoneNumber}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                    // aria-invalid={validEmail ? "false" : "true"}
                    // aria-describedby="eidnote"
                    // onFocus={() => setEmailFocus(true)}
                    // onBlur={() => setEmailFocus(false)}
                    // className={
                    //   registerUser.email && !validEmail
                    //     ? "form-control active"
                    //     : "form-control"
                    // }
                    className="form-control"
                  />
                </span>
              </div>

              <div className="input-container">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <span className="span-input">
                  <input
                    type={showPwd ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    value={registerUser.password}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className={
                      registerUser.password && !validPassword
                        ? "form-control active"
                        : "form-control"
                    }
                  />
                  <div className="hint-container">
                    <div
                      className="password-eye"
                      onClick={() => handleToggle(setShowPwd)}
                    >
                      {registerUser.password && (
                        <FontAwesomeIcon icon={showPwd ? faEye : faEyeSlash} />
                      )}
                    </div>
                    <span
                      id="valid-pwd"
                      className={
                        registerUser.password && validPassword
                          ? "valid"
                          : "in-valid"
                      }
                    >
                      {registerUser.password && (
                        <FontAwesomeIcon
                          icon={validPassword ? faCircleCheck : faCircleXmark}
                        />
                      )}
                    </span>
                  </div>
                </span>
                <p
                  id="pwdnote"
                  className={
                    registerUser.password && !validPassword
                      ? "instructions active"
                      : "offscreen"
                  }
                >
                  8 to 24 characters. Must include uppercase and lowercase
                  letters, a number and a special character. Allowed special
                  characters:
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </div>

              <div className="input-container">
                <label htmlFor="matchPwd" className="form-label">
                  Confirm Password:
                </label>
                <span className="span-input">
                  <input
                    type={showMatch ? "text" : "password"}
                    name="matchPwd"
                    id="matchPwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby={
                      matchPwd && !validMatch
                        ? "confirmnote-pwd"
                        : "confirmnote"
                    }
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className={
                      matchPwd
                        ? validMatch && validPassword
                          ? "form-control"
                          : "form-control active"
                        : "form-control"
                    }
                  />
                  <div className="hint-container">
                    <div
                      className="password-eye"
                      onClick={() => handleToggle(setShowMatch)}
                    >
                      {matchPwd && (
                        <FontAwesomeIcon
                          icon={showMatch ? faEye : faEyeSlash}
                        />
                      )}
                    </div>
                    <span
                      id="valid-match"
                      className={
                        matchPwd && validMatch && validPassword
                          ? "valid"
                          : "in-valid"
                      }
                    >
                      {matchPwd && (
                        <FontAwesomeIcon
                          icon={
                            validMatch && validPassword
                              ? faCircleCheck
                              : faCircleXmark
                          }
                        />
                      )}
                    </span>
                  </div>
                </span>
                <div className="matchPwdContainer">
                  <p
                    id="confirmnote"
                    className={
                      matchPwd && !validMatch
                        ? "instructions"
                        : "offscreen confirmnote"
                    }
                  >
                    Must match the first password input field.
                  </p>
                  <p
                    id="confirmnote-pwd"
                    className={
                      matchPwd && !validPassword ? "instructions" : "offscreen"
                    }
                  >
                    Password above does not valid.
                  </p>
                </div>
              </div>

              <div className="signup-btn-container">
                <button
                  className="sign-up-btn"
                  disabled={
                    !validFirstName ||
                    !validLastName ||
                    !validEmail ||
                    !validPassword ||
                    !validMatch
                      ? true
                      : false
                  }
                  ref={signUpRefBtn}
                >
                  Sign up
                </button>
                {!validFirstName ||
                !validLastName ||
                !validEmail ||
                !validPassword ||
                !validMatch ? (
                  <FontAwesomeIcon icon={faBan} className="banned-icon" />
                ) : null}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Register;
