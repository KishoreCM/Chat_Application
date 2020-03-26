import React, { Component } from "react";

class ContactList extends Component {
  setActiveFlag = false;

  componentDidUpdate() {
    this.setActiveFlag = false;
  }

  setActive = () => {
    return this.setActiveFlag ? "contact active" : "contact";
  };

  render() {
    return (
      <li
        className={this.setActive()}
        onClick={() => {
          this.props.handleClick(this.props.user);
          this.setActiveFlag = true;
        }}
      >
        <div className="wrap">
          <span className="contact-status online"></span>
          <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
          <div className="meta">
            <p className="name">{this.props.user.name}</p>
            {/*<p className="preview">
              You just got LITT up, Mike.You just got LITT up, Mike.You just got
              LITT up, Mike.You just got LITT up, Mike.You just got LITT up,
              Mike.You just got LITT up, Mike.
            </p>*/}
          </div>
        </div>
      </li>
    );
  }
}

export default ContactList;
