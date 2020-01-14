import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import PersistentDrawer from "./Drawer";

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
  hide: { display: "none" }
}));

export default props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <IconButton
            color="secondary"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu Title
          </Typography>
        </Toolbar>
      </AppBar>
      <PersistentDrawer isOpen={open} handleClose={handleDrawerClose} />
    </div>
  );
};

/*
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexGrow: 1
  }
}));

const NavBar = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>{props.children}</Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;


*/
