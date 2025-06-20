// src/components/Loading.js
import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src="../../dist/img/loading.gif" alt="Loading..." className="loading-gif" />
    </div>
  );
};

export default Loading;
