import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";

class StudentListBase extends Component {
  state = {
    students: null,
    error: null
  };

  fetchStudents = async () => {
    const { firebase, authUser } = this.props;
    const studentsDB = firebase.db.collection("students");
    try {
      const response = await studentsDB
        .where("teachers", "array-contains", authUser.id)
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
              <li key={i}>{student.data().name}</li>
            ))}
        </ul>
      </div>
    );
  }
}

const StudentList = withFirebase(withAuthUser(StudentListBase));

export default StudentList;
