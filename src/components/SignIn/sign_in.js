import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import { SignUpLink } from "../SignUp/sign_up";
import * as ROUTES from "../../constants /routes";
import { PasswordForgetLink } from "../PasswordForget/password_forget";
import Grid from "@material-ui/core/Grid";
import { styled, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { SignInTwitter } from "./signInTwitter";
import { SignInGoogle } from "./signInGoogle";
import { SignInFacebook } from "./signInFacebook";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const SignInGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column"
});

const SignInTextField = styled(TextField)({
  width: "100%",
  height: "70%"
});

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
        <SignInGrid container>
          <Grid item xs={12}>
            <SignInTextField
              margin="normal"
              variant="outlined"
              label="email"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </Grid>
          <Grid item>
            <TextField
              margin="normal"
              variant="outlined"
              label="password"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </Grid>
          <Grid item>
            <Button disabled={isInvalid} type="submit">
              Sign In
            </Button>
          </Grid>
          {error && error.message}
        </SignInGrid>
      </form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const gridStyles = makeStyles(theme => ({
  root: {
    marginTop: "10px",
    border: "1px solid red",
    flexDirection: "column",
    justifyContent: "center"
  },
  item: {
    margin: "10px",
    alignSelf: "center"
  },
  container: {
    margin: "auto"
  }
}));

const SignIn = () => {
  const classes = gridStyles();
  return (
    <React.Fragment>
      <Container>
        <Grid className={classes.root} container>
          <Grid className={classes.item} item>
            <SignInForm />
          </Grid>
          <Grid className={classes.item} item>
            <SignInGoogle></SignInGoogle>
          </Grid>
          <Grid className={classes.item} item>
            <SignInFacebook></SignInFacebook>
          </Grid>
          <Grid className={classes.item} item>
            <PasswordForgetLink />
          </Grid>
          <Grid className={classes.item} item>
            <SignUpLink />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
export default SignIn;
