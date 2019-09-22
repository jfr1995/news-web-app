import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import * as ROUTES from "../../constants /routes";
import * as ERRORS from "../../constants /errorCodes";

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  } // end of constructor

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        console.log(socialAuthUser);
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.user.email,
          roles: []
        });
      })
      .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERRORS.ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERRORS.ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });
    event.preventDefault();
  }; // end of twitter on submit
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In With Twitter</button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
} // end of twitter base

export const SignInTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitterBase);
