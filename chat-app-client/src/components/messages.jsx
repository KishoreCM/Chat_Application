import React, { Component } from "react";
import Sent from "./sent";
import Replies from "./replies";
//import ScrollToBottom from "react-scroll-to-bottom";
import { animateScroll } from "react-scroll";
import ReactEmoji from "react-emoji";

class Messages extends Component {
  displaySent = () => {
    let msgs = [];
    //console.log("Fetched Msgs: ", this.props.fetchedMsgs);

    this.props.fetchedMsgs.map((msg, index) => {
      if (msg === "You haven't made any conversation yet") {
        msgs.push(
          <Sent key={"fetchedMsg" + index} messages={ReactEmoji.emojify(msg)} />
        );
      } else {
        if (msg.sent_msgs !== null) {
          msgs.push(
            <Sent
              key={"fetchedMsg" + index}
              messages={ReactEmoji.emojify(msg.sent_msgs)}
            />
          );
        } else {
          msgs.push(
            <Replies
              key={"fetchedMsg" + index}
              messages={ReactEmoji.emojify(msg.received_msgs)}
            />
          );
        }
      }
    });

    this.props.messages.map((msg, index) => {
      //console.log("messages component: ", msg);
      if (
        msg.text !== "" &&
        (msg.from === this.props.contactUserPhone ||
          msg.from === this.props.userPh)
      ) {
        if (msg.from === this.props.userPh) {
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
