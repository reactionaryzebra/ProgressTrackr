import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";

class StudentListBase extends Component {
  state = {
    students: null
  };

  fetchStudents = async () => {
    const { firebase, authUser } = this.props;
    const studentsDB = firebase.db.collection("students");
    const response = studentsDB.where(
      "teachers",
      "array-contains",
      authUser.id
    );
    console.log(response);
  };
  componentDidMount() {
    this.fetchStudents();
  }

  render() {
    return <div />;
  }
}

const StudentList = withFirebase(withAuthUser(StudentListBase));

export default StudentList;
