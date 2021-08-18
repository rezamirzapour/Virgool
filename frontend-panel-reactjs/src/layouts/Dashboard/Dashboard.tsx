import { ElementType } from 'react'
import { Switch } from "react-router-dom";
import { Route } from 'components'
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Grid } from "@material-ui/core";
import { useRouter } from 'hooks';
import AppBar from "./AppBar";
import { useDispatch } from 'react-redux'
import { dashboardRoutes as routes } from "routes";

export default function Dashboard() {
  const classes = useStyles();
  const { navigate } = useRouter()
  const dispatch = useDispatch()
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid className={classes.container}>
          <Switch>
            {routes.map((route, i) => (
              <Route key={i} render={routeProps => {
                const Component = route.component as ElementType;
                if (route.auth) {
                  const token = localStorage.getItem("access_token")
                  if (token) {
                    dispatch({ type: "auth/saveToken", payload: token })
                    return <Component {...routeProps} />
                  }
                  else
                    navigate("auth.login")
                  return ""
                }
              }} {...route} />
            ))}
          </Switch>
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
  },
}));
