import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  state = {};
  render() {
    return (
      <div className="form-body">
        <center>
          <form>
            <h3 style={{ color: "white", padding: "30px" }}>
              Create an account
            </h3>
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
              Find Pals!
            </button>
            <h6 style={{ padding: "30px" }}>
              <Link to="/login">Already have an account?, Log In!</Link>
            </h6>
          </form>
        </center>
      </div>
    );
  }
}

export default SignUpForm;
