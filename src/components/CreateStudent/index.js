import React, { Component } from "react";
import { withAuthUser } from "../Session";
import { withFirebase } from "../Firebase";

const CreateStudentPage = () => <div>hello there!</div>;

class CreateStudentFormBase extends Component {}

const CreateStudentForm = withAuthUser(withFirebase(CreateStudentFormBase));

export default CreateStudentPage;
