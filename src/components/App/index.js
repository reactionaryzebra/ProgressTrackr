import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { FirebaseContext } from "../Firebase";

import NavBar from "../NavBar";
import RegistrationPage from "../Registration";
import LoginPage from "../Login";

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
      <Router>
        <NavBar authUser={this.state.authUser} />

        <Route exact path={ROUTES.REGISTER} component={RegistrationPage} />
        <Route exact path={ROUTES.LOGIN} component={LoginPage} />
        <Route
          exact
          path={ROUTES.HOME}
          render={() => <div>This is the Home page</div>}
        />
      </Router>
    );
  }
}

const App = () => (
  <FirebaseContext.Consumer>
    {firebase => <AppBase firebase={firebase} />}
  </FirebaseContext.Consumer>
);
export default App;
