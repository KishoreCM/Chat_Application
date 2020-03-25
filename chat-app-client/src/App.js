import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ChatBox from "./components/chatbox";
import SignUpForm from "./components/signupform";
import LogInForm from "./components/loginform";
import { ProtectedRoute } from "./components/protectedroute.js";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/" component={SignUpForm} />
        <Route path="/login" component={LogInForm} />
        <ProtectedRoute path="/chat" component={ChatBox} />
        <Route path="*" component={() => "404. Page not found..."} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
