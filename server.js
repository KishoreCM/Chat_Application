const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const socketio = require("socket.io");
const formidable = require("express-formidable");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const axios = require("axios");
const FormData = require("form-data");
//const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(formidable());

app.get("/", (req, res) => res.send("HI!.."));

app.use("/app", require("./routes/route"));

io.on("connection", socket => {
  console.log("We have a new connection!!!");
  socket.on("join", user => {
    console.log("user: ", user);

    /**user.usersPh.map(user => {
      socket.emit("message", {
        user: "admin",
        text: `Say hello to ${user.name}!`
      });
    });**/
    socket.join(user.userPh);

    //const { error, user } = addUser({ id: socket.id, name, room });

    //if (error) return callback(error);

    /* socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    socket.join(user.room);*/

    /*io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });*/
  });

  socket.on("sendMessage", message => {
    console.log(message);
    let userChat = new FormData();
    userChat.append("friendPh", message.from);
    userChat.append("userPh", message.to);
    userChat.append("text", message.text);
    /*axios({
      method: "post",
      url: "http://localhost:5000/app/chats/received",
      data: userChat,
      //headers: { "Content-Type": "multipart/form-data" }
      headers: userChat.getHeaders()
    })
      .then(response => console.log("Server axios: ", response.data))
      .catch(error => console.log("Server axios: ", error));*/
    io.to(message.to).emit("message", {
      from: message.from,
      text: message.text
    });
  });

  /*
  socket.on("sendMessage", (message, callback) => {
    //const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });
  */

  socket.on("disconnect", () => {
    console.log("User had left");
    //const user = removeUser(socket.id);
    /*
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`
      });
    }
    console.log("User had left!!!");*/
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));
