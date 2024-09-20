import "./login.css";
import "./dist/css/adminlte.min.css";
import "./plugins/fontawesome-free/css/all.min.css";

// import "./plugins/jquery/jquery.min.js";
// import "./plugins/bootstrap/js/bootstrap.min.js";
// import "./dist/js/adminlte.min.js";

import React, { useEffect, useState, StrictMode } from "react";
import { Link } from "react-router-dom";

export default function OtpVerification(props) {
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
                Enter Your email otp for complete your registration
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
                    maxLength={6}
                    id="otp"
                    name="otp"
                    placeholder="Enter your OTP"
                    required
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-dark btn-block"
                      id="subotp"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
