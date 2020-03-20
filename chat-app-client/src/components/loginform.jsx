import React, { Component } from "react";
import { Link } from "react-router-dom";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "" };
  }

  setName = value => {
    this.setState({ name: value });
  };

  setEmail = value => {
    this.setState({ email: value });
  };

  setPass = value => {
    this.setState({ password: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.name && this.state.email && this.state.password) {
      this.props.history.push(`/chat?usermail=${this.state.email}`);
    }
  };

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
              onChange={event => this.setName(event.target.value)}
              required
            />
            <input
              name="emailaddress"
              placeholder="What is your email?"
              className="email-input input-field"
              type="email"
              onChange={event => this.setEmail(event.target.value)}
              required
            />
            <input
              name="password"
              placeholder="Password?"
              className="password-input input-field"
              type="password"
              onChange={event => this.setPass(event.target.value)}
              required
            />

            <button
              name="submit"
              className="submit-button"
              type="submit"
              onClick={this.handleSubmit}
            >
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
