import React from "react";
import { withFirebase } from "../Firebase";
import { withRouter } from "react-router-dom";

const LogoutButtonBase = ({ firebase, history }) => (
  <button
    type="button"
    onClick={() => {
      firebase.doLogout();
      history.push("/");
    }}
  >
    Logout
  </button>
);

const LogoutButton = withFirebase(withRouter(LogoutButtonBase));

export default LogoutButton;
