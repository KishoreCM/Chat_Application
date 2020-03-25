import React, { Component } from "react";
import ContactProfile from "./contactprofile";
import Messages from "./messages";
import MessageInput from "./messageinput";

class Content extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="content">
          <ContactProfile
            userName={this.props.user}
            contactUserName={this.props.contactUserName}
          />
          <Messages userName={this.props.user} messages={this.props.messages} />
          <MessageInput sendMessage={this.props.sendMessage} />
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
