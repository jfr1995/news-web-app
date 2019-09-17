import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session/session";

const Home = () => <React.Fragment>Home Page</React.Fragment>;
const condition = user => !!user;

export default compose(
  withAuthorization(condition),
  withEmailVerification
)(Home);
