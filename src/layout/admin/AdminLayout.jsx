import React from "react";
import { Outlet } from "react-router-dom";
import TopbarComponent from "./TopbarComponent";
import SidebarComponent from "./SidebarComponent";
import { ColorModeContext, useMode } from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

const AdminLayout = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="admin-app">
          <SidebarComponent />
          <main className="content">
            <TopbarComponent />
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default AdminLayout;
