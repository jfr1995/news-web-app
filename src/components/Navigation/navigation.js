// conditional rendering for authenticated and non-authenticated user navigation bar
import React from "react";
import { AuthUserContext } from "../Session/session";
import NavigationAuth from "./navigationAuth";
import NavBar from "./navBar";
import NavNonAuthItems from "./navNonAuthItems";
import Test from "./Test/TestNav";

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : <NavBar />
      }
    </AuthUserContext.Consumer>
  );
};

export default Navigation;
