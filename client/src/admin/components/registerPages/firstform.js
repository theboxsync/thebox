import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { signupSchema1 } from "../../../schemas";

function Firstform({ inputData, setInputData, handleGoNext }) {
  const [emailError, setEmailError] = useState("");
  const [logoError, setLogoError] = useState("");

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
    enableReinitialize: true, 
    validationSchema: signupSchema1,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const formData = new FormData();
        formData.append("logo", values.logo);
        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/upload/uploadlogo`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(uploadResponse.data);
        if (uploadResponse.data.message === "File uploaded successfully") {
          const logoPath = uploadResponse.data.logo;
          const response = await axios.post(
            `${process.env.REACT_APP_ADMIN_API}/user/emailcheck`,
            { email: values.email }
          );

          if (response.data.message === "User Already Exists") {
            setEmailError("Email is already registered.");
          } else {
            setEmailError("");
            setInputData({
              ...inputData,
              ...values,
              logo: values.logo,
              logoPath,
              logoPreview: URL.createObjectURL(values.logo),
            });
            handleGoNext();
          }
        }
        console.log("Input Data : ", inputData);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1 MB
        setLogoError("Logo must be less than 1 MB.");
        event.target.value = ""; // optional: reset file input
        setFieldValue("logo", null);
      } else {
        setLogoError(""); // clear previous error
        setFieldValue("logo", file);
      }
    } else {
      setLogoError(""); // clear error if no file selected
    }
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
            />
            {/* Preview Image */}
            {(values.logo || inputData.logoPreview) && (
              <img
                src={
                  values.logo
                    ? URL.createObjectURL(values.logo)
                    : inputData.logoPreview
                }
                alt="Preview"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
            )}

            <label className="text-danger">
              {logoError || (errors.logo && touched.logo ? errors.logo : null)}
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
          <div className="buttons d-flex justify-content-end">
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
