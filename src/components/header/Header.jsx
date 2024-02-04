import NavigationBar from "./Navigationbar";
import TestNav from "./TestNav";
import "./header.css";
const Header = () => {
  return (
    <>
      <header className="header-container">
        <div className="head-infor container d-flex justify-content-between mt-2">
          <p>@tongcongminh - b2012113</p>
          <p>+ (84) 787878787878</p>
        </div>
        <TestNav />
      </header>
    </>
  );
};

export default Header;
