import React from "react";
import { Box } from "@mui/material";

interface IProps {
  sx?: Object;
}

const Logo: React.FC<IProps> = ({ sx }) => {
  return (
    <Box
      component="img"
      src="/static/logo.svg"
      sx={{ width: 40, height: 40, ...sx }}
    />
  );
};
export default Logo;
