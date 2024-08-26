import React from "react";
import axios from "axios";

function Note(props) {


  async function deleteNote(process){
    process.preventDefault();
    const result = await axios.delete(import.meta.env.VITE_APP_URL + "/delete/" + parseInt(props.id));
    console.log(result);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteNote}>Delete</button>
    </div>
  );
}

export default Note;
