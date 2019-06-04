import React from "react";
import { withFirebase } from "../Firebase";

const LogoutButtonBase = ({ firebase }) => (
  <button type="button" onClick={firebase.doLogout}>
    Logout
  </button>
);

const LogoutButton = withFirebase(LogoutButtonBase);

export default LogoutButton;
