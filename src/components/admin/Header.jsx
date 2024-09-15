import { Typography, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../layout/admin/theme";

const Header = ({ title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <div className="admin-section-header">
      <Typography
        variant="h3"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      {/* <Typography>
        <span style={{ color: colors.grey[300] }}>Dashboard</span> / {title}
      </Typography> */}
    </div>
  );
};

export default Header;
