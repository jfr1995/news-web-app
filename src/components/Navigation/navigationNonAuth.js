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
    flexGrow: 1,
    padding: "20px"
  },
  appBar: {
    position: "static",
    background: "transparent",
    boxShadow: "none"
  },
  link: {
    textDecoration: "none",
    textTransform: "uppercase"
  },
  btn: {}
}));

// wrap links in button
const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Link to={ROUTES.LANDING} className={classes.link}>
            <Button size="large" variant="contained" color="primary">
              About
            </Button>
          </Link>
          <Typography className={classes.root}>&nbsp;</Typography>
          <Link to={ROUTES.SIGN_IN} className={classes.link}>
            <Button size="large" variant="contained" color="primary">
              Sign In
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavigationNonAuth;
