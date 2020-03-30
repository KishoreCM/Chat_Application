import React, { Component } from "react";

class Sent extends Component {
  render() {
    return (
      <li className="sent">
        <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
        <p>
          {this.props.messages}
          <br />
          <i style={{ fontWeight: 300, fontSize: "12px", float: "right" }}>
            {new Date(this.props.time).getHours() +
              ":" +
              (new Date(this.props.time).getMinutes() < 10 ? "0" : "") +
              new Date(this.props.time).getMinutes()}
          </i>
        </p>
      </li>
    );
  }
}

export default Sent;
