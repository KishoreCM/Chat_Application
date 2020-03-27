import React, { Component } from "react";
import SidePanel from "./sidepanel";
import Content from "./content";
import queryString from "query-string";
import io from "socket.io-client";
import axios from "axios";
import auth from "../auth";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userPh: "",
      pChat: [],
      gChat: [],
      pMessage: "",
      gMessage: "",
      pMessages: [],
      gMessages: [],
      users: [],
      contactUserName: "",
      contactUserPhone: ""
    };
  }

  socket = "";
  componentDidMount() {
    console.log("Mounted");
    let {
      userName,
      userPh,
      pChat,
      gChat,
      pMessage,
      gMessage,
      pMessages,
      gMessages,
      users
    } = this.state;

    let currentUser = new FormData();
    currentUser.append("userPh", auth.getCurrentUser());

    axios({
      method: "post",
      url: "app/get/user/chats",
      data: currentUser,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        console.log(response);

        let currentUserName = response.data.find(
          user => user.phone === auth.getCurrentUser()
        ).name;

        let filteredUsers = response.data.splice(0, response.data.length - 2);
        filteredUsers = filteredUsers.filter(
          user => user.phone !== auth.getCurrentUser()
        );

        this.setState(
          {
            users: filteredUsers,
            pChat: response.data[response.data.length - 2],
            gChat: response.data[response.data.length - 1],
            userName: currentUserName
          },
          () => {
            let ENDPOINT = "localhost:5000";
            const user = queryString.parse(this.props.location.search);
            console.log(user);

            let usersPh = [];
            this.state.users.map(user => {
              if (user.phone !== auth.getCurrentUser())
                usersPh.push({ name: user.name, phone: user.phone });
            });

            this.setState({ userPh: user.userPh }, () => {
              this.socket = io(ENDPOINT);
              this.socket.emit("join", {
                userName: this.state.userName,
                userPh: user.userPh,
                usersPh: usersPh
              });
              //console.log(this.socket);

              this.socket.on("message", message => {
                console.log("message: ", message);
                let messages = this.state.pMessages;
                messages.push(message);
                this.setState({ pMessages: messages });
              });
              this.displayContact(this.state.users[0]);
            });
          }
        );
      })
      .catch(error => console.log(error));
  }

  componentWillUnmount() {
    this.socket.emit("disconnect", { userPh: auth.getCurrentUser() });
    this.socket.off();
    console.log("Unmounted");
  }

  // function for sending messages

  sendMessage = message => {
    let messages = this.state.pMessages;
    let msg = { from: this.state.userName, text: message };
    messages.push(msg);
    this.setState({ pMessages: messages });

    let userChat = new FormData();
    userChat.append("userPh", auth.getCurrentUser());
    userChat.append("friendPh", this.state.contactUserPhone);
    userChat.append("sentMsg", message);

    axios({
      method: "post",
      url: "app/add/chats",
      data: userChat,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(response => {
        console.log(response.data);
        this.socket.emit("sendMessage", {
          userName: this.state.userName,
          text: message,
          to: this.state.contactUserPhone
        });
      })
      .catch(error => console.log(error));
  };

  displayContact = user => {
    console.log("display contact: ", user);
    this.setState({ contactUserName: user.name, contactUserPhone: user.phone });
  };

  render() {
    return (
      <div className="container-fluid">
        <div id="chatbox">
          <SidePanel
            user={this.state.userName}
            users={this.state.users}
            handleClick={this.displayContact}
          />
          <Content
            user={this.state.userName}
            contactUserName={this.state.contactUserName}
            messages={this.state.pMessages}
            sendMessage={this.sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default ChatBox;
