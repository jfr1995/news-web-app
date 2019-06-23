import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session/session";

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <p>The Home Page is accessible by every signed in user.</p>
    </div>
  );
};
const condition = user => !!user;

export default compose(
  withAuthorization(condition),
  withEmailVerification
)(Home);
