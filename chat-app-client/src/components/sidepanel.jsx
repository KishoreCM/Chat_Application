import React, { Component } from "react";
import Profile from "./profile";
import Search from "./search";
import Contacts from "./contacts";

class SidePanel extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div id="sidepanel">
          Sidepanel
          <Profile />
          <Search />
          <Contacts />
        </div>
      </React.Fragment>
    );
  }
}

export default SidePanel;
