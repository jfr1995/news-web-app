import React from "react";
import AuthUserContext from "./context";
import { withFirebase } from "../Firebase/index";

const needsEmailVerification = authUser => {
  return (
    authUser &&
    !authUser.emailVerified &&
    authUser.providerData
      .map(provider => provider.providerId)
      .includes("password")
  );
};

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isSent: false
      };
    } // end of constructor
    onSendEmailVerification = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true }));
    }; // end of on send email verifivation
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                {this.state.isSent ? (
                  <p>
                    E-mail Confirmation sent: Check your emails (spam folder
                    included) for a confirmation Email. Refresh this page once
                    you have confirmed you email.
                  </p>
                ) : (
                  <p>
                    Verify your E-Mail: Check you E-Mails (Spam folder included)
                    for a confirmation E-Mail or send another confirmation
                    E-Mail.
                  </p>
                )}
                <button
                  type="button"
                  onClick={this.onSendEmailVerification}
                  disabled={this.state.isSent}
                >
                  Send confirmation E-Mail
                </button>
              </div>
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    } // end of render method
    //////////////////////                        SEPORATOR             /////////////////////////////////////////
  } // end of WithEmailVerification Class
  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;
