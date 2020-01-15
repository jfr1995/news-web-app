// include abstract
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import { withAuthentication } from "../Session/session";
//include componenets
import Navigation from "../Navigation/navigation";
import SignInPage from "../SignIn/sign_in";
import SignUpPage from "../SignUp/sign_up";
import PasswordForgetPage from "../PasswordForget/password_forget";
import AccountPage from "../Account/account";
import AdminPage from "../Admin/admin";
import Landing from "../Landing/landing";

// include styling

const App = () => {
  return (
    <div>
      <Router>
        <Navigation />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </Router>
    </div>
  );
};

export default withAuthentication(App);
