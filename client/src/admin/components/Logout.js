import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/logout`, { withCredentials: true })
      .then((res) => {
        console.log("Logged Out");
        window.location.href = `${process.env.REACT_APP_URL}`;
      });
  });
  return <div></div>;
}

export default Logout;
