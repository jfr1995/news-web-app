import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import { compose } from "recompose";
import * as ROUTES from "../../constants /routes";
import * as ERRORS from "../../constants /errorCodes";
import TextField from "@material-ui/core/TextField";
import { styled, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import { palette } from "@material-ui/system";
import grey from "@material-ui/core/colors/grey";

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

const ContainerGrid = styled(Grid)({
  flexDirection: "column",
  alignContent: "center",
  width: "100%"
});

const ItemGrid = styled(Grid)({
  width: "100%"
});

const SignInTextField = styled(TextField)({
  width: "100%"
});

const SignInButton = styled(Button)({
  width: "50%",
  marginTop: "1rem"
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
      <FormControl fullWidth={true} onSubmit={this.onSubmit}>
        <ContainerGrid>
          <ItemGrid item>
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
          </ItemGrid>
          <ItemGrid item>
            <SignInTextField
              margin="normal"
              variant="outlined"
              label="password"
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              placeholder="Password"
            />
          </ItemGrid>
          <ItemGrid align="center" item>
            <SignInButton
              color="primary"
              size="large"
              variant="outlined"
              disabled={isInvalid}
              type="submit"
            >
              Sign In
            </SignInButton>
          </ItemGrid>
        </ContainerGrid>
      </FormControl>
    );
  }
}

export const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);
