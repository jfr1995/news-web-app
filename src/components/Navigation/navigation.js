import React from "react";
import SignOutButton from "../SignOut/sign_out";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import { AuthUserContext } from "../Session/session";
import "../../css/style.css";

const Navigation = () => {
  return (
    <div className="navigation">
      <input
        className="navigation__checkbox"
        type="checkbox"
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <AuthUserContext.Consumer>
          {authUser =>
            authUser ? (
              <NavigationAuth authUser={authUser} />
            ) : (
              <NavigationNonAuth />
            )
          }
        </AuthUserContext.Consumer>
      </nav>
    </div>
  );
};
// authorized user navigation
const NavigationAuth = ({ authUser }) => {
  return (
    <ul className="navigation__list">
      <li className="navigation__item">
        <Link className="navigation__link" id="test1" to={ROUTES.LANDING}>
          Landing
        </Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__link" to={ROUTES.HOME}>
          Home
        </Link>
      </li>
      <li className="navigation__item">
        <Link className="navigation__link" to={ROUTES.ACCOUNT}>
          Account
        </Link>
      </li>

      {authUser.roles.includes(ROLES.ADMIN) && (
        <li className="navigation__item">
          <Link className="navigation__link" to={ROUTES.ADMIN}>
            Admin
          </Link>
        </li>
      )}

      <li className="navigation__item">
        <SignOutButton />
      </li>
    </ul>
  );
};

// non-authorized user navigation menu
const NavigationNonAuth = () => (
  <ul className="navigation__list">
    <li className="navigation__item">
      <Link className="navigation__link" to={ROUTES.LANDING}>
        Landing
      </Link>
    </li>
    <li className="navigation__item">
      <Link className="navigation__link" to={ROUTES.SIGN_IN}>
        Sign In
      </Link>
    </li>
  </ul>
);

export default Navigation;
