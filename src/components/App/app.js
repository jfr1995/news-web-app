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
import HomePage from "../Home/home";
import AccountPage from "../Account/account";
import AdminPage from "../Admin/admin";
import TopHeadlines from "../Categories/TopHeadlines";
import Categories from "../Categories/Categories";
import Technology from "../Categories/Technology";
import Search from "../Search/search";
// include styling

const App = () => {
  return (
    <div>
      <Router>
        <Navigation />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
        <Route path={ROUTES.TOP_HEADLINES} component={TopHeadlines} />
        <Route path={ROUTES.TECHNOLOGY} component={Technology} />
        <Route path={ROUTES.BUSINESS} component={TopHeadlines} />
        <Route path={ROUTES.SCIENCE} component={TopHeadlines} />
        <Route path={ROUTES.SPORTS} component={TopHeadlines} />
        <Route path={ROUTES.ENTERTAINMNENT} component={TopHeadlines} />
      </Router>
    </div>
  );
};

export default withAuthentication(App);
