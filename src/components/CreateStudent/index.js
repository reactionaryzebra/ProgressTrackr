import React, { Component } from "react";
import { withAuthUser } from "../Session";
import { withFirebase } from "../Firebase";

class CreateStudentFormBase extends Component {
  state = {
    fullName: "",
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    const { firebase, authUser } = this.props;
    e.preventDefault();
    try {
      await firebase.db.collection("students").add({
        fullName: this.state.fullName,
        teachers: [authUser.uid]
      });
      this.setState({ fullName: "" });
      this.props.setAdding(false);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={this.state.fullName}
          onChange={this.handleChange}
          placeholder={"Full Name"}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

const CreateStudentForm = withAuthUser(withFirebase(CreateStudentFormBase));

export default CreateStudentForm;
