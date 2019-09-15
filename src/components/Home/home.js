import React from "react";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session/session";
import { AuthUserContext } from "../Session/session";

// const HomeNonAuth = () => <p>test non auth</p>;

// const HomeAuth = () => (
//   <React.Fragment>
//     <p>Home auth rendered</p>
//   </React.Fragment>
// );

// const Home = () => (
//   <AuthUserContext.Consumer>
//     {authUser => (authUser ? <HomeAuth /> : <HomeNonAuth />)}
//   </AuthUserContext.Consumer>
// );

const Home = () => (
  <div className="row">
    <div className="col s12">
      <ul className="tabs">
        <li className="tab col s3">
          <a href="#test1">Test 1</a>
        </li>
        <li className="tab col s3">
          <a className="active" href="#test2">
            Test 2
          </a>
        </li>
        <li className="tab col s3 disabled">
          <a href="#test3">Disabled Tab</a>
        </li>
        <li className="tab col s3">
          <a href="#test4">Test 4</a>
        </li>
      </ul>
    </div>
    <div id="test1" className="col s12">
      Test 1
    </div>
    <div id="test2" className="col s12">
      Test 2
    </div>
    <div id="test3" className="col s12">
      Test 3
    </div>
    <div id="test4" className="col s12">
      Test 4
    </div>
  </div>
);
const condition = user => !!user;

export default compose(
  withAuthorization(condition),
  withEmailVerification
)(Home);
