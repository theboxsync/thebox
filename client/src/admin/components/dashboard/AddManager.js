import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { addManager } from "../../../schemas";

function AddManager({ setMainSection }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: addManager,
    onSubmit: (values) => {
      console.log("Submitted", values);
      axios
        .post(`${process.env.REACT_APP_ADMIN_API}/addmanager`, values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setMainSection("TableSection");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Table Management</h3>
                <button
                  type="button"
                  className="btn float-right"
                  onClick={() => {
                    setMainSection("TableSection");
                  }}
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
                  <div className="px-3 ">
                    <div className="row">
                      <div className="form-group col-md-4 mb-0">
                        <label htmlFor="username">
                          Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="text-danger">
                          {formik.errors.username ? formik.errors.username : null}
                        </label>
                      </div>
                      <div className="form-group col-md-4 mb-0">
                        <label htmlFor="password">
                          Password
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="password"
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="text-danger">
                          {formik.errors.password ? formik.errors.password : null}
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
                      <img src="../../dist/img/add.svg" alt="Add" />
                      Add Manager
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddManager;
