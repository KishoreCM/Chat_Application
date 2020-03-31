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
            typingUser={this.props.typingUser}
            contactUserPhone={this.props.contactUserPhone}
            indicateTyping={this.props.indicateTyping}
          />
          <Messages
            userName={this.props.user}
            messages={this.props.messages}
            fetchedMsgs={this.props.fetchedMsgs}
            contactUserPhone={this.props.contactUserPhone}
            userPh={this.props.userPh}
          />
          <MessageInput
            sendMessage={this.props.sendMessage}
            typingIndicator={this.props.typingIndicator}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Content;
