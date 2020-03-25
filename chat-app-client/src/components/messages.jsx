import React, { Component } from "react";
import Sent from "./sent";
import Replies from "./replies";
//import ScrollToBottom from "react-scroll-to-bottom";
import { animateScroll } from "react-scroll";
import ReactEmoji from "react-emoji";

class Messages extends Component {
  displaySent = () => {
    let msgs = [];
    this.props.messages.map((msg, index) => {
      //console.log(msg);
      if (msg.text !== "") {
        if (msg.from === this.props.userName) {
          msgs.push(
            <Sent key={index} messages={ReactEmoji.emojify(msg.text)} />
          );
        } else {
          msgs.push(
            <Replies key={index} messages={ReactEmoji.emojify(msg.text)} />
          );
        }
      }
    });
    return msgs;
  };

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "messages"
    });
  }
  render() {
    return (
      <div className="messages" id="messages">
        <ul>{this.displaySent()}</ul>
      </div>
    );
  }
}

export default Messages;
