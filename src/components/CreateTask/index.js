import React, { Component } from "react";
import { withAuthUser } from "../Session";
import { withFirebase } from "../Firebase";

class CreateTaskFormBase extends Component {
  state = {
    title: "",
    error: null
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async e => {
    const { firebase, authUser } = this.props;
    e.preventDefault();
    try {
      await firebase.db.collection("tasks").add({
        title: this.state.title,
        createdBy: authUser.uid
      });
      this.setState({ title: "" });
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
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          placeholder={"Task Title"}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

const CreateTaskForm = withAuthUser(withFirebase(CreateTaskFormBase));

export default CreateTaskForm;
