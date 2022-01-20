import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  ButtonGroup,
  Button,
} from "@material-ui/core";
import { ChevronLeft as ChevronLeftIcon } from "@material-ui/icons";
import MenuList from "./ListItems";
import {
  Menu as MenuIcon,
  PowerSettingsNew as PowerOffIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { useAuth } from "hooks";

const drawerWidth = 240;

export default function Appbar() {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const { logout, getLoginedUser } = useAuth();
  const user = getLoginedUser();
  const classes = useStyles();
  return (
    <>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon className={classes.menuIcon} />
          </IconButton>
          <ButtonGroup
            style={{ color: "white", borderColor: "white" }}
            aria-label="outlined button group"
            size="small"
          >
            <Button className={classes.button}>{`${user?.firstName ?? ""} ${
              user?.lastName ?? ""
            }`}</Button>
            <Button className={classes.button} onClick={logout}>
              <PowerOffIcon />
            </Button>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <MenuList />
        <Divider />
      </Drawer>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  appBar: {
    backgroundColor: "#1976d2",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuIcon: {
    color: "white",
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  button: {
    color: "white",
    borderColor: "white",
  },
}));
