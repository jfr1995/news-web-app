import React, { Component, Fragment } from "react";
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import PersistentDrawer from "./Drawer";
import Dialog from "@material-ui/core/Dialog";
import Fab from "@material-ui/core/Fab";
import Settings from "@material-ui/icons/Settings";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants /routes";
import { withStyles } from "@material-ui/core";
import useStyles from "./NavBar.styles";

export default withStyles(useStyles)(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        drawerOpen: false,
        dialogOpen: false
      };
      this.toggleDrawer = this.toggleDrawer.bind(this);
      this.toggleDialog = this.toggleDialog.bind(this);
    }

    toggleDrawer = () => {
      const { drawerOpen } = this.state;
      this.setState({
        drawerOpen: !drawerOpen
      });
    };
    toggleDialog = () => {
      const { dialogOpen } = this.state;
      this.setState({
        dialogOpen: !dialogOpen
      });
    };
    render() {
      const { drawerOpen, dialogOpen } = this.state;

      const { authUser, classes } = this.props;
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: drawerOpen
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.toggleDrawer}
                className={clsx(classes.menuButton, drawerOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Link to={ROUTES.LANDING} className={classes.title}>
                <Typography variant="h6" noWrap>
                  Home
                </Typography>
              </Link>

              <Fab onClick={this.toggleDialog}>
                <Settings />
              </Fab>
              <Dialog
                classes={{ paper: classes.Paper }}
                open={dialogOpen}
                onClose={this.toggleDialog}
              >
                <DialogTitle>With Auth</DialogTitle>
              </Dialog>
            </Toolbar>
          </AppBar>
          <PersistentDrawer isOpen={drawerOpen} onClose={this.toggleDrawer} />
        </div>
      );
    }
  }
);
