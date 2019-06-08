import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

import NavBar from "../NavBar";
import RegistrationPage from "../Registration";
import LoginPage from "../Login";
import HomePage from "../Home";
import StudentPage from "../StudentPage";
import TaskPage from "../TaskPage";
import StudentTaskPage from "../StudentTaskPage";
import ForgotPasswordPage from "../ForgotPassword";

import * as ROUTES from "../../constants/routes";

class AppBase extends Component {
  state = {
    authUser: null
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser =>
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
    );
  }

  render() {
    return (
      <AuthUserContext.Provider value={this.state.authUser}>
        <Router>
          <NavBar />

          <Route exact path={ROUTES.REGISTER} component={RegistrationPage} />
          <Route exact path={ROUTES.LOGIN} component={LoginPage} />
          {this.state.authUser && (
            <Route exact path={ROUTES.HOME} component={HomePage} />
          )}
          <Route exact path={ROUTES.SHOWSTUDENT} component={StudentPage} />
          <Route exact path={ROUTES.SHOWTASK} component={TaskPage} />
          <Route exact path={ROUTES.STUDENTTASK} component={StudentTaskPage} />
          <Route
            exact
            path={ROUTES.FORGOTPASSWORD}
            component={ForgotPasswordPage}
          />
        </Router>
      </AuthUserContext.Provider>
    );
  }
}

const App = withFirebase(AppBase);

export default App;
