import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "../NavBar";
import RegistrationPage from "../Registration";
import LoginPage from "../Login";

import * as ROUTES from "../../constants/routes";

const App = () => (
  <Router>
    <NavBar />

    <Route exact path={ROUTES.REGISTER} component={RegistrationPage} />
    <Route exact path={ROUTES.LOGIN} component={LoginPage} />
  </Router>
);

export default App;
