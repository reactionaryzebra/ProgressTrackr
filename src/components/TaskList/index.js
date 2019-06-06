import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";
import CreateTaskForm from "../CreateTask";

class TaskListBase extends Component {
  state = {
    tasks: [],
    adding: false,
    error: null
  };

  setAdding = bool => {
    this.setState({ adding: bool });
  };

  fetchTasks = async () => {
    const { firebase, authUser } = this.props;
    const tasksDB = firebase.db.collection("tasks");
    try {
      const response = await tasksDB
        .where("createdBy", "==", authUser.uid)
        .onSnapshot(snapshot => this.setState({ tasks: snapshot.docs }));
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    return (
      <div>
        <h2>Tasks</h2>
        <ul>
          {this.state.tasks.length > 0
            ? this.state.tasks.map((task, i) => (
                <li
                  onClick={() => this.props.history.push(`/tasks/${task.id}`)}
                  key={i}
                >
                  {task.data().title}
                </li>
              ))
            : null}
        </ul>
        {this.state.adding && <CreateTaskForm setAdding={this.setAdding} />}
        <button onClick={() => this.setState({ adding: true })}>
          Add Task
        </button>
      </div>
    );
  }
}

const TaskList = withAuthUser(withFirebase(withRouter(TaskListBase)));

export default TaskList;
