import React, { Component } from "react";
import Sent from "./sent";
import Replies from "./replies";

class Messages extends Component {
  displaySent = () => {
    let msgs = [];
    this.props.messages.map((msg, index) => {
      console.log(msg);
      if (msg.from !== this.props.userName) {
        msgs.push(<Sent key={index} messages={msg.text} />);
      } else {
        msgs.push(<Replies key={index} messages={msg.text} />);
      }
    });
    return msgs;
  };

  render() {
    return (
      <div className="messages">
        <ul>{this.displaySent()}</ul>
      </div>
    );
  }
}

export default Messages;
