// Logic imports
import React from "react";
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
