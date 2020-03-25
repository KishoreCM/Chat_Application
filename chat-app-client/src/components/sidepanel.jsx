import React, { Component } from "react";
import Profile from "./profile";
import Search from "./search";
import Contacts from "./contacts";

class SidePanel extends Component {
  render() {
    return (
      <React.Fragment>
        <div id="sidepanel">
          <Profile user={this.props.user} />
          <Search />
          <Contacts
            users={this.props.users}
            handleClick={this.props.handleClick}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default SidePanel;
