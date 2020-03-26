import React, { Component } from "react";
import ContactList from "./contactlist";
import auth from "../auth";

class Contacts extends Component {
  displayContacts = () => {
    let contactList = [];
    this.props.users.map((user, index) => {
      contactList.push(
        <ContactList
          key={index}
          id={index}
          user={user}
          handleClick={this.props.handleClick}
        />
      );
    });
    return contactList;
  };

  render() {
    return (
      <div id="contacts">
        <ul>
          {this.displayContacts()}
          {/*<li className="contact active">
            <div className="wrap">
              <span className="contact-status away"></span>
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <div className="meta">
                <p className="name">Harvey Specter</p>
                <p className="preview">
                  <span>You: </span>Hi!You just got LITT up, Mike.You just got
                  LITT up, Mike.You just got LITT up, Mike.You just got LITT up,
                  Mike.You just got LITT up, Mike.You just got LITT up, Mike.
                </p>
              </div>
            </div>
    </li>*/}
        </ul>
      </div>
    );
  }
}

export default Contacts;
