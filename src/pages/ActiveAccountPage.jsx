import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const ActiveAccountPage = () => {
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { token } = useParams();
  console.info(token);

  const { auth, setAuth, persist, setPersist } = useAuth();

  useEffect(() => {
    const active = async () => {
      try {
        const response = await axios.get("/api/v1/authentication/confirm", {
          params: {
            token: token,
          },
        });
        console.log(response.data);

        setAuth({
          email: response?.data?.email,
          accessToken: response?.data?.access_token,
          roles: response?.data?.roles,
          cartId: response?.data?.cartId,
          userId: response?.data?.userId,
        });

        localStorage.setItem("refreshToken", response?.data?.refresh_token);
        localStorage.setItem("persist", true);
        setPersist(true);
        setSuccess(true);
        // navigate(from, { replace: true });
      } catch (err) {
        console.error(err);
        if (!err?.response) {
          //   setErrMsg("No server response.");
        } else if (err.response?.status === 400) {
          //   setErrMsg("Missing username or password.");
        } else if (err.response?.status === 401) {
          //   setErrMsg("Unauthorized");
        } else {
          //   setErrMsg("Login Failed!");
        }
        // errRef.current.focus();
      }
    };
    active();
  }, []);

  return (
    <>
      {success ? (
        <Navigate to={localStorage.getItem("from") || "/"} replace />
      ) : (
        <div>Active Page</div>
      )}
    </>
  );
};

export default ActiveAccountPage;
