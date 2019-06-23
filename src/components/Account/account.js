import React, { Component } from "react";
import PasswordChangeForm from "../PasswordChange/password_change";
import { compose } from "recompose";
import { PasswordForgetForm } from "../PasswordForget/password_forget";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from "../Session/session";
import { withFirebase } from "../Firebase/index";

// array of sign in methods so that we can check if user has a certain sign in method enabled
// this allows the user to enable/disable a sign in method
const SIGN_IN_METHODS = [
  {
    id: "password",
    provider: null
  },
  {
    id: "google.com",
    provider: "googleProvider"
  },
  {
    id: "facebook.com",
    provider: "facebookProvider"
  }
];

class DefaultLoginToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOne: "",
      passwordTwo: ""
    };
  } // end of constructor

  onSubmit = event => {
    this.props.onLink(this.state.passwordOne);
    this.setState({ passwordOne: "", passwordTwo: "" });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { onlyOneLeft, isEnabled, method, onUnlink } = this.props;
    const { passwordOne, passwordTwo } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === "";
    return isEnabled ? (
      <button
        type="button"
        onClick={() => onUnlink(method.id)}
        disabled={onlyOneLeft}
      >
        Deactivate
      </button>
    ) : (
      <form onSubmit={this.onSubmit}>
        {" "}
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />{" "}
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Link {method.id}
        </button>
      </form>
    );
  } // end of render (DeafultLoginToggle)
}

const SocialLoginToggle = ({
  onlyOneLeft,
  isEnabled,
  method,
  onLink,
  onUnlink
}) => {
  return isEnabled ? (
    <button
      type="button"
      onClick={() => {
        onUnlink(method.id);
      }}
      disabled={onlyOneLeft}
    >
      Deactivate
    </button>
  ) : (
    <button
      type="button"
      onClick={() => {
        onLink(method.provider);
      }}
    >
      Link: {method.id}
    </button>
  );
};

////////////////////////////// LOGIN MANAGEMENT BASE  ///////////////////////////////////////
class LoginManagementBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSignInMethods: [],
      error: null
    };
  } // end of constructor

  componentDidMount() {
    this.fetchSignInMethods();
  } // end of component did mount

  fetchSignInMethods = () => {
    this.props.firebase.auth
      .fetchSignInMethodsForEmail(this.props.authUser.email)
      .then(activeSignInMethods =>
        this.setState({ activeSignInMethods, error: null })
      )
      .catch(error => this.setState({ error }));
  };

  onSocialLoginLink = provider => {
    this.props.firebase.auth.currentUser
      .linkWithPopup(this.props.firebase[provider])
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onUnlink = providerId => {
    this.props.firebase.auth.currentUser
      .unlink(providerId)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  onDefaultLoginLink = password => {
    console.log(this.props.firebase.emailAuthProvider);
    const credential = this.props.firebase.emailAuthProvider.credential(
      this.props.authUser.email,
      password
    );
    this.props.firebase.auth.currentUser
      .linkAndRetrieveDataWithCredential(credential)
      .then(this.fetchSignInMethods)
      .catch(error => this.setState({ error }));
  };

  render() {
    const { activeSignInMethods, error } = this.state;
    return (
      <div>
        Sign In Methods:
        <ul>
          {SIGN_IN_METHODS.map(method => {
            const onlyOneLeft = activeSignInMethods.length === 1;
            const isEnabled = activeSignInMethods.includes(method.id);
            return (
              <li key={method.id}>
                {method.id === "password" ? (
                  <DefaultLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    method={method}
                    onLink={this.onDefaultLoginLink}
                    onUnlink={this.onUnlink}
                  />
                ) : (
                  <SocialLoginToggle
                    onlyOneLeft={onlyOneLeft}
                    isEnabled={isEnabled}
                    method={method}
                    onLink={this.onSocialLoginLink}
                    onUnlink={this.onUnlink}
                  />
                )}
              </li>
            );
          })}
        </ul>
        {error && error.message}
      </div>
    );
  } // end of render
}

////////////////////////////// LOGIN MANAGEMENT BASE          END  ///////////////////////////////////////

const LoginManagement = withFirebase(LoginManagementBase);

const Account = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <h1>Account: {authUser.email}</h1>
          <PasswordForgetForm />
          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = user => !!user;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(Account);
