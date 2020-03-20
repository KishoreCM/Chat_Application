import React, { Component } from "react";

class MessageInput extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  setMessage = event => {
    this.setState({ message: event.target.value });
  };

  render() {
    return (
      <div className="message-input">
        <div className="wrap">
          <input
            type="text"
            placeholder="Type your message..."
            value={this.state.name}
            onChange={this.setMessage}
          />
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
