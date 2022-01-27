import { Tooltip } from "@mui/material";
import { withStyles } from "@mui/styles";
export default withStyles(() => ({
  arrow: {
    color: "#40455b",
  },
  tooltip: {
    backgroundColor: "#40455b",
    color: "#f7f7f9",
    fontSize: 14,
  },
}))(Tooltip);
