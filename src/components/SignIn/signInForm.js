import React, { Component } from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SignInFacebook } from "./SignInFacebook";
import { SignInGoogle } from "./SignInGoogle";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import { withStyles } from "@material-ui/core";
import * as ROUTES from "../../constants /routes";
import useStyles from "./Util/SignInForm.styles";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.itemBtn}>
          <SignInGoogle />
        </div>
        <div className={classes.itemBtn}>
          <SignInFacebook />
        </div>

        <DialogTitle>Login</DialogTitle>
        <form onSubmit={this.onSubmit}>
          <input
            label="Email"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            label="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input disabled={isInvalid} type="submit" value="Login" />
        </form>
      </div>
    );
  }
}

export const SignInForm = compose(
  withStyles(useStyles),
  withRouter,
  withFirebase
)(SignInFormBase);
