import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const gotoregister = () => {
    navigate("/register", { state: { from: location }, replace: true });
  };
  return (
    <div>
      <button onClick={gotoregister}>go to register</button>
      <Link to={"/"}>go to home</Link>
    </div>
  );
};

export default TestPage;
