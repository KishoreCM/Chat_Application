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
            value={this.state.message}
            onChange={this.setMessage}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.setState({ message: "" });
                this.props.sendMessage(this.state.message);
              }
            }}
          />
          <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
          <button
            className="submit"
            type="submit"
            onClick={e => {
              e.preventDefault();
              this.setState({ message: "" });
              this.props.sendMessage(this.state.message);
            }}
          >
            <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default MessageInput;
