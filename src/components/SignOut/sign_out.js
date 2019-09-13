import React from "react";
import { withFirebase } from "../Firebase/index";

const SignOutButton = ({ firebase }) => {
  return (
    <button
      className="btn btn__white"
      type="button"
      onClick={firebase.doSignOut}
    >
      Sign Out
    </button>
  );
};

export default withFirebase(SignOutButton);
