import React, { Fragment, Component } from "react";
import { SignInForm } from "../../SignIn/SignInForm";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }

  render() {
    const { toggle } = this.state;
    return <Fragment>{toggle ? <SignInForm /> : <SignInForm />}</Fragment>;
  }
}
