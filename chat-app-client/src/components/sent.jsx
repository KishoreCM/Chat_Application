import React, { Component } from "react";

class Sent extends Component {
  render() {
    return (
      <li className="sent">
        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
        <p>{this.props.messages}</p>
      </li>
    );
  }
}

export default Sent;
