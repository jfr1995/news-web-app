import React from "react";
import SignOutButton from "../SignOut/sign_out";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import { AuthUserContext } from "../Session/session";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";

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

const navStyles = makeStyles({
  link: {
    textDecoration: "none",
    textTransform: "uppercase"
  },
  appB: {
    boxShadow: "none"
  }
});
const NavigationNonAuth = () => {
  const navStyle = navStyles();
  return (
    <div>
      <AppBar className={navStyle.appB} color="transparent" position="static">
        <Toolbar color="inherit">
          <Link className={navStyle.link} to={ROUTES.LANDING}>
            <Button m={10}>Landing</Button>
          </Link>
          <Link className={navStyle.link} to={ROUTES.SIGN_IN}>
            <Button>Sign In</Button>
          </Link>
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
