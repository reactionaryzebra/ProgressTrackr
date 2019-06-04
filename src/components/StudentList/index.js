import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { AuthUserContext } from "../Session";

const StudentList = () => (
  <div>
    <ul>
      <li>testing</li>
    </ul>
  </div>
);

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

export default StudentList;
