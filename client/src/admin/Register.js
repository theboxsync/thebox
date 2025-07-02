import "../register.css";

import React, { useEffect, useState, StrictMode } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";

import Loading from "./components/Loading";
import Firstform from "./components/registerPages/firstform";
import Secondform from "./components/registerPages/secondform";
import Passworddiv from "./components/registerPages/passworddiv";

export default function Register(props) {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const data = {
    restaurant_code: "",
    name: "",
    logo: "",
    gst_no: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    country: "IN",
    state: "",
    city: "",
    pincode: "",
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

  const handleGoBack = () => {
    setFormpage(formpage - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    console.log(inputData);
    axios
      .post(`${process.env.REACT_APP_ADMIN_API}/user/register`, inputData, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Registered") {
          console.log("Registered Here ");
          navigate("/select-plan");
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

<<<<<<< HEAD
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
  // Handle the resize event for dynamic viewport height
  useEffect(() => {
    const resizeDivHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial height
    resizeDivHeight();

    // Recalculate on window resize
    window.addEventListener('resize', resizeDivHeight);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', resizeDivHeight);
    };
  }, []);

=======
>>>>>>> fa7a395de0b56c39b0f03c24397f2d780a5adda9
  return (
    <>
      {isLoading && <Loading />}
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
                <div>
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
                      You're one step away from getting started. Fill in the
                      form below to complete your registration.
                    </p>
                  </div>
                  <div id="registerPages">
                    {formpage === 0 && (
                      <Firstform
                        inputData={inputData}
                        setInputData={setInputData}
                        handleGoNext={handleGoNext}
                      />
                    )}
                    {formpage === 1 && (
                      <Secondform
                        inputData={inputData}
                        setInputData={setInputData}
                        handleGoNext={handleGoNext}
                        handleGoBack={handleGoBack}
                      />
                    )}
                    {formpage === 2 && (
                      <Passworddiv
                        inputData={inputData}
                        setInputData={setInputData}
                        handleGoNext={handleGoNext}
                        handleGoBack={handleGoBack}
                      />
                    )}
                  </div>
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
