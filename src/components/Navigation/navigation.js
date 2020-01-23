// conditional rendering for authenticated and non-authenticated user navigation bar
import React from "react";
import NavBar from "./Util/NavBar";
import { topics } from "../../constants /constants";
import { AuthUserContext } from "../Session/session";

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => <NavBar authUser={authUser} topics={topics} />}
    </AuthUserContext.Consumer>
  );
};

export default Navigation;
