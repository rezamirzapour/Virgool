import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset, ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ['"IRANSans"', '"Yekan"', '"Shabnam"', '"VazirWeb"'].join(","),
  },
  palette: {
    primary: { main: "#1976d2" },
  },
});

const RTLProvider: React.FC = ({ children }) => {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StylesProvider>
  );
};
export default RTLProvider;
