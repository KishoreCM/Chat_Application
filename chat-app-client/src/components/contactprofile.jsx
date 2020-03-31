import React, { Component } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import auth from "../auth";

class ContactProfile extends Component {
  indicateTyping = () => {
    if (
      this.props.typingUser &&
      this.props.contactUserPhone &&
      this.props.typingUser === this.props.contactUserPhone
    ) {
      return this.props.indicateTyping;
    }
  };

  render() {
    return (
      <div className="contact-profile">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
        <p>{this.props.contactUserName}</p>
        <p>{this.props.indicateTyping}</p>
        <div style={{ position: "absolute", top: 0, right: "30px" }}>
          <DropdownButton
            id="dropdown-basic-button"
            title={this.props.userName}
          >
            <Dropdown.Item href="/login" onClick={() => auth.logout()}>
              Logout
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default ContactProfile;
