// Logic imports
import React from "react";
import { AuthUserContext } from "../Session/session";
import NavigationAuth from "./navigationAuth";
import NavBar from "./navBar";
import NavNonAuthItems from "./navNonAuthItems";

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavBar>
            <NavNonAuthItems />
          </NavBar>
        )
      }
    </AuthUserContext.Consumer>
  );
};

export default Navigation;
