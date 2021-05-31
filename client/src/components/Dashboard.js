import React, { useEffect, useState } from "react";
import DashboardService from "../services/DashboardService";

const Dashboard = ({ setAuth }) => {
  const [username, setUsername] = useState();

  const getName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await DashboardService.getName(token);
      const jsonObj = response.data.message;
      setUsername(jsonObj["username"]);
    } catch (error) {
      console.error(error.messagem);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <div style={{ paddingTop: "50vh", textAlign: "center" }}>
        <h1>
          {" "}
          Dashboard{" "}
          <span style={{ textDecoration: "underline" }}>{username}</span>
        </h1>
        <button className="ui primary button" onClick={() => setAuth(false)}>
          {" "}
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
