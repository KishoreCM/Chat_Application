import React, { Component } from "react";
import SidePanel from "./sidepanel";
import Content from "./content";

class ChatBox extends Component {
  state = {};
  render() {
    return (
      <div id="chatbox">
        <SidePanel />
        <Content />
      </div>
    );
  }
}

export default ChatBox;
