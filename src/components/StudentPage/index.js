import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

class StudentPageBase extends Component {
  state = {
    student: null,
    error: null
  };

  fetchUser = async id => {
    try {
      const studentDB = this.props.firebase.db.collection("students");
      const response = await studentDB.doc(id).get();
      const foundStudent = await response.data();
      this.setState({ student: foundStudent });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchUser(this.props.match.params.id);
  }

  render() {
    return this.state.student ? (
      <h1>{this.state.student.fullName}</h1>
    ) : (
      <h1>loading...</h1>
    );
  }
}

const StudentPage = withFirebase(withRouter(StudentPageBase));

export default StudentPage;
