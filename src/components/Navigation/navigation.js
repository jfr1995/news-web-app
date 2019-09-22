// Logic imports
import React from "react";
import SignOutButton from "../SignOut/sign_out";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import { AuthUserContext } from "../Session/session";
import NavigationNonAuth from "./navigationNonAuth";
import NavigationAuth from "./navigationAuth";

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

export default Navigation;
