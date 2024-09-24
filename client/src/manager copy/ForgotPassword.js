import "./login.css";
import "./dist/css/adminlte.min.css";
import "./plugins/fontawesome-free/css/all.min.css";

// import "./plugins/jquery/jquery.min.js";
// import "./plugins/bootstrap/js/bootstrap.min.js";
// import "./dist/js/adminlte.min.js";

import React, { useEffect, useState, StrictMode } from "react";
import { Link } from "react-router-dom";

export default function Login(props) {
  const data = { email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log("registered");
  }, [flag]);
  function handleData(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
    console.log(inputData);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (inputData.email === "" || inputData.password === "") {
      alert("please fill all the fields");
    } else {
      setFlag(true);
    }
  }
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="card card-outline card-secondary">
            <div className="card-header text-center">
              <p className="title">
                <b>THE</b>BOX
              </p>
            </div>
            <div className="card-body">
              <p className="login-box-msg">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>
              <form>
                <div className="form-group mb-2">
                  <label htmlFor="email">Enter Your Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    required
                  />
                  <label className="text-danger mb-1" id="email_error"></label>
                  <label className="invalid-feedback">
                    Please enter a valid Email
                  </label>
                </div>
                <div className="social-auth-links text-center mb-3">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block"
                    name="submit"
                    id="submit"
                  >
                    <img src="dist/img/update.svg" /> Generate OTP
                  </button>
                </div>
              </form>
              <div className="mb-1 text-right">
                <Link to="/login" className="text-dark ">
                  {" "}
                  <b> Login </b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
