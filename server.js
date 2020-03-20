const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("HI!.."));

app.use("/app", require("./routes/route"));

io.on("connection", socket => {
  console.log("We have a new connection!!!");
  socket.on("join", user => {
    console.log(user.name);
  });
  socket.on("disconnect", () => {
    console.log("User had left!!!");
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));
