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

// authorized user navigation
// const NavigationAuth = ({ authUser }) => {
//   return (
//     <ul>
//       <li>
//         <Link to={ROUTES.LANDING}>Landing</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.HOME}>Home</Link>
//       </li>
//       <li>
//         <Link to={ROUTES.ACCOUNT}>Account</Link>
//       </li>

//       {authUser.roles.includes(ROLES.ADMIN) && (
//         <li>
//           <Link to={ROUTES.ADMIN}>Admin</Link>
//         </li>
//       )}

//       <li>
//         <SignOutButton />
//       </li>
//     </ul>
//   );
// };

const NavigationNonAuth = () => (
  <nav>
    <div className="nav-wrapper blue">
      <div className="container">
        <ul id="nav-mobile" className="right">
          <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
          </li>
          <li>
            <Link to={ROUTES.SIGN_IN}>Sign In</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

const NavigationAuth = ({ authUser }) => (
  <nav>
    <div className="nav-wrapper blue ">
      <div className="container">
        <ul id="nav-mobile blue" className="right">
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
      </div>
    </div>
  </nav>
);

export default Navigation;
