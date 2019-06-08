import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";

class NoteFormBase extends Component {
  state = {
    date: null,
    text: null
  };
  render() {
    const { date, text } = this.state;
    return (
      <form>
        <input
          type="date"
          name="date"
          onChange={this.handleChange}
          value={date}
        />
        <input
          type="textfield"
          name="text"
          onChange={this.handleChange}
          value={text}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const NoteForm = withFirebase(withAuthUser(NoteFormBase));

export default NoteForm;
