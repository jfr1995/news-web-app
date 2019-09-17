import React from "react";
import SignOutButton from "../SignOut/sign_out";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import { AuthUserContext } from "../Session/session";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 33
  },
  menuButton: {
    marginRight: theme.spacing(20)
  },
  title: {
    flexGrow: 44
  }
}));

const handleSignIn = () => {
  console.log("handle sign in invoked");
};

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  );
};

const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" onClick={handleSignIn}>
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationAuth = ({ authUser }) => (
  <nav>
    <div className="nav-wrapper blue ">
      <div className="container">
        <ul>
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
          </li>

          {authUser.roles.includes(ROLES.ADMIN) && (
            <li>
              <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
          )}

          <li>
            <SignOutButton />
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
