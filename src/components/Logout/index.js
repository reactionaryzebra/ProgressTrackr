import React from "react";
import { FirebaseContext } from "../Firebase";

const LogoutButton = () => (
  <FirebaseContext.Consumer>
    {firebase => (
      <button type="button" onClick={firebase.doLogout}>
        Logout
      </button>
    )}
  </FirebaseContext.Consumer>
);

export default LogoutButton;
