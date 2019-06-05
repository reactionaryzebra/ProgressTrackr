import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";
import CreateStudentForm from "../CreateStudent";

class StudentListBase extends Component {
  state = {
    students: [],
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
        .onSnapshot(snapshot => this.setState({ students: snapshot.docs }));
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
          {this.state.students.length > 0
            ? this.state.students.map((student, i) => (
                <div key={i}>
                  <li>{student.data().fullName}</li>
                  <button
                    onClick={() =>
                      this.props.history.push(`/students/${student.id}`)
                    }
                  >
                    Edit Student
                  </button>
                </div>
              ))
            : null}
        </ul>
        {this.state.adding && <CreateStudentForm setAdding={this.setAdding} />}
        <button onClick={() => this.setState({ adding: true })}>
          Add Student
        </button>
      </div>
    );
  }
}

const StudentList = withFirebase(withAuthUser(withRouter(StudentListBase)));

export default StudentList;
