import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

import UserService from "./services/UserService";

toast.configure();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.verify(token);
      setAuth(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  }, []);

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
                isAuthenticated ? (
                  <Redirect to="dashboard" />
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
