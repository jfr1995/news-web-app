import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import * as ROUTES from "../../constants /routes";

const useStyles = makeStyles(theme => ({
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

const NavNonAuthItems = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default NavNonAuthItems;
