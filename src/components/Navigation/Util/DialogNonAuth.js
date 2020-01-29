import React, { Fragment, Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { toggle: false };
  }

  render() {
    const { toggle } = this.state;
    return (
      <Fragment>
        {toggle ? <Fragment>Sign In</Fragment> : <Fragment>Sign Up</Fragment>}
      </Fragment>
    );
  }
}
