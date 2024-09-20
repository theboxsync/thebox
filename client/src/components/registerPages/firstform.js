import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { signupSchema1 } from "../../schemas";

function Firstform({ inputData, setInputData, handleGoNext }) {
  const [emailError, setEmailError] = useState("");

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: inputData,
    validationSchema: signupSchema1,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("logo", values.logo);
        const uploadResponse = await axios.post(
          "http://localhost:3001/api/uploadlogo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (uploadResponse.data.message === "File uploaded successfully") {
          const logoPath = uploadResponse.data.filePath;
          const response = await axios.post(
            "http://localhost:3001/api/emailcheck",
            { email: values.email }
          );

          if (response.data.message === "User Already Exists") {
            setEmailError("Email is already registered.");
          } else {
            setEmailError("");
            setInputData({ ...inputData, ...values, logo: logoPath });
            handleGoNext();
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFileChange = (event) => {
    setFieldValue("logo", event.target.files[0]);
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="row" id="first-form">
        <div className="col-md-12">
          <div className="from-group mb-3">
            <label htmlFor="restaurantName">Company Name</label>
            <input
              type="text"
              className="form-control"
              id="restaurantName"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="text-danger">
              {errors.name && touched.name ? errors.name : null}
            </label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="restaurantLogo">Company Logo</label>
            <input
              type="file"
              className="form-control"
              id="restaurantLogo"
              name="logo"
              accept="image/*"
              onChange={handleFileChange}
              onBlur={handleBlur}
              required
            />
            <label className="text-danger">
              {errors.logo && touched.logo ? errors.logo : null}
            </label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="Email">Email</label>
            <input
              type="text"
              className="form-control"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="text-danger">
              {errors.email && touched.email ? errors.email : null}
            </label>
            <label className="text-danger">{emailError}</label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="phone">Contact No.</label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              id="phone"
              maxLength="10"
              pattern="[0-9]{10}"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <label className="text-danger">
              {errors.mobile && touched.mobile ? errors.mobile : null}
            </label>
          </div>
          <div className="buttons">
            <button
              type="submit"
              id="next"
              name="next"
              className="btn btn-outline-dark next"
            >
              Go Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Firstform;
