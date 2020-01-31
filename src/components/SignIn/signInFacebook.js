import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core";
import * as ROUTES from "../../constants /routes";
import * as ERRORS from "../../constants /errorCodes";

const useStyles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    border: "none",
    backgroundColor: "#3b5998",
    color: "white",
    textTransform: "uppercase",
    padding: "10px",
    borderRadius: "5px"
  }
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
    const { classes } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <button className={classes.root} type="submit">
          <i className="fab fa-facebook fa-3x" />
        </button>

        {error && <p> {error.message}</p>}
      </form>
    );
  }
} // end of facebook base form

export const SignInFacebook = compose(
  withStyles(useStyles),
  withRouter,
  withFirebase
)(SignInFacebookBase);
