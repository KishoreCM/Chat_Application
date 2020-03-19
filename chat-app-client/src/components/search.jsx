import React, { Component } from "react";

class Search extends Component {
  state = {};
  render() {
    return (
      <div id="search">
        <label>
          <i className="fa fa-search" aria-hidden="true"></i>
        </label>
        <input type="text" placeholder="Search contacts..." />
      </div>
    );
  }
}

export default Search;
