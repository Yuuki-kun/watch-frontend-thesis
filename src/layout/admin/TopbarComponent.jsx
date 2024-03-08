import { Box, IconButton, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import React, { useContext } from "react";
import { ColorModeContext, tokens } from "./theme";
import "./layout-style.css";
const TopbarComponent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <div className="al-admin-topbar-container">
      <div className="al-user-container">
        <div className="al-user-avatar-container">
          <img
            src="https://www.w3schools.com/w3images/avatar2.png"
            alt="Avatar"
            className="img-fluid al-user-avatar"
          />
        </div>
        <div className="al-user-info-container">
          <div className="al-user-name">
            <h5>John Doe</h5>
          </div>
          <div className="al-user-role">Admin</div>
        </div>
      </div>
      <div
        className="al-center-search-container"
        style={{ backgroundColor: `${colors.primary[400]}` }}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </div>

      <div className="al-button-container">
        <IconButton
          type="button"
          sx={{ p: 1 }}
          onClick={colorMode.toggleColorMode}
        >
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: 1 }}>
          <PersonOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default TopbarComponent;
