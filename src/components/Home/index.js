import React from "react";
import StudentList from "../StudentList";
import TaskList from "../TaskList";

const HomePage = () => (
  <div>
    <h1>This is the Home page</h1>
    <StudentList />
    <TaskList />
  </div>
);

export default HomePage;
