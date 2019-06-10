import React from "react";
import Landing from "../../styles/Landing";

const LandingPage = () => (
  <Landing>
    <h1>Welcome to Progress Trackr</h1>
    <div>
      <p>
        Task Analysis is a methodology used across many settings for
        instruction.
        <br />
        The instructor will break down the task they are attempting to teach
        into its component observable steps.
        <br />
        This helps to make the task less intimidating while also standardizing
        instruction in the case that a pupil has multiple instructors
      </p>
      <aside>
        <label>Progress Trackr allows instructors to:</label>
        <ul>
          <li>Write your own task analysis</li>
          <li>Create profiles for each of your pupils</li>
          <li>
            Assign each pupil the tasks you have created and personalize them
            for each individual
          </li>
          <li>Keep notes which allow you to track your pupil's progress</li>
        </ul>
      </aside>
    </div>
    <p>Register or Login to begin</p>
  </Landing>
);

export default LandingPage;
