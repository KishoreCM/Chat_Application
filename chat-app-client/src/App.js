import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import ChatBox from "./components/chatbox";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/chat" component={ChatBox} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
