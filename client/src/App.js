import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
//my imports
import PrivateRoute from "./components/PrivateRoute"
import BubblePage from "./components/BubblePage"

function App() {
  //creating logout function 
  const logout = () => {
    const token = window.localStorage.getItem("token")

    if (token) {
      window.localStorage.removeItem("token")
    } else {
      alert("You are not logged in anymore.")
    }
  }
  return (
    <Router>
      <div className="App">
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/protected">Bubbles</Link>
        </li>
        <br />
        <li>
          <Link to="/" onClick={logout}>logout</Link>
        </li>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/protected">
            <BubblePage path="/protected"/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
