import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../auth";
import axios from "axios";

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = { phone: "", password: "", loginError: "" };
  }

  setPhone = value => {
    this.setState({ phone: value });
  };

  setPass = value => {
    this.setState({ password: value });
  };

  isAuthorised = e => {
    e.preventDefault();

    this.setState({ loginError: "" });

    let { phone } = this.state;
    let { password } = this.state;

    let registeredUsers;
    let isRegistered;

    axios
      .get("/app/get/users")
      .then(response => {
        registeredUsers = response.data.rows;

        isRegistered = registeredUsers.filter(
          user => user.phone === phone && user.password === password
        );

        if (isRegistered[0] === undefined) {
          this.setState({ loginError: "Invalid Mail or Password :(" });
        } else {
          auth.login(phone, () =>
            this.props.history.push(`/chat?userPh=${this.state.phone}`)
          );
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="form-body">
        <center>
          <form>
            <div style={{ padding: "30px" }}></div>
            <input
              name="phone"
              placeholder="What is your number?"
              className="name-input input-field"
              onChange={event => this.setPhone(event.target.value)}
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
            <div className="errorPanel">{this.state.loginError}</div>
            <button
              name="submit"
              className="submit-button"
              type="submit"
              onClick={this.isAuthorised}
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
