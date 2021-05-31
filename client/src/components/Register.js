import React from "react";

const Register = ({ setAuth }) => {
  return (
    <>
      <h1> Register </h1>
      <button
        onClick={() => {
          setAuth(true);
        }}
      >
        {" "}
        Authenticate
      </button>
    </>
  );
};

export default Register;
