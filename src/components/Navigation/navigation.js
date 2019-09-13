import React from "react";
import SignOutButton from "../SignOut/sign_out";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants /routes";
import * as ROLES from "../../constants /roles";
import { AuthUserContext } from "../Session/session";

const Navigation = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth authUser={authUser} />
        ) : (
          <NavigationNonAuth />
        )
      }
    </AuthUserContext.Consumer>
  );
};

// const Navigation = () => {
//   return (
//     <div className="navigation">
//       <input
//         className="navigation__checkbox"
//         type="checkbox"
//         id="navi-toggle"
//       />
//       <label htmlFor="navi-toggle" className="navigation__button">
//         <span className="navigation__icon">&nbsp;</span>
//       </label>
//       <div className="navigation__background">&nbsp;</div>
//       <nav className="navigation__nav">
//         <AuthUserContext.Consumer>
//           {authUser =>
//             authUser ? (
//               <NavigationAuth authUser={authUser} />
//             ) : (
//               <NavigationNonAuth />
//             )
//           }
//         </AuthUserContext.Consumer>
//       </nav>
//     </div>
//   );
// };
// authorized user navigation
const NavigationAuth = ({ authUser }) => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>

      {authUser.roles.includes(ROLES.ADMIN) && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}

      <li>
        <SignOutButton />
      </li>
    </ul>
  );
};

const NavigationNonAuth = () => (
  <nav>
    <div className="nav-wrapper blue">
      <ul id="nav-mobile" className="right">
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
    </div>
  </nav>
);

// non-authorized user navigation menu
// const NavigationNonAuth = () => (
//   <ul>
//     <li>
//       <Link to={ROUTES.LANDING}>Landing</Link>
//     </li>
//     <li>
//       <Link className="waves-effect waves-light btn" to={ROUTES.SIGN_IN}>
//         Sign In
//       </Link>
//     </li>
//   </ul>
// );

export default Navigation;
