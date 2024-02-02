import React from "react";
import useLogout from "../hooks/useLogout";
import { Link } from "react-router-dom";

const Home = () => {
  const logout = useLogout();
  const signout = async () => {
    await logout();
  };
  return (
    <div>
      <Link to="/admin">Go to the Admin page</Link>
      <Link to="/register">Go to the Register page</Link>
      Home
      <div className="flexGrow">
        <button onClick={signout}>Sign Out</button>
      </div>
    </div>
  );
};

export default Home;
