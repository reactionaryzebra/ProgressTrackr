import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const ForgotPasswordPage = () => (
  <div>
    <h1>Forgot Password</h1>
    <ForgotPasswordForm />
  </div>
);

class ForgotPasswordFormBase extends Component {
  state = {
    email: "",
    error: null
  };

  handleSubmit = async e => {
    const { email } = this.state;
    const { firebase } = this.props;
    e.preventDefault();
    try {
      await firebase.doPasswordReset(email);
      this.setState({ email: "" });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Email Address"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const ForgotPasswordLink = () => (
  <p>
    <Link to={ROUTES.FORGOTPASSWORD}>Forgot Password?</Link>
  </p>
);

const ForgotPasswordForm = withFirebase(ForgotPasswordFormBase);

export default ForgotPasswordPage;

export { ForgotPasswordLink };
