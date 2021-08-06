import './App.css';
import React, { useState } from "react";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
    {!loggedIn ? 
      <div className="login"> 
      <br/>
      <br/>
      <br/>
        <div className="form-group">
        <label className="form-label basic" htmlFor="name">Enter Name:</label>
        <input id="name" className="form-control" type="text" placeholder="Enter Name Here" />
        </div>
        <div className="form-group">
        <label className="form-label basic" htmlFor="room">Enter Room:</label>
        <input id="room" className="form-control " type="text" placeholder="Enter Room Here" />
        </div>
        <button className="btn btn-primary">Enter Chat</button>
      </div>
      : 
      <h1>Logged In</h1>
    }
    </div>
  );
}

export default App;
