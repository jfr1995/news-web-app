import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import { styled } from "@material-ui/core/styles";
import * as ROUTES from "../../constants /routes";
import * as ERRORS from "../../constants /errorCodes";
import Button from "@material-ui/core/Button";

const FacebookButton = styled(Button)({
  margin: "20px",
  borderRadius: "50%",
  height: "60px",
  width: "60px",
  backgroundColor: "#3b5998",
  color: "white"
});

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
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
  }; // end of onSubmit
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <FacebookButton variant="contained" type="submit">
          <i className="fab fa-facebook-f fa-2x"></i>{" "}
        </FacebookButton>
        {error && <p> {error.message}</p>}
      </form>
    );
  }
} // end of facebook base form

export const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);
