import React from "react";

const NoteCard = ({ note }) => (
  <div>
    <h4>{note.date}</h4>
    <h5>Written By: {note.createdByName}</h5>
    <h5>Highest step achieved alone: {note.highestStep}</h5>
    <p>{note.text}</p>
  </div>
);

export default NoteCard;
