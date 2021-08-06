const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");



app.use(cors());
app.use(express.json());

const server = app.listen("3002", (req,res) => {
    console.log("Server running on PORT.");
});

app.get("/", (req,res) => {
    res.send("Backend Server For Chat App Is Running!");
})

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

    socket.on('send_message', (data) => {
        console.log("data" + data);
        const room = data.room;
        const content = data.content;

        socket.to(room).emit("receive_message",content)
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected.");
    });
});
