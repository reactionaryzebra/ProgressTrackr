import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const RegistrationPage = () => (
  <div>
    <h1>Registration</h1>
    <FirebaseContext.Consumer>
      {firebase => <RegistrationForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

const initialState = {
  fullName: "",
  email: "",
  password: "",
  verifyPassword: "",
  error: null
};

class RegistrationFormBase extends Component {
  state = initialState;

  handleSubmit = async e => {
    const { fullName, email, password } = this.state;
    e.preventDefault();
    try {
      const authUser = await this.props.firebase.doCreateUser(email, password);
      await this.props.firebase.db
        .collection("users")
        .doc(authUser.user.uid)
        .set({
          id: authUser.user.uid,
          fullName,
          email,
          assignedStudents: [],
          role: "teacher"
        });
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
    const { fullName, email, password, verifyPassword, error } = this.state;

    const isInvalid =
      password !== verifyPassword ||
      password === "" ||
      email === "" ||
      fullName === "";

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name="fullName"
          value={fullName}
          onChange={this.handleChange}
          type="text"
          placeholder="Full Name"
        />
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
        <input
          name="verifyPassword"
          value={verifyPassword}
          onChange={this.handleChange}
          type="password"
          placeholder="Verify Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const RegistrationLink = () => (
  <p>
    No account yet? <Link to={ROUTES.REGISTER}>Register</Link>
  </p>
);

const RegistrationForm = withRouter(RegistrationFormBase);

export default RegistrationPage;

export { RegistrationFormBase, RegistrationLink };
