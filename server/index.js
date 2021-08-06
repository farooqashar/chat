const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");



app.use(cors());
app.use(express.json());

const server = app.listen("3002", (req,res) => {
    console.log("Server running on PORT.");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log("User joined Room: " + data);
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected.");
    });
});
