import "./login.css";
import "./dist/css/adminlte.min.css";
import "./plugins/fontawesome-free/css/all.min.css";

// import "./plugins/jquery/jquery.min.js";
// import "./plugins/bootstrap/js/bootstrap.min.js";
// import "./dist/js/adminlte.min.js";

import React, { useEffect, useState, StrictMode } from "react";
import { Link } from "react-router-dom";

export default function ChangePassword(props) {
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
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card card-outline card-secondary">
            <div className="card-header text-center">
              <p className="title">
                <b>THE</b>BOX
              </p>
            </div>
            <div className="card-body">
              <p className="login-box-msg">
                You are only one step a way from your new password, recover your
                password now.
              </p>
              <form
                method="post"
                className="needs-validation"
                id="passwordForm"
                autocomplete="off"
                novalidate
              >
                <div className="input-group mb-4">
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
                <div className="input-group mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="ConfirmPassword"
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
                <div id="validationMessage" style={{ color: "red" }}></div>
                <div className="row mb-3">
                  <div className="col-12">
                    <button type="button" className="btn btn-dark btn-block">
                      Change password
                    </button>
                  </div>
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
