import "./login.css";
import "./dist/css/adminlte.min.css";
import "./plugins/fontawesome-free/css/all.min.css";

// import "./plugins/jquery/jquery.min.js";
// import "./plugins/bootstrap/js/bootstrap.min.js";
// import "./dist/js/adminlte.min.js";

import React, { useEffect, useState, StrictMode } from "react";
import { Link } from "react-router-dom";

export default function RegistrationComplete(props) {
  return (
    <>
      <div className="login-page">
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <div className="">
            <div className="mb-4 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-success"
                width="75"
                height="75"
                fill="currentColor"
                className="bi bi-check-circle-fill"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            </div>
            <div className="text-center">
              <h1>Thank You !</h1>
              <p>Your Restaurant or Hotel Successfully registered</p>
              <Link to="/login" className="btn btn-dark">
                {" "}
                Login
              </Link>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
