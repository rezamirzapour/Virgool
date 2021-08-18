import {
  Avatar,
  Paper,
  Box,
  Grid,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { authRoutes as routes } from "routes";
import { Route, Switch } from "react-router-dom";
import { Copyright } from './components'

export default function AuthLayout() {
  const classes = useStyles();
  return (
    <Grid container component="main" className={classes.root} justify={'center'}>
      <Grid item xs={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Switch>
            {routes.map(({ path, exact, component }) => <Route key={path as string} path={path} exact={exact} component={component} />)}
          </Switch>
          <Box mt={5}>
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
}



const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    alignItems: 'center'
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
