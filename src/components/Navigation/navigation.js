// conditional rendering for authenticated and non-authenticated user navigation bar
import React from "react";
import { AuthUserContext } from "../Session/session";
import NavBar from "./Util/NavBar";

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        //authUser ? <NavigationAuth authUser={authUser} /> : <Test />
        <NavBar authUser={authUser} />
      )}
    </AuthUserContext.Consumer>
  );
};

export default Navigation;
