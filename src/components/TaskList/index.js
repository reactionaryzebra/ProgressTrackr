import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";
import CreateTaskForm from "../CreateTask";
import StudentOrTaskList from "../../styles/StudentOrTaskList";
import { FiDelete } from "react-icons/fi";

class TaskListBase extends Component {
  state = {
    tasks: [],
    adding: false,
    attemptingDelete: false,
    taskToDelete: null,
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

  handleDeleteAttempt = task =>
    this.setState({
      attemptingDelete: true,
      taskToDelete: { id: task.id, title: task.data().title }
    });

  handleDelete = async () => {
    const {
      firebase: { db }
    } = this.props;
    const {
      taskToDelete: { id: taskID }
    } = this.state;
    try {
      await db
        .collection("tasks")
        .doc(taskID)
        .delete();
      this.setState({ attemptingDelete: false, taskToDelete: null });
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
        {this.state.attemptingDelete ? (
          <div>
            <p>
              Are you sure you want to delete the task:{" "}
              {this.state.taskToDelete.title}?
            </p>
            <button onClick={this.handleDelete}>Yes</button>
            <button onClick={() => this.setState({ attemptingDelete: false })}>
              No
            </button>
          </div>
        ) : (
          <div>
            <StudentOrTaskList>
              {this.state.tasks.length > 0
                ? this.state.tasks.map((task, i) => (
                    <li key={i}>
                      <p
                        onClick={() =>
                          this.props.history.push(`/tasks/${task.id}`)
                        }
                      >
                        {task.data().title}
                      </p>
                      <FiDelete
                        size="3em"
                        onClick={() => this.handleDeleteAttempt(task)}
                      >
                        Delete Task
                      </FiDelete>
                    </li>
                  ))
                : null}
            </StudentOrTaskList>
            {this.state.adding && <CreateTaskForm setAdding={this.setAdding} />}
            <button onClick={() => this.setState({ adding: true })}>
              Add Task
            </button>
          </div>
        )}
      </div>
    );
  }
}

const TaskList = withAuthUser(withFirebase(withRouter(TaskListBase)));

export default TaskList;
