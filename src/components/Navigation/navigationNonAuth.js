import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase"
  },
  btn: {
    color: "white"
  }
}));

const NavigationNonAuth = () => {

  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.root}>&nbsp;</Typography>
          <Link to={ROUTES.SIGN_IN} className={classes.link} replace>
            <Button size="large" variant="text" className={classes.btn}>
              Sign In
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent"
      anchor="left"
      open={open}>

      </Drawer>
    </div>
  );
};

export default NavigationNonAuth;
