const express = require("express");
const app = express();
const cors = require("cors");
const socket = require("socket.io");

app.use(cors());
app.use(express.json());

const server = app.listen("https://chat-green-psi.vercel.app/", (req, res) => {
  console.log("Server running on PORT 3002.");
});

app.get("/", (req, res) => {
  res.send("Backend Server For Chat App Is Running!");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "https://chat-green-psi.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    const room = data.room;
    const content = data.content;

    socket.to(room).emit("receive_message", content);
  });

  socket.on("disconnect", (req,res) => {
    console.log("User Disconnected.");
  });
});
