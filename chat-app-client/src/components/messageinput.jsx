import React, { Component } from "react";

class MessageInput extends Component {
  state = {};
  render() {
    return (
      <div className="message-input">
        <div className="wrap">
          <input type="text" placeholder="Type your message..." />
          <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
          <button className="submit">
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default MessageInput;
