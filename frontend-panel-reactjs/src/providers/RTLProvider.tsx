import { ReactNode } from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  createTheme,
} from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

interface IProps {
  children: ReactNode;
}
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: ['"IRANSans"', '"Yekan"', '"Shabnam"', '"VazirWeb"'].join(","),
  },
  overrides: {
    MuiCssBaseline: {},
  },
  palette: {
    primary: { main: "#1976d2" },
  },
});

export default function RTLProvider({ children }: IProps) {
  return (
    <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StylesProvider>
  );
}
