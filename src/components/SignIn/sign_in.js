import React from "react";
import { SignUpLink } from "../SignUp/sign_up";
import { PasswordForgetLink } from "../PasswordForget/password_forget";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { SignInTwitter } from "./signInTwitter";
import { SignInGoogle } from "./signInGoogle";
import { SignInFacebook } from "./signInFacebook";
import { SignInForm } from "./signInForm";
import Divider from "@material-ui/core/Divider";
import Fade from "@material-ui/core/Fade";

const gridStyles = makeStyles(theme => ({
  grid: {
    flexDirection: "column",
    maxWidth: "40%",
    margin: "20vh auto"
  },
  grid2: {
    justifyContent: "center"
  },
  item: {
    margin: "10px",
    width: "100%"
  },

  container: {
    padding: "5rem 20rem"
  }
}));

const SignIn = () => {
  const classes = gridStyles();
  return (
    <Fade in={true} timeout={500}>
      <Grid className={classes.grid} container>
        <Grid className={classes.item} item>
          <SignInForm />
        </Grid>
        <Divider className={classes.item} />
        <Grid className={classes.item} item>
          <Grid className={classes.grid2} container>
            <Grid item>
              <SignInGoogle />
            </Grid>
            <Grid item>
              <SignInFacebook />
            </Grid>
          </Grid>
        </Grid>
        <Grid align="center" className={classes.item} item>
          <PasswordForgetLink />
        </Grid>
        <Grid align="center" className={classes.item} item>
          <SignUpLink />
        </Grid>
      </Grid>
    </Fade>
  );
};

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
export default SignIn;
