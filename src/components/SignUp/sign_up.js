import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";
import Container from "@material-ui/core/Container";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import indogo from "@material-ui/core/colors/indigo";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";

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
      <Box boxShadow="" bgcolor={grey[200]} borderRadius="5px" p={5}>
        <form onSubmit={this.onSubmit}>
          <Grid spacing={2} direction="column" container>
            <Grid item>
              <TextField
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                label="Full Name"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                label="Email Address"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                label="Password"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                bgcolor="primary"
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                label="Confirm Password"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <label id="checkbox-container">
                Admin:
                <Checkbox
                  color="primary"
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={this.onChangeCheckBox}
                />
              </label>
            </Grid>

            <Button
              size="large"
              variant="contained"
              disabled={isInvalid}
              type="submit"
            >
              Sign Up
            </Button>
          </Grid>
        </form>
      </Box>
    );
  }
}
const containerStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
    height: "500px"
  },
  header: {
    margin: "50px",
    textTransform: "uppercase"
  }
}));
const linkStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    color: indogo[500],
    textTransform: "uppercase",
    fontWeight: "bold"
  }
}));
const SignUpLink = () => {
  const classes = linkStyles();
  return (
    <Typography>
      Don't have an account?{" "}
      <Link className={classes.link} to={ROUTES.SIGN_UP}>
        SIGN UP
      </Link>
    </Typography>
  );
};

/*

  Any component that goes in the withRouter() higher-order component gains access to all the properties of the router,
  so when passing the enhanced SignUpFormBase component to the withRouter() higher-order component, 
  it has access to the props of the router. 
 
 */
const SignUpForm = compose(withRouter, withFirebase)(SignUpFormBase);

const SignUp = () => {
  const classes = containerStyles();
  return (
    <Container className={classes.root}>
      <h1 className={classes.header}>Sign Up</h1>
      <SignUpForm />
    </Container>
  );
};

export default SignUp;

export { SignUpForm, SignUpLink };
