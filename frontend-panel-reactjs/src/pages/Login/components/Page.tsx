import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import { Box } from "@mui/material";

// ----------------------------------------------------------------------

interface IProps {
  title: string;
}

const Page: React.FC<IProps> = forwardRef(
  ({ children, title = "", ...other }, ref) => (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  )
);

export default Page;
