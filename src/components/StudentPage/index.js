import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";

class StudentPageBase extends Component {
  state = {
    student: null,
    error: null,
    assigningTask: false,
    tasks: null,
    taskToAssign: null
  };

  fetchStudent = async id => {
    try {
      const studentDB = this.props.firebase.db.collection("students");
      const response = await studentDB.doc(id).get();
      const foundStudent = await response.data();
      const studentTasksRef = await studentDB
        .doc(id)
        .collection("tasks")
        .onSnapshot(snapshot => {
          this.setState({ student: { tasks: snapshot.docs, ...foundStudent } });
        });
    } catch (error) {
      console.log({ error });
    }
  };

  fetchTasks = async () => {
    const {
      firebase: { db },
      authUser
    } = this.props;
    try {
      const response = await db
        .collection("tasks")
        .where("createdBy", "==", authUser.uid)
        .onSnapshot(snapshot => this.setState({ tasks: snapshot.docs }));
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleAssignTask = async e => {
    const {
      firebase: { db },
      match: { params }
    } = this.props;
    const { taskToAssign: id } = this.state;
    e.preventDefault();
    try {
      const foundTask = await db
        .collection("tasks")
        .doc(id)
        .get();
      const taskToCopy = await foundTask.data();
      const student = await db
        .collection("students")
        .doc(params.id)
        .get();
      await db
        .collection("students")
        .doc(params.id)
        .collection("tasks")
        .add(taskToCopy);
      this.setState({ assigningTask: false, taskToAssign: null });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.fetchStudent(this.props.match.params.id);
    this.fetchTasks();
  }

  render() {
    const { student, assigningTask, tasks } = this.state;
    return this.state.student ? (
      <div>
        <h1>{this.state.student.fullName}</h1>
        <h2>Assigned Tasks</h2>
        {student.tasks ? (
          <ul>
            {student.tasks.map((task, i) => (
              <li
                key={i}
                onClick={() =>
                  this.props.history.push(
                    `/students/${this.props.match.params.id}/tasks/${task.id}`
                  )
                }
              >
                {task.data().title}
              </li>
            ))}
          </ul>
        ) : null}
        {assigningTask ? (
          <form onSubmit={this.handleAssignTask}>
            <select name="taskToAssign" onChange={this.handleChange}>
              <option>Select One</option>
              {tasks.map((task, i) => (
                <option key={i} value={task.id}>
                  {task.data().title}
                </option>
              ))}
            </select>
            <button type="submit">Assign Task</button>
          </form>
        ) : null}
        <button onClick={() => this.setState({ assigningTask: true })}>
          Add
        </button>
      </div>
    ) : (
      <h1>loading...</h1>
    );
  }
}

const StudentPage = withAuthUser(withFirebase(withRouter(StudentPageBase)));

export default StudentPage;
