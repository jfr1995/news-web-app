import React, { Fragment, Component } from "react";
import { SignInForm } from "../../SignIn/SignInForm";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
    this.setToggle = this.setToggle.bind(this);
  }
  setToggle = () => {
    const { toggle } = this.state;

    this.setState({ toggle: !toggle });
  };

  render() {
    const { toggle } = this.state;
    return (
      <Fragment>
        {toggle ? (
          <div>auth dialog</div>
        ) : (
          <SignInForm setToggle={this.setToggle} />
        )}
      </Fragment>
    );
  }
}
