import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AuthPage from "../../styles/AuthPage";
import AuthContainer from "../../styles/AuthContainer";
import AuthForm from "../../styles/AuthForm";

import { RegistrationLink } from "../Registration";
import { ForgotPasswordLink } from "../ForgotPassword";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const LoginPage = () => (
  <AuthPage>
    <AuthContainer>
      <h1>Login</h1>
      <LoginForm />
      <ForgotPasswordLink />
      <RegistrationLink />
    </AuthContainer>
  </AuthPage>
);

const initialState = {
  email: "",
  password: "",
  error: null
};

class LoginFormBase extends Component {
  state = { ...initialState };

  handleSubmit = async e => {
    console.log("here");
    const { email, password } = this.state;
    e.preventDefault();
    try {
      await this.props.firebase.doLogin(email, password);
      this.setState({ ...initialState });
      this.props.history.push(ROUTES.HOME);
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <AuthForm onSubmit={this.handleSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.handleChange}
          type="email"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.handleChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </AuthForm>
    );
  }
}

const LoginForm = withFirebase(withRouter(LoginFormBase));

export default LoginPage;

export { LoginForm };
