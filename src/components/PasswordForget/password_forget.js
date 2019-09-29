import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants /routes";
import { makeStyles, TextField, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/styles";
import FormControl from "@material-ui/core/FormControl";
import Fade from "@material-ui/core/Fade";
const FormContainerGrid = styled(Grid)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
});

const FormContainerItem = styled(Grid)({
  margin: "50px"
});

const FormTextField = styled(TextField)({
  minWidth: "25rem"
});

const INITIAL_STATE = { email: "", error: null };
// Base component from password forget page
class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;
    const isInvalid = email === "";
    return (
      <FormControl onSubmit={this.onSubmit}>
        <FormContainerGrid container>
          <FormContainerItem item>
            <FormTextField
              label="Email"
              variant="filled"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
              type="text"
              placeholder="Email Address"
            />
          </FormContainerItem>
          <FormContainerItem item>
            <Button
              variant="contained"
              color="primary"
              disabled={isInvalid}
              type="submit"
            >
              Reset My Password
            </Button>
          </FormContainerItem>
        </FormContainerGrid>
        {error && <p>{error.message}</p>}
      </FormControl>
    );
  }
}

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
// Password forget page
const pageStyles = makeStyles(theme => ({
  test: {
    flexDirection: "column",
    marginTop: "20vh",
    alignItems: "center"
  },
  text: {
    textTransform: "uppercase",
    margin: "50px auto",
    fontWeight: "bold"
  }
}));

const PasswordForgetPage = () => {
  const classes = pageStyles();
  return (
    <Fade in={true} timeout={500}>
      <Grid className={classes.test} container>
        <Grid item>
          <Typography className={classes.text} variant="h4">
            password reset
          </Typography>
        </Grid>

        <Grid item>
          <PasswordForgetForm />
        </Grid>
      </Grid>
    </Fade>
  );
};

// Password forget link

const linkStyles = makeStyles(theme => ({
  link: {
    textDecoration: "none",
    textTransform: "uppercase"
  }
}));

const PasswordForgetLink = () => {
  const classes = linkStyles();
  return (
    <Link className={classes.link} to={ROUTES.PASSWORD_FORGET}>
      <Button size="small" variant="outlined" color="primary">
        forgot password?
      </Button>
    </Link>
  );
};

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
