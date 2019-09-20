import React from "react";
import SignOutButton from "../SignOut/sign_out";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import { AuthUserContext } from "../Session/session";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

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

const linkStyles = makeStyles({
  root: {
    textDecoration: "none",
    textTransform: "uppercase"
  }
});
const NavigationNonAuth = () => {
  const test = linkStyles();
  return (
    <Box>
      <Box display="inline-flex" justifyContent="flex-start">
        <Link className={test.root} to={ROUTES.LANDING}>
          Landing
        </Link>
      </Box>
      <Box display="inline-flex" justifyContent="flex-end">
        <Link className={test.root} to={ROUTES.SIGN_IN}>
          Sign In
        </Link>
      </Box>
    </Box>
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
