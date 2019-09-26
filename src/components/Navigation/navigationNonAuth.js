import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";

// MUI imports
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    position: "static"
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase"
  },
  btn: {
    color: "white"
  }
}));

// wrap links in button
const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Link to={ROUTES.LANDING} className={classes.link}>
            <Button size="large" variant="text" className={classes.btn}>
              About
            </Button>
          </Link>
          <Typography className={classes.root}>&nbsp;</Typography>
          <Link to={ROUTES.SIGN_IN} className={classes.link} replace>
            <Button size="large" variant="text" className={classes.btn}>
              Sign In
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationNonAuth;
