import React, { Component } from "react";
import Sent from "./sent";
import Replies from "./replies";
//import ScrollToBottom from "react-scroll-to-bottom";
import { animateScroll } from "react-scroll";
import ReactEmoji from "react-emoji";

class Messages extends Component {
  setDate = "";

  isYesterdayOrToday = date => {
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return new Date(date).toLocaleDateString() ===
      new Date().toLocaleDateString()
      ? "Today"
      : new Date(date).toLocaleDateString() === yesterday.toLocaleDateString()
      ? "Yesterday"
      : "";
  };

  displaySent = () => {
    let msgs = [];
    let yesterdayOrToday = "";
    //console.log("Fetched Msgs: ", this.props.fetchedMsgs);

    this.props.fetchedMsgs.map((msg, index) => {
      if (msg === "You haven't made any conversation yet") {
        msgs.push(
          <Sent key={"fetchedMsg" + index} messages={ReactEmoji.emojify(msg)} />
        );
      } else {
        if (msg.sent_msgs !== null) {
          if (
            new Date(this.setDate).toLocaleDateString() !==
            new Date(msg.sent_at).toLocaleDateString()
          ) {
            this.setDate = msg.sent_at;
            yesterdayOrToday = this.isYesterdayOrToday(this.setDate);
            if (yesterdayOrToday) {
              msgs.push(
                <li className="display_date" key={"fetchedMsgDate" + index}>
                  <hr className="hr-text" data-content={yesterdayOrToday} />
                </li>
              );
            } else {
              msgs.push(
                <li className="display_date" key={"fetchedMsgDate" + index}>
                  <hr
                    className="hr-text"
                    data-content={new Date(this.setDate).toDateString()}
                  />
                </li>
              );
            }
          }
          msgs.push(
            <Sent
              key={"fetchedMsg" + index}
              messages={ReactEmoji.emojify(msg.sent_msgs)}
              time={msg.sent_at}
            />
          );
        } else {
          if (
            new Date(this.setDate).toLocaleDateString() !==
            new Date(msg.received_at).toLocaleDateString()
          ) {
            this.setDate = msg.received_at;
            yesterdayOrToday = this.isYesterdayOrToday(this.setDate);
            if (yesterdayOrToday) {
              msgs.push(
                <li className="display_date" key={"fetchedMsgDate" + index}>
                  <hr className="hr-text" data-content={yesterdayOrToday} />
                </li>
              );
            } else {
              msgs.push(
                <li className="display_date" key={"fetchedMsgDate" + index}>
                  <hr
                    className="hr-text"
                    data-content={new Date(this.setDate).toDateString()}
                  />
                </li>
              );
            }
          }
          msgs.push(
            <Replies
              key={"fetchedMsg" + index}
              messages={ReactEmoji.emojify(msg.received_msgs)}
              time={msg.received_at}
            />
          );
        }
      }
    });
    this.setDate = "";

    this.props.messages.map((msg, index) => {
      //console.log("messages component: ", msg);
      if (
        msg.text !== "" &&
        (msg.from === this.props.contactUserPhone ||
          msg.from === this.props.userPh)
      ) {
        if (msg.from === this.props.userPh) {
          msgs.push(
            <Sent
              key={index}
              messages={ReactEmoji.emojify(msg.text)}
              time={msg.time}
            />
          );
        } else {
          msgs.push(
            <Replies
              key={index}
              messages={ReactEmoji.emojify(msg.text)}
              time={msg.time}
            />
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
