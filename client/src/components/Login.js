import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";

import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.get({
        email,
        password,
      });

      localStorage.setItem("token", response.data.message);
      toast.success("Login Successgully!");
      setAuth(true);
    } catch (error) {
      console.error(error.message);
      setAuth(false);
      toast.error("Incorrect credentials");
    }
  };

  return (
    <>
      <div
        style={{
          margin: "25% 15%",
          padding: "3rem",
          backgroundColor: "#333",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{ textAlign: "center", paddingBottom: "10px", color: "#fff" }}
        >
          {" "}
          Login{" "}
        </h1>
        <form className="ui form" onSubmit={onSubmitForm}>
          <div className="field" style={{ paddingBottom: "10px" }}>
            <input
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="field" style={{ paddingBottom: "10px" }}>
            <input
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="ui two buttons">
            <button className="ui positive button fluid" type="sign up">
              Submit
            </button>
            <button className="ui red button fluid" type="cancel">
              Cancel
            </button>
          </div>
          <div style={{ paddingTop: "20px", color: "#fff" }}>
            Not a member yet?{" "}
            <Link to="/register" style={{ color: "yellow" }}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
