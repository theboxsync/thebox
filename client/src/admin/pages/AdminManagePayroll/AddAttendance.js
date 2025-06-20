import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { addQSR } from "../../../schemas";
import Loading from "../../components/Loading";

function AddAttendance({ setMainSection, fetchAttendanceData }) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: addQSR,
    onSubmit: (values) => {
      console.log("Submitted", values);
      setIsLoading(true);
      axios
        .post(`${process.env.REACT_APP_ADMIN_API}/attendance/addattendance`, values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          fetchAttendanceData();
          setMainSection("Dashboard");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    },
  });

  return (
    <>
      {isLoading && <Loading />}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add Attendance Panel</h3>
                  <button
                    type="button"
                    className="btn float-right"
                    onClick={() => setMainSection("Dashboard")}
                  >
                    Close
                  </button>
                </div>
                <form
                  autoComplete="off"
                  method="POST"
                  encType="multipart/form-data"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="card-body">
                    <div className="px-3">
                      <div className="row">
                        <div className="form-group col-md-6 mb-0">
                          <label htmlFor="username">Username</label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="text-danger">
                            {formik.errors.username
                              ? formik.errors.username
                              : null}
                          </label>
                        </div>
                        <div className="form-group col-md-6 mb-0">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="text-danger">
                            {formik.errors.password
                              ? formik.errors.password
                              : null}
                          </label>
                        </div>
                      </div>
                      <hr style={{ borderTop: "2px solid lightgrey" }} />
                    </div>

                    <div className="form-group">
                      <button
                        type="submit"
                        name="submit"
                        className="btn btn-dark"
                      >
                        Add Attendance Panel
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AddAttendance;
