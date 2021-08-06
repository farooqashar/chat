const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen("3002", (req,res) => {
    console.log("Server running on PORT.");
});

io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log("User joined Room: " + data);
    });

    socket.on('disconnect', () => {
        console.log("User Disconnected.")
    });
});
