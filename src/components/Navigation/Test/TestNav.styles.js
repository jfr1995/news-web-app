import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  root: { display: "flex" },
  appBar: {
    // closed app bar, create a transition on the width and margin on the app bar for an animated drawer closing
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    // styles for when the drawer is open
    // reduce the width of the drawer
    width: `calc(100% - ${drawerWidth}px)`,
    // move the drawer to the left
    marginLeft: drawerWidth,
    // create transition on width and margin for animated drawer opening
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: { marginRight: theme.spacing(2) },
  hide: { display: "none" },
  title: {
    flexGrow: 1,
    color: "inherit",
    textDecoration: "none",
    textTransform: "uppercase"
  },
  Paper: {
    minWidth: 500,
    height: 650
  }
}));

export default useStyles;
