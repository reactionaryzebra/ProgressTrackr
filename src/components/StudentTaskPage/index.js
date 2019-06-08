import React, { Component } from "react";
import { withFirebase } from "../Firebase";

class StudentTask extends Component {
  state = {
    student: null,
    task: null,
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
      const foundTaskDoc = await studentDB
        .doc(params.studentID)
        .collection("tasks")
        .doc(params.taskID)
        .get();
      const foundTask = await foundTaskDoc.data();
      this.setState({ student: foundStudent, task: foundTask });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchStudentTask();
  }

  render() {
    const { student, task, error } = this.state;
    return student ? (
      <div>
        <h1>{student.fullName}</h1>
        <h2>{task.title}</h2>
        <ol>
          {task.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
        <h3>Notes</h3>
        <button onClick={() => this.setState({ addingNote: true })}>
          Add Note
        </button>
      </div>
    ) : (
      <h1>loading...</h1>
    );
  }
}

const StudentTaskPage = withFirebase(StudentTask);

export default StudentTaskPage;
