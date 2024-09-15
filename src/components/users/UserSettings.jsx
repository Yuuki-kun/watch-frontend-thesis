import React from "react";
import usePrivateRequest from "../../hooks/usePrivateRequest";
import useAuth from "../../hooks/useAuth";

const UserSettings = () => {
  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { auth } = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setConfirmPassword(value);
    }
  };
  const axiosPrivate = usePrivateRequest();
  const handleSubmit = async (e) => {
    try {
      await axiosPrivate.post("/api/v1/user/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Đổi mật khẩu không thành công");
    }
  };

  const handleNewPassword = async (e) => {
    e.stopPropagation();
    try {
      await axiosPrivate.post(
        "/api/v1/user/forgot-password?email=" + auth.email
      );
      alert("Vui lòng kiểm tra email để lấy mật khẩu mới");
    } catch (err) {
      console.error(err);
      alert("Gửi yêu cầu không thành công");
    }
  };

  return (
    <div className="ui-content">
      <h5>Tài khoản của bạn</h5>
      <h6>Đổi mật khẩu</h6>
      <div className="w-50">
        <label htmlFor="" className="">
          Mật khẩu hiện tại:
        </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          className="form-control"
          onChange={handleChange}
          value={oldPassword}
          autoComplete="new-password"
        />
        <label htmlFor="" className="">
          Mật khẩu mới:
        </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          className="form-control"
          onChange={handleChange}
          value={newPassword}
          autoComplete="new-password"
        />
        <label htmlFor="" className="">
          Nhập lại mật khẩu mới:
        </label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="form-control"
          onChange={handleChange}
          value={confirmPassword}
          autoComplete="new-password"
        />
        <button
          className="mt-2"
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Đổi mật khẩu
        </button>
        <div className="line-container">
          <span className="line"></span>
        </div>
        <h5>Quên mật khẩu</h5>
        <h6>Nhận mật khẩu khôi phục qua email đăng ký?</h6>
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
          onClick={(e) => handleNewPassword(e)}
        >
          Gửi yêu cầu
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
