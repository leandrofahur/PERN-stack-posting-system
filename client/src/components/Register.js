import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/UserService";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.create({
        username,
        email,
        password,
      });

      localStorage.setItem("token", response.data.message);
      setAuth(true);
    } catch (error) {
      console.error(error.message);
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
          Sign Up{" "}
        </h1>
        <form className="ui form" onSubmit={onSubmitForm}>
          <div className="field" style={{ paddingBottom: "10px" }}>
            <input
              type="text"
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => onChange(e)}
            />
          </div>
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
            Already a member?{" "}
            <Link to="/login" style={{ color: "yellow" }}>
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
