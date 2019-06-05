import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";
import CreateStudentForm from "../CreateStudent";

class StudentListBase extends Component {
  state = {
    students: null,
    adding: false,
    error: null
  };

  setAdding = bool => {
    this.setState({ adding: bool });
  };

  fetchStudents = async () => {
    const { firebase, authUser } = this.props;
    const studentsDB = firebase.db.collection("students");
    try {
      const response = await studentsDB
        .where("teachers", "array-contains", authUser.uid)
        .get();
      const students = response.docs;
      this.setState({ students });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchStudents();
  }

  render() {
    return (
      <div>
        <h2>Students</h2>
        <ul>
          {this.state.students &&
            this.state.students.map((student, i) => (
              <li key={i}>{student.data().fullName}</li>
            ))}
        </ul>
        {this.state.adding && <CreateStudentForm setAdding={this.setAdding} />}
        <button onClick={() => this.setState({ adding: true })}>
          Add Student
        </button>
      </div>
    );
  }
}

const StudentList = withFirebase(withAuthUser(StudentListBase));

export default StudentList;
