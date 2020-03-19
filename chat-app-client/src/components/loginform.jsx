import React, { Component } from "react";
import { Link } from "react-router-dom";

class LogInForm extends Component {
  state = {};
  render() {
    return (
      <div className="form-body">
        <center>
          <form>
            <div style={{ padding: "30px" }}></div>
            <input
              name="name"
              placeholder="What is your name?"
              className="name-input input-field"
              required
            />
            <input
              name="emailaddress"
              placeholder="What is your email?"
              className="email-input input-field"
              type="email"
              required
            />
            <input
              name="password"
              placeholder="Password?"
              className="password-input input-field"
              type="password"
              required
            />

            <button name="submit" className="submit-button" type="submit">
              Connect to Pals!
            </button>
            <h6 style={{ padding: "30px" }}>
              <Link to="/">Don't have an account?, Sign Up!</Link>
            </h6>
          </form>
        </center>
      </div>
    );
  }
}

export default LogInForm;
