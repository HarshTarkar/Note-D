import React,{useState} from "react";
import axios from "axios";

function CreateArea(){

    const [newNote, setNewNote] = useState({
        title:"",
        content:""
    });

    function handleChange(event){
        const {name, value} = event.target;

        setNewNote(prev => {
            return {
                ...prev,[name]: value
            }
        });
    }

    async function addNote(event){
        event.preventDefault();
        const result = await axios.post("http://localhost:3000/add/" + newNote.title + "&" + newNote.content)
        setNewNote({
            title:"",
            content:""
        });
    }



    return (<div>
        <form className="form">
            <input name="title" onChange={handleChange} placeholder="Add Note" value={newNote.title}></input>
            <textarea name="content" onChange={handleChange} placeholder="Add Content" value={newNote.content}></textarea>
            <button onClick={addNote}>+</button>
        </form>
    </div>)
}

export default CreateArea;