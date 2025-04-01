import "../login.css";
import "../dist/css/adminlte.min.css";
import "../plugins/fontawesome-free/css/all.min.css";

import React, { useEffect, useState, StrictMode } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const data = { email: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [wrongMsg, setWrongMsg] = useState();

  const navigate = useNavigate();

  function handleData(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (inputData.email === "" || inputData.password === "") {
      alert("please fill all the fields");
    } else {
      axios
        .post(`${process.env.REACT_APP_ADMIN_API}/user/login`, inputData, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "Logged In") {
            navigate("/dashboard");
          } else {
            setWrongMsg(res.data.message); // Print server response to console
          }
        })
        .catch((err) => console.error(err));
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
              <p className="login-box-msg">Sign in to start your session</p>

              <form method="post" onSubmit={handleSubmit}>
                <div className="input-group mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    placeholder="Email"
                    value={inputData.email}
                    onChange={handleData}
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope"></span>
                    </div>
                  </div>
                </div>
                <label
                  htmlFor="email"
                  className="text-danger mb-1"
                  id="emailError"
                ></label>
                <div className="input-group mb-2">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={inputData.password}
                    onChange={handleData}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <label className="text-danger mb-0" id="email_pass"></label>
                <div className="social-auth-links text-center mb-3">
                  <button
                    type="submit"
                    className="btn btn-block btn-primary"
                    id="submit"
                    name="submit"
                  >
                    <i className="fas fa-unlock mr-2"></i> Login
                  </button>
                </div>
                <div className="text-danger font-weight-bold">{wrongMsg}</div>
              </form>

              <div className="mb-1 text-right">
                <Link to="/forgot-password" className="text-dark ">
                  <b> Forgot password ? </b>
                </Link>
              </div>

              <div className="line my-4"></div>
              <div className="mb-0 text-center ">
                <Link to="/register" className="text-dark ">
                  <b> Sign Up </b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
