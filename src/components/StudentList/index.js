import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";
import CreateStudentForm from "../CreateStudent";
import StudentOrTaskList from "../../styles/StudentOrTaskList";
import { FiDelete } from "react-icons/fi";

class StudentListBase extends Component {
  state = {
    students: [],
    adding: false,
    attemptingDelete: false,
    studentToDelete: null,
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

  handleDeleteAttempt = student => {
    this.setState({
      attemptingDelete: true,
      studentToDelete: { id: student.id, name: student.data().fullName }
    });
  };

  handleDelete = async () => {
    const {
      firebase: { db }
    } = this.props;
    const {
      studentToDelete: { id: studentID }
    } = this.state;
    try {
      await db
        .collection("students")
        .doc(studentID)
        .delete();
      this.setState({ attemptingDelete: false, studentToDelete: null });
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
        {this.state.attemptingDelete ? (
          <div>
            <p>
              Are you sure you want to delete {this.state.studentToDelete.name}?
            </p>
            <button onClick={this.handleDelete}>Yes</button>
            <button onClick={() => this.setState({ attemptingDelete: false })}>
              No
            </button>
          </div>
        ) : (
          <div>
            <StudentOrTaskList>
              {this.state.students.length > 0
                ? this.state.students.map((student, i) => (
                    <li key={i}>
                      <p
                        onClick={() =>
                          this.props.history.push(`/students/${student.id}`)
                        }
                      >
                        {student.data().fullName}
                      </p>
                      <FiDelete
                        size="3em"
                        onClick={() => this.handleDeleteAttempt(student)}
                      >
                        Delete Student
                      </FiDelete>
                    </li>
                  ))
                : null}
            </StudentOrTaskList>
            {this.state.adding && (
              <CreateStudentForm setAdding={this.setAdding} />
            )}
            <button onClick={() => this.setState({ adding: true })}>
              Add Student
            </button>
          </div>
        )}
      </div>
    );
  }
}

const StudentList = withFirebase(withAuthUser(withRouter(StudentListBase)));

export default StudentList;
