import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthUser } from "../Session";

class TaskListBase extends Component {
  render() {
    <div>This is the Task list</div>;
  }
}

const TaskList = withAuthUser(withFirebase(TaskListBase));

export default TaskList;
