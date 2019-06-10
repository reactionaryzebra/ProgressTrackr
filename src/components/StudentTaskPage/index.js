import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { withFirebase } from "../Firebase";
import NoteForm from "../NoteForm";
import NoteCard from "../NoteCard";
import LoadingContainer from "../../styles/LoadingContainer";

class StudentTask extends Component {
  state = {
    student: null,
    task: null,
    notes: null,
    addingNote: false,
    stepEditing: null,
    stepEditingIndex: null,
    error: null
  };

  fetchStudentTask = async () => {
    const {
      firebase: { db },
      match: { params }
    } = this.props;
    const studentDB = db.collection("students");
    try {
      const foundStudentDoc = await studentDB.doc(params.studentID).get();
      const foundStudent = await foundStudentDoc.data();
      const foundTask = await studentDB
        .doc(params.studentID)
        .collection("tasks")
        .doc(params.taskID)
        .onSnapshot(snapshot => this.setState({ task: snapshot.data() }));
      const foundNotesData = await studentDB
        .doc(params.studentID)
        .collection("tasks")
        .doc(params.taskID)
        .collection("notes")
        .onSnapshot(snapshot => this.setState({ notes: snapshot.docs }));
      this.setState({
        student: foundStudent
      });
    } catch (error) {
      console.log(error);
    }
  };

  setAddingNote = bool => this.setState({ addingNote: bool });

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmitEdit = async () => {
    const {
      firebase: { db },
      match: {
        params: { studentID, taskID }
      }
    } = this.props;
    const newSteps = [...this.state.task.steps];
    newSteps[this.state.stepEditingIndex] = this.state.stepEditing;
    try {
      await db
        .collection("students")
        .doc(studentID)
        .collection("tasks")
        .doc(taskID)
        .update({ steps: newSteps });
      this.setState({ stepEditing: null, stepEditingIndex: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchStudentTask();
  }

  render() {
    const { student, task, notes, addingNote, error } = this.state;
    return student && task ? (
      <div>
        <h1>{student.fullName}</h1>
        <h2>{task.title}</h2>
        <ol>
          {task.steps.map((step, i) =>
            this.state.stepEditingIndex === i ? (
              <div key={i}>
                <input
                  value={this.state.stepEditing}
                  onChange={this.handleChange}
                  name="stepEditing"
                />
                <button onClick={this.handleSubmitEdit}>Submit</button>
                <button
                  onClick={() =>
                    this.setState({
                      stepEditingIndex: null,
                      stepEditing: null
                    })
                  }
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div key={i}>
                <li>{step}</li>
                <button
                  onClick={() =>
                    this.setState({ stepEditingIndex: i, stepEditing: step })
                  }
                >
                  Edit Step
                </button>
              </div>
            )
          )}
        </ol>
        <h3>Notes</h3>
        {notes
          ? notes.map((note, i) => <NoteCard key={i} note={note.data()} />)
          : null}
        {addingNote ? (
          <NoteForm setAddingNote={this.setAddingNote} />
        ) : (
          <button onClick={() => this.setState({ addingNote: true })}>
            Add Note
          </button>
        )}
      </div>
    ) : (
      <LoadingContainer>
        <Loader type="Triangle" color="#a16e83" height="100" width="100" />
      </LoadingContainer>
    );
  }
}

const StudentTaskPage = withFirebase(StudentTask);

export default StudentTaskPage;
