import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { AuthUserContext } from "../Session/session";
import * as ROUTES from "../../constants /routes";

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => {
          this.props.history.push(ROUTES.SIGN_IN);
        }
      );
    } // end of component did mount

    componentWillUnmount() {
      this.listener();
    } // end of component will unmount

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    } // end of render
  } // end of WithAuthorization

  return compose(
    withRouter,
    withFirebase
  )(WithAuthorization);
}; // end of withAuthorization

export default withAuthorization;
