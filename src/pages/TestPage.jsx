import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TestPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const gotoregister = () => {
    navigate("/register", { state: { from: location }, replace: false });
  };

  const [count, setcount] = useState(0);

  console.log(count);
  return (
    <div>
      <button onClick={gotoregister}>go to register</button>
      <p>{count}</p>
      <Link to={"/"}>go to home</Link>

      <button onClick={() => setcount(count + 1)}>count</button>
    </div>
  );
};

export default TestPage;
