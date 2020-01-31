import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import * as ROUTES from "../../constants /routes";
import * as ERRORS from "../../constants /errorCodes";
import { withStyles } from "@material-ui/core";

const useStyles = theme => ({
  root: {
    width: "100%",
    height: "100%",
    border: "none",
    backgroundColor: "#dd4b39",
    color: "white",
    textTransform: "uppercase",
    padding: "10px",
    borderRadius: "5px"
  }
});

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }; // end of constructor
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too

        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
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
  }; // end of on Submit

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.onSubmit}>
        <button className={classes.root} type="submit">
          <i className="fab fa-google fa-3x" />
        </button>
      </form>
    );
  } // end of render
} // end of google base

export const SignInGoogle = compose(
  withStyles(useStyles),
  withRouter,
  withFirebase
)(SignInGoogleBase);
