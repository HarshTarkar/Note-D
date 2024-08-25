import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios"

let notes = {};

try{
    const response = await axios.get("http://localhost:3000/all",{withCredentials:false});
    notes = response.data;
}catch(err){
    console.log(err.response.data);
}

function createNotes(noteItem){
    return <Note key={noteItem.key}
    title={noteItem.title}
    content={noteItem.content} />
}

function App(){
    return (
        <div>
            <Header />
            {notes.map(createNotes)}
            <Footer />
        </div>
    );
}

export default App;