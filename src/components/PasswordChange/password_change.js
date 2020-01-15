import React, { Component } from "react";
import { withFirebase } from "../Firebase/index";

const INITIAL_STATE = {
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class PasswordChangeFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }; // end of on change

  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        // this.state = { ...INITIAL_STATE };
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }; // end of on submit

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = passwordOne === "" || passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="passwordOne"
          type="password"
          onChange={this.onChange}
          value={this.state.passwordOne}
          placeholder="New Password"
        />
        <input
          name="passwordTwo"
          type="password"
          onChange={this.onChange}
          value={this.state.passwordTwo}
          placeholder="Confirm password"
        />
        <button type="submit" disabled={isInvalid}>
          Change Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
} // end of PasswordChangeFormBase Class

const PasswordChangeForm = withFirebase(PasswordChangeFormBase);

export default PasswordChangeForm;
