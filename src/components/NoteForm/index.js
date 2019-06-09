import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";

class NoteFormBase extends Component {
  state = {
    date: "",
    text: "",
    highestStep: 0,
    error: null
  };

  handleChange = e =>
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });

  handleSubmit = async e => {
    const {
      match: { params },
      firebase: { db },
      authUser,
      setAddingNote
    } = this.props;
    const { date, text, highestStep } = this.state;
    e.preventDefault();
    try {
      const userDoc = await db
        .collection("users")
        .doc(authUser.uid)
        .get();
      const user = await userDoc.data();
      await db
        .collection("students")
        .doc(params.studentID)
        .collection("tasks")
        .doc(params.taskID)
        .collection("notes")
        .add({
          date,
          text,
          highestStep,
          createdBy: authUser.uid,
          createdByName: user.fullName
        });
      this.setState({ date: "", text: "" });
      setAddingNote(false);
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const { date, text, highestStep } = this.state;
    const { setAddingNote } = this.props;
    const isInvalid = date === "" || text === "" || highestStep === 0;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          name="date"
          onChange={this.handleChange}
          value={date}
        />
        <label>Highest step achieved without full assistance</label>
        <input
          type="number"
          name="highestStep"
          value={highestStep}
          onChange={this.handleChange}
        />
        <textarea name="text" onChange={this.handleChange} value={text} />
        <button type="submit" disabled={isInvalid}>
          Submit
        </button>
        <button onClick={() => setAddingNote(false)}>Cancel</button>
      </form>
    );
  }
}

const NoteForm = withFirebase(withAuthUser(withRouter(NoteFormBase)));

export default NoteForm;
