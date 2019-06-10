import React from "react";
import StudentList from "../StudentList";
import TaskList from "../TaskList";
import Home from "../../styles/Home";

const HomePage = () => (
  <Home>
    <div>
      <div>
        <h2>Your Students</h2>
        <StudentList />
      </div>
      <div>
        <h2>Your Tasks</h2>
        <TaskList />
      </div>
    </div>
  </Home>
);

export default HomePage;
