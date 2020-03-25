class Auth {
  login(userPh, callback) {
    sessionStorage.setItem("LoggedInUser", userPh);
    callback();
  }

  logout() {
    sessionStorage.removeItem("LoggedInUser");
    //sessionStorage.removeItem("current_grp_switch");
    //callback();
  }

  isAuthenticated() {
    let authenticated = sessionStorage.getItem("LoggedInUser");
    return authenticated;
  }

  getCurrentUser() {
    return sessionStorage.getItem("LoggedInUser");
  }
}

export default new Auth();
