import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/logout", { withCredentials: true })
      .then((res) => {
        console.log("Logged Out");
        navigate("/login");
      });
  });
  return <div></div>;
}

export default Logout;
