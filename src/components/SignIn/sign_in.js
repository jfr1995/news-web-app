import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/sign_up";
import * as ROUTES from "../../constants /routes";
import { PasswordForgetLink } from "../PasswordForget/password_forget";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

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
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
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
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });

    event.preventDefault();
  }; // end of onSubmit
  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In With Facebook </button>
        {error && <p> {error.message}</p>}
      </form>
    );
  }
} // end of facebook base form

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
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        this.setState({ error });
      });

    event.preventDefault();
  }; // end of on Submit

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In With Google </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  } // end of render
} // end of google base

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
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />

        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && error.message}
      </form>
    );
  }
}

// Recompose for sign in copmponents
const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase
)(SignInTwitterBase);

const SignInGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase
)(SignInFacebookBase);

const SignIn = () => {
  return (
    <div className="container row">
      <h2>Sign In Page</h2>
      <SignInForm />
      <SignInGoogle></SignInGoogle>
      <SignInFacebook></SignInFacebook>
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
export default SignIn;
