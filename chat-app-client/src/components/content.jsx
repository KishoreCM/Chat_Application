import React, { Component } from "react";
import ContactProfile from "./contactprofile";
import Messages from "./messages";
import MessageInput from "./messageinput";

class Content extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <ContactProfile />
          <Messages />
          <MessageInput />
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
