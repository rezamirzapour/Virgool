import React from "react";
import { useMediaQuery } from "@mui/material";

const MHidden: React.FC<any> = ({ width, children }) => {
  const breakpoint = width.substring(0, 2);

  const hiddenUp = useMediaQuery((theme: any) =>
    theme.breakpoints.up(breakpoint)
  );
  const hiddenDown = useMediaQuery((theme: any) =>
    theme.breakpoints.down(breakpoint)
  );

  if (width.includes("Down")) {
    return hiddenDown ? null : children;
  }

  if (width.includes("Up")) {
    return hiddenUp ? null : children;
  }

  return null;
};

export default MHidden;
