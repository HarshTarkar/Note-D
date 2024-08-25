import React from "react";
import ReactDOM from "react-dom";
import App from "./assets/App";
import axios from "axios"

try{
    const response = await axios.get("http://localhost:3000/all",{withCredentials:false});
    console.log(response.data);
  }catch(err){
    console.log(err.response.data);
  }

ReactDOM.render(<App />, document.getElementById("root"));