import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AppBar from "./AppBar";

export default function Dashboard() {
  const classes = useStyles();
  const naviage = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (!token) naviage("auth/login");
  // }, [location, naviage]);

  return (
    <div className={classes.root}>
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid className={classes.container}>
          <Outlet />
        </Grid>
      </main>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    height: "100vh",
  },
}));
