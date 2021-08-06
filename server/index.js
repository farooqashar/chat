const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());


app.listen("3002", (req,res) => {
    console.log("Server running on PORT.");
});

