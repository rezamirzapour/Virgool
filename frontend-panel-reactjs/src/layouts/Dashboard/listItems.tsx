import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Home as HomeIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import items from "./items";

export default function Menu() {
  const classes = useStyle();
  return (
    <List>
      <Link className={classes.link} to={"/"} key={"-1"}>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="خانه" />
        </ListItem>
      </Link>
      {items.map((item, index) => (
        <Link
          className={classes.link}
          to={(item.path as string) ?? "/"}
          key={index}
        >
          <ListItem button>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

const useStyle = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
  },
}));
