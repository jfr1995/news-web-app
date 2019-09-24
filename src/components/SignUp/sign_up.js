import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

// HOC to provide firebase context
import { withFirebase } from "../Firebase";
// so we can change routes after sign in/out procedure
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import Typography from "@material-ui/core/Typography";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign-in with one of them. Afterward, associate your accounts
  on your personal account page.
`;
const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  isAdmin: false,
  error: null
};

/*
  react component class for the sign up form. The state of the component is initialized by 
  our already defined object 'INITIAL_STATE'. 
*/

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  // function to create the user in firebase database
  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;
    const roles = [];
    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }
    // this.props.firebase is accessible via withFirebase method (HOC)
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database

        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

  onChangeCheckBox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
      isAdmin
    } = this.state;
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckBox}
          />
        </label>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p> {error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <Typography>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>SIGN UP</Link>
  </Typography>
);

/*

  Any component that goes in the withRouter() higher-order component gains access to all the properties of the router,
  so when passing the enhanced SignUpFormBase component to the withRouter() higher-order component, 
  it has access to the props of the router. 
 
 */
const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up page</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUp;

export { SignUpForm, SignUpLink };
