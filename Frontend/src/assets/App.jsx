import React, {useState, useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App(){

    const [notes, setNotes] = useState([]);



    useEffect(async () => {
        const res = await axios.get(import.meta.env.VITE_APP_URL+"/all");
        setNotes(res.data);
    }, []);



    return (
        <div>
            <Header />
            <CreateArea />
            {notes && notes.map((noteItem) => {
                return <Note key={noteItem.key}
                id={noteItem.key}
                title={noteItem.title}
                content={noteItem.content} />
            })}
            <Footer />
        </div>
    );
}

export default App;