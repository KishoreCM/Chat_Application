import React, { Component } from "react";

class Profile extends Component {
  state = {};
  render() {
    return (
      <div id="profile">
        <div className="wrap">
          <img
            id="profile-img"
            src="http://emilcarlsson.se/assets/mikeross.png"
            className="online"
            alt=""
          />
          <p>Kishore</p>
        </div>
      </div>
    );
  }
}

export default Profile;
