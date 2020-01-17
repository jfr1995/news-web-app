import React, { Component, Fragment } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      dialogOpen: false
    };
    this.setDrawerOpen = this.setDrawerOpen.bind(this);
    //    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.setDialogOpen = this.setDialogOpen.bind(this);
    //    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  setDrawerOpen = () => {
    const { drawerOpen } = this.state;
    this.setState({
      drawerOpen: !drawerOpen
    });
  };

  setDialogOpen = () => {
    const { dialogOpen } = this.state;
    this.setState({
      dialogOpen: !dialogOpen
    });
  };

  render() {
    const { authUser } = this.props;
    return <Fragment>{authUser ? <h1>test</h1> : <h1>test2</h1>}</Fragment>;
  }
}
