import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import * as ROUTES from "../../constants /routes";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

// const ContainerGrid = styled(Grid)({
//   flexDirection: "column",
//   alignContent: "center",
//   width: "100%"
// });

// const ItemGrid = styled(Grid)({
//   width: "100%"
// });

// const SignInTextField = styled(TextField)({
//   width: "100%"
// });

// const SignInButton = styled(Button)({
//   width: "50%",
//   marginTop: "1rem"
// });

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
        Login
      </form>
    );
  }
}

export const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
