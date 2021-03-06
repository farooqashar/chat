import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

let socket;
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);

  const CONNECTION = "localhost:3002/";
  // const CONNECTION = "https://chat-green-psi.vercel.app/";

  useEffect(() => {
    socket = io(CONNECTION);
  }, [CONNECTION]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setAllMessages([...allMessages, data]);
    });
  }, [allMessages]);

  const connectRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const handleSendMessage = async () => {
    await socket.emit("send_message", {
      room: room,
      content: { message: message, sender: userName },
    });
    setAllMessages([...allMessages, { message: message, sender: userName }]);
    setMessage("");
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <>
          <h1>Chat App</h1>
          <h6 className="text-warning">
            Log In Below To Start Chatting in A Chat Room
          </h6>
          <div className="login">
            <br />
            <br />
            <br />
            <div className="form-group">
              <label className="form-label basic" htmlFor="name">
                <div className="subttt">Enter Name:</div>
              </label>
              <div className="inputContainer">
                <input
                  onChange={(event) => setUserName(event.target.value)}
                  id="name"
                  className="form-control"
                  type="text"
                  placeholder="Enter Name Here"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label basic" htmlFor="room">
                <div className="subttt">Enter Room:</div>
              </label>
              <div className="inputContainer">
                <input
                  onChange={(event) => setRoom(event.target.value)}
                  id="room"
                  className="form-control "
                  type="text"
                  placeholder="Enter Room Here"
                />
              </div>
            </div>
            <button onClick={connectRoom} className="btn btn-primary">
              <div className="eachl">Enter Chat</div>
            </button>
          </div>
        </>
      ) : (
        <div className="chat">
          <div className="messages">
            {allMessages.map((each_message, index) => {
              return (
                <div
                  className="messageBox"
                  id={each_message.sender === userName ? "You" : "Else"}
                  key={index}
                >
                  <div className="eachMessage">
                    <h2>
                      <i>{each_message.sender}</i>: {each_message.message}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="inputs">
            <input
              onChange={(event) => setMessage(event.target.value)}
              id="message"
              type="text"
              placeholder="Enter Message Here"
            />
            <button onClick={handleSendMessage}>
              <div className="eachl">Send</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
