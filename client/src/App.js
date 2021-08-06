import './App.css';
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");


  const CONNECTION = "localhost:3002/";

useEffect(()=> {
  socket = io(CONNECTION);
}, [CONNECTION]);

  const connectRoom = () => {
      socket.emit('join_room', room);
  };

  return (

    <div className="App">
    {!loggedIn ? 
      <div className="login"> 
      <br/>
      <br/>
      <br/>
        <div className="form-group">
        <label className="form-label basic" htmlFor="name">Enter Name:</label>
        <input onChange={(event) => setUserName(event.target.value)} id="name" className="form-control" type="text" placeholder="Enter Name Here" />
        </div>
        <div className="form-group">
        <label className="form-label basic" htmlFor="room">Enter Room:</label>
        <input onChange={(event) => setRoom(event.target.value)} id="room" className="form-control " type="text" placeholder="Enter Room Here" />
        </div>
        <button onClick={connectRoom} className="btn btn-primary">Enter Chat</button>
      </div>
      : 
      <h1>Logged In</h1>
    }
    </div>
  );
}

export default App;
