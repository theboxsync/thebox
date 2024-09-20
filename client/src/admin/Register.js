import "./register.css";

import React, { useEffect, useState, StrictMode } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

import Firstform from "./components/registerPages/firstform";
import Secondform from "./components/registerPages/secondform";
import Passworddiv from "./components/registerPages/passworddiv";

export default function Register(props) {
  const navigate = useNavigate();

  const data = {
    restaurant_code: "",
    name: "", // Done By Form
    logo: "", // Done By Form
    gst_no: "", // Done By Form
    email: "", // Done By Form
    password: "", // Done By Form
    mobile: "", // Done By Form
    address: "", // Done By Form
    country: "", // Done By Form
    state: "", // Done By Form
    city: "", // Done By Form
    pincode: "", // Done By Form
    active: "",
  };

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: data,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [inputData, setInputData] = useState(data);

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("registered");
  }, [flag]);

  const [formpage, setFormpage] = useState(0);

  const handleGoNext = async () => {
    setFormpage(formpage + 1);
    if (formpage === 2) {
      handleSubmit();
      console.log("Registered");
      console.log(inputData);
    }
  };

  const handleSubmit = () => {
    console.log(inputData);
    axios
      .post("http://localhost:3001/api/register", inputData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Registered") {
          console.log("Registered Here ");
          navigate("/admin");
        }
      })
      .catch((err) => console.log(err));
  };

  const pageDisplay = () => {
    switch (formpage) {
      case 0:
        return (
          <Firstform
            inputData={inputData}
            setInputData={setInputData}
            handleGoNext={handleGoNext}
          />
        );
      case 1:
        return (
          <Secondform
            inputData={inputData}
            setInputData={setInputData}
            handleGoNext={handleGoNext}
          />
        );
      case 2:
        return (
          <Passworddiv
            inputData={inputData}
            setInputData={setInputData}
            handleGoNext={handleGoNext}
          />
        );
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="row">
          <div className="col-md-3 col-sm-12 col-12">
            <div
              className="card-header text-center my-4"
              style={{ borderBottom: "none" }}
            >
              <p className="title">
                <b>THE</b>BOX
              </p>
            </div>
          </div>
          <div className="col-md-9 col-sm-12 col-12">
            <div className="card card-outline p-md-5">
              <div className="card-body p-md-5">
                <p
                  className="login-box-msg float-right my-4"
                  style={{ fontWeight: "bold" }}
                >
                  1 Month Free Trial
                </p>
                <div>
                  {/* <form
                    action="/login"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={(e) => handleSubmit(e)}
                  > */}
                  <div className="containers my-4">
                    <div className="steps">
                      <span
                        className={formpage >= 0 ? "circle active" : "circle"}
                      ></span>
                      <span
                        className={formpage >= 1 ? "circle active" : "circle"}
                      ></span>
                      <span
                        className={formpage >= 2 ? "circle active" : "circle"}
                      ></span>

                      <div className="progress-bar">
                        <span className="indicator"></span>
                      </div>
                    </div>
                  </div>
                  <div className="container my-5">
                    <h4>Registration form</h4>
                    <p>
                      Fill in the data below. It will take a couple of minutes
                      for the registration.
                    </p>
                  </div>
                  <div id="registerPages">{pageDisplay()}</div>

                  {/* </form> */}
                </div>
                <Link to="/login" className="text-dark float-right">
                  {" "}
                  <b>I already have a membership</b>{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
