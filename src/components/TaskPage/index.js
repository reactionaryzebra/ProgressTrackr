import React, { Component } from "react";
import Loader from "react-loader-spinner";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

const AddStepInput = ({ newStep, handleChange, handleAddStep }) => (
  <div>
    <input
      name="newStep"
      value={newStep}
      onChange={handleChange}
      placeholder="Describe step"
    />
    <button onClick={handleAddStep}>Add Step</button>
  </div>
);

class TaskPageBase extends Component {
  state = {
    task: null,
    error: null,
    newStep: "",
    addingStep: false,
    newCategory: "",
    stepEditing: null,
    stepEditingIndex: null
  };

  fetchTask = async id => {
    try {
      const taskDB = this.props.firebase.db.collection("tasks");
      const response = await taskDB
        .doc(id)
        .onSnapshot(snapshot => this.setState({ task: snapshot.data() }));
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleAddStep = e => {
    this.setState({
      task: {
        ...this.state.task,
        steps: this.state.task.steps
          ? [...this.state.task.steps, this.state.newStep]
          : [this.state.newStep]
      },
      newStep: "",
      addingStep: false
    });
  };

  handleAddCategory = e => {
    this.setState({
      task: {
        ...this.state.task,
        category: this.state.newCategory
      }
    });
  };

  handleSubmitTask = async e => {
    const {
      firebase,
      match: { params },
      history
    } = this.props;
    const { task } = this.state;
    e.preventDefault();
    try {
      const tasksDB = firebase.db.collection("tasks");
      await tasksDB.doc(params.id).set(task);
      history.push("/home");
    } catch (error) {
      this.setState({ error });
    }
  };

  handleSubmitEdit = async () => {
    const {
      firebase: { db },
      match: { params }
    } = this.props;
    const newSteps = [...this.state.task.steps];
    newSteps[this.state.stepEditingIndex] = this.state.stepEditing;
    try {
      await db
        .collection("tasks")
        .doc(params.id)
        .update({ steps: newSteps });
      this.setState({ stepEditing: null, stepEditingIndex: null });
    } catch (error) {
      this.setState({ error });
    }
  };

  componentDidMount() {
    this.fetchTask(this.props.match.params.id);
  }

  render() {
    const { task } = this.state;
    return task ? (
      <div>
        <h1>{task.title}</h1>
        {task.category ? (
          <h2>{task.category}</h2>
        ) : (
          <div>
            <input
              value={this.state.newCategory}
              onChange={this.handleChange}
              name="newCategory"
            />
            <button onClick={this.handleAddCategory}>Add Category</button>
          </div>
        )}
        {task.steps ? (
          <ol>
            {task.steps.map((step, i) =>
              this.state.stepEditingIndex === i ? (
                <div key={i}>
                  <input
                    value={this.state.stepEditing}
                    onChange={this.handleChange}
                    name="stepEditing"
                  />
                  <button onClick={this.handleSubmitEdit}>Submit</button>
                  <button
                    onClick={() =>
                      this.setState({
                        stepEditingIndex: null,
                        stepEditing: null
                      })
                    }
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div key={i}>
                  <li>{step}</li>
                  <button
                    onClick={() =>
                      this.setState({ stepEditingIndex: i, stepEditing: step })
                    }
                  >
                    Edit Step
                  </button>
                </div>
              )
            )}
          </ol>
        ) : null}
        {this.state.addingStep && (
          <AddStepInput
            newStep={this.state.newStep}
            handleChange={this.handleChange}
            handleAddStep={this.handleAddStep}
          />
        )}
        <button onClick={() => this.setState({ addingStep: true })}>
          Add Step
        </button>
        <button onClick={this.handleSubmitTask}>Submit Task</button>
      </div>
    ) : (
      <Loader type="Triangle" color="#a16e83" height="100" width="100" />
    );
  }
}

const TaskPage = withFirebase(withRouter(TaskPageBase));

export default TaskPage;
