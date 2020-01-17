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
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import Settings from "@material-ui/icons/Settings";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import { DialogContent } from "@material-ui/core";

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

export default props => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: drawerOpen })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, drawerOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Link to={ROUTES.LANDING} className={classes.title}>
            <Typography variant="h6" noWrap>
              Home
            </Typography>
          </Link>

          <Fab onClick={handleDialogOpen}>
            <Settings />
          </Fab>
          <Dialog
            classes={{ paper: classes.Paper }}
            open={dialogOpen}
            onClose={handleDialogClose}
          >
            <DialogTitle>Test</DialogTitle>
            <DialogContent>
              <form />
            </DialogContent>
          </Dialog>
        </Toolbar>
      </AppBar>
      <PersistentDrawer isOpen={drawerOpen} handleClose={handleDrawerClose} />
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
