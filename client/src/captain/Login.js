import "../login.css";
import "../dist/css/adminlte.min.css";
import "../plugins/fontawesome-free/css/all.min.css";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const data = { restaurant_code: "", username: "", password: "" };
  const [inputData, setInputData] = useState(data);
  const [wrongMsg, setWrongMsg] = useState();
  const [flag, setFlag] = useState(false);

  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/userdata`,
        {
          withCredentials: true,
        }
      );
      if (response.data !== "Null") {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  function handleData(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      inputData.restaurant_code === "" ||
      inputData.username === "" ||
      inputData.password === ""
    ) {
      alert("Please fill all the fields");
    } else {
      console.log("Input data: ", inputData); // Log to check the input data
      axios
        .post(`${process.env.REACT_APP_CAPTAIN_API}/captain-login`, inputData, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "Logged In") {
            navigate("/dashboard");
          } else {
            setWrongMsg(res.data.message);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  return (
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
              {/* Restaurant ID field */}
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="restaurant_code"
                  name="restaurant_code"
                  placeholder="Restaurant Code"
                  value={inputData.restaurant_code}
                  onChange={handleData}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-building"></span>
                  </div>
                </div>
              </div>

              {/* Username field */}
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={inputData.username}
                  onChange={handleData}
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-user"></span>
                  </div>
                </div>
              </div>

              {/* Password field */}
              <div className="input-group mb-2">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={inputData.password}
                  onChange={handleData}
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

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
              <div>
                <span>
                  <b className="text-danger">{wrongMsg}</b>
                </span>
              </div>
            </form>

            <div className="mb-1 text-right">
              <Link to="/forgot-password" className="text-dark">
                <b> Forgot password ? </b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
