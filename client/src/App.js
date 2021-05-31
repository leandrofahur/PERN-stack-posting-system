import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <Router>
        <div className="ui container">
          <Switch>
            <Route
              exact
              path="/login"
              render={(props) =>
                isAuthenticated ? (
                  <Redirect to="dashboard" />
                ) : (
                  <Login {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Redirect to="dasboard" />
                ) : (
                  <Register {...props} setAuth={setAuth} />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="login" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
