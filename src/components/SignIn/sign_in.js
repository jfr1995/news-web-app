import React from "react";
import { SignUpLink } from "../SignUp/sign_up";
import { PasswordForgetLink } from "../PasswordForget/password_forget";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { SignInTwitter } from "./signInTwitter";
import { SignInGoogle } from "./signInGoogle";
import { SignInFacebook } from "./signInFacebook";
import { SignInForm } from "./signInForm";
import Divider from "@material-ui/core/Divider";
import Blue from "@material-ui/core/colors/indigo";
const gridStyles = makeStyles(theme => ({
  grid: {
    flexDirection: "column"
  },
  item: {
    margin: "10px",
    width: "100%"
  },
  container: {
    padding: "10px 20rem"
  }
}));

const SignIn = () => {
  const classes = gridStyles();
  return (
    <Container fixed className={classes.container}>
      <Grid className={classes.grid} container>
        <Grid className={classes.item} item>
          <SignInForm />
        </Grid>
        <Divider className={classes.item} />
        <Grid className={classes.item} item>
          <SignInGoogle />
        </Grid>
        <Grid className={classes.item} item>
          <SignInFacebook />
        </Grid>
        <Grid className={classes.item} item>
          <PasswordForgetLink />
        </Grid>
        <Grid className={classes.item} item>
          <SignUpLink />
        </Grid>
      </Grid>
    </Container>
  );
};

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
export default SignIn;
