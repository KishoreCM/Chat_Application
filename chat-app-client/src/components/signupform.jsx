import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class SignUpForm extends Component {
  state = {
    name: "",
    phone: "",
    password: "",
    nameError: "",
    phoneError: "",
    passwordError: ""
  };

  onNameChange = e => {
    this.setState({ name: e.target.value });
  };

  onPhoneChange = e => {
    this.setState({ phone: e.target.value });
  };

  onPassTyped = e => {
    this.setState({ password: e.target.value });
    //console.log(this.state);
  };

  alreadyUser = prevUsers => {
    const currentUser = this.state;
    const userAlready = prevUsers.filter(
      user => user.phone === currentUser.phone
    );
    //console.log(userAlready);
    return userAlready[0] === undefined ? false : true;
  };

  validateForm() {
    let error = false;
    let phRegEx = /^\d{10}$/;

    this.setState({
      nameError: "",
      phoneError: "",
      passwordError: ""
    });

    if (!this.state.name) {
      this.setState({ nameError: "Name cannot be empty" });
      error = true;
    }

    if (!phRegEx.test(this.state.phone)) {
      this.setState({ phoneError: "Phone number isn't valid" });
      error = true;
    }

    if (this.state.password.length < 5) {
      this.setState({ passwordError: "Password atleast must be of length 5" });
      error = true;
    }

    return error ? true : false;
  }

  submitDetails = e => {
    e.preventDefault();

    if (!this.validateForm()) {
      let getPrevUsers;
      axios
        .get("/app/get/users")
        .then(response => {
          //console.log("Response: ", response.data.rows);
          if (response.data.rows[0]) {
            getPrevUsers = response.data.rows;
          }

          console.log("Prev users: ", getPrevUsers);

          let alreadyUser = !getPrevUsers
            ? false
            : this.alreadyUser(getPrevUsers);
          console.log("Already user?..." + alreadyUser);

          if (alreadyUser) {
            alert(
              "The user with this credentials is been registered already. Try loggin in..."
            );
          } else {
            let userData = new FormData();
            userData.append("name", this.state.name);
            userData.append("phone", this.state.phone);
            userData.append("password", this.state.password);

            axios({
              method: "post",
              url: "app/add/users",
              data: userData,
              headers: { "Content-Type": "multipart/form-data" }
            })
              .then(response => {
                //handle success
                console.log(response);
                alert("Successfully Registered");
              })
              .catch(response =>
                //handle error
                console.log(response)
              );
          }

          this.setState({
            name: "",
            phone: "",
            password: ""
          });

          this.props.history.push("/login");
        })
        .catch(error => console.log(error));
    }
  };

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
              onChange={this.onNameChange}
              required
            />
            <div className="errorPanel">{this.state.nameError}</div>
            <input
              name="phone"
              placeholder="What is your number?"
              className="name-input input-field"
              onChange={this.onPhoneChange}
              required
            />
            <div className="errorPanel">{this.state.phoneError}</div>
            <input
              name="password"
              placeholder="Password?"
              className="password-input input-field"
              type="password"
              onChange={this.onPassTyped}
              required
            />
            <div className="errorPanel">{this.state.passwordError}</div>
            <button
              name="submit"
              className="submit-button"
              type="submit"
              onClick={this.submitDetails}
            >
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
