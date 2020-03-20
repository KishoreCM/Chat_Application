import React, { Component } from "react";
import SidePanel from "./sidepanel";
import Content from "./content";
import queryString from "query-string";
import io from "socket.io-client";

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = { user: "" };
  }

  socket = "";
  componentDidMount() {
    console.log("Mounted");
    let ENDPOINT = "localhost:5000";
    const user = queryString.parse(this.props.location.search);
    console.log(user);

    this.socket = io(ENDPOINT);
    this.socket.emit("join", { name: user.usermail });

    this.setState({ user: user.usermail });
  }

  componentWillUnmount() {
    this.socket.emit("disconnect");
    this.socket.off();
    console.log("Unmounted");
  }

  render() {
    return (
      <div className="container-fluid">
        <div id="chatbox">
          <SidePanel />
          <Content />
        </div>
      </div>
    );
  }
}

export default ChatBox;
