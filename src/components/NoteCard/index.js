import React from "react";

const NoteCard = ({ note }) => (
  <div>
    <h4>Written By: {note.createdByName}</h4>
    <h5>{note.date}</h5>
    <p>{note.text}</p>
  </div>
);

export default NoteCard;
