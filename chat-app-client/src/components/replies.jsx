import React, { Component } from "react";

class Replies extends Component {
  render() {
    return (
      <li className="replies">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
        <p>{this.props.messages}</p>
      </li>
    );
  }
}

export default Replies;
