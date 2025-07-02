import React from "react";
import { useFormik } from "formik";
import { signupSchema3 } from "../../../schemas";

function Passworddiv({ inputData, setInputData, handleGoNext, handleGoBack }) {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: inputData,
      validationSchema: signupSchema3,
      onSubmit: (values) => {
        setInputData({ ...inputData, ...values });

        handleGoNext();
      },
    });
  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="row" id="passworddiv">
        <div className="col-md-12">
          <div className="from-group mb-3">
            <label htmlFor="uname">GST Number</label>
            <input
              type="text"
              className="form-control"
              name="gst_no"
              onChange={(e) => {
                setInputData({ ...inputData, gst_no: e.target.value });
                handleChange(e);
              }}
              onBlur={handleBlur}
              required
            />
            <label className="text-danger">
              {errors.gst_no && touched.gst_no ? errors.gst_no : null}
            </label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="password">Create Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={(e) => {
                setInputData({ ...inputData, password: e.target.value });
                handleChange(e);
              }}
              onBlur={handleBlur}
              required
            />
            <label className="text-danger">
              {errors.password && touched.password ? errors.password : null}
            </label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="re-password"
              name="cpassword"
              onChange={handleChange}
              required
            />
            <label className="text-danger">
              {errors.cpassword && touched.cpassword ? errors.cpassword : null}
            </label>
            <div className="field">
              <span id="message"></span>
            </div>
          </div>

          <div className="social-auth-links mt-2 mb-3 d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-dark back"
              onClick={handleGoBack}
            >
              Back
            </button>
            <button
              type="submit"
              id="next"
              className="btn btn-dark mx-2"
            >
              <i className="fas fa-registered mr-2"></i> Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Passworddiv;
