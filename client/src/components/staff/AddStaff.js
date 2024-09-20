import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddStaff({ setSection }) {
  const staffData = {
    staff_id: "",
    f_name: "",
    l_name: "",
    birth_date: "",
    joining_date: "",
    address: "",
    phone_no: "",
    email: "",
    salary: "",
    photo: "",
    document_type: "",
    id_number: "",
    front_image: "",
    back_image: "",
  };

  const formik = useFormik({
    initialValues: staffData,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://localhost:3001/api/addstaff", values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setSection("ViewStaff");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });
  return (
    <section className="content" id="addStaff">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Manage Staff</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewStaffBtn1"
                    onClick={() => setSection("ViewStaff")}
                  >
                    <img src="../dist/img/icon/view.svg" /> View Staff
                  </button>
                </div>
                <div className="card-tools mx-2">
                  <Link to={"/staff/attendance"}>
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addAttendanceBtn1"
                    >
                      <img src="../dist/img/icon/add.svg" /> Attendance
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <form
          method="POST"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Personal Details</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="staffId">Staff ID</label>
                      <input
                        type="text"
                        name="staff_id"
                        className="form-control"
                        value={formik.values.staff_id}
                        onChange={formik.handleChange}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Staff ID
                      </label>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="fname">First Name</label>
                      <input
                        type="text"
                        name="f_name"
                        className="form-control"
                        value={formik.values.f_name}
                        onChange={formik.handleChange}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid First Name
                      </label>
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="lname">Last Name</label>
                      <input
                        type="text"
                        name="l_name"
                        className="form-control"
                        value={formik.values.l_name}
                        onChange={formik.handleChange}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Last Name
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="bdate">Birthday</label>
                      <input
                        type="date"
                        name="birth_date"
                        className="form-control"
                        value={formik.values.birth_date}
                        onChange={formik.handleChange}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Birth Date
                      </label>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="jdate">Joining Date</label>
                      <input
                        type="date"
                        name="joining_date"
                        className="form-control"
                        value={formik.values.joining_date}
                        onChange={formik.handleChange}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Joining Date
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      name="address"
                      className="form-control"
                      rows={3}
                      value={formik.values.address}
                      onChange={formik.handleChange}
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Address
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Contact No.</label>
                    <input
                      type="number"
                      name="phone_no"
                      className="form-control"
                      value={formik.values.phone_no}
                      onChange={formik.handleChange}
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Phone Number
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Email
                    </label>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label htmlFor="position">Position</label>
                      <input
                        autoComplete="off"
                        role="combobox"
                        list=""
                        id="input"
                        className="form-control"
                        name="position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                      />
                      <datalist id="browsers" role="listbox">
                        <option value="Owner">Owner</option>
                        <option value="Manager">Manager</option>
                      </datalist>
                      <label className="invalid-feedback">
                        Please enter a valid Position
                      </label>
                    </div>
                    <div className="form-group col-6">
                      <label htmlFor="salary">Salary</label>
                      <input
                        type="number"
                        step="0.01"
                        id="salary"
                        name="salary"
                        className="form-control"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Salary
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">ID Proof</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="photo">Photo</label>
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      className="form-control"
                      value={formik.values.photo}
                    />
                    <input type="hidden" name="base64photo" id="base64photo" />
                    <label className="invalid-feedback">
                      Please choose a valid Image
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputStatus">ID Card Type</label>
                    <select
                      id="inputStatus"
                      name="document_type"
                      className="form-select custom-select"
                      value={formik.values.document_type}
                      onChange={formik.handleChange}
                    >
                      <option value={""}>Select one</option>
                      <option value="National Identity Card">
                        National Identity Card
                      </option>
                      <option value="Pan Card">Pan Card</option>
                      <option value="Voter Card">Voter Card</option>
                    </select>
                    <label className="invalid-feedback">
                      Please select a valid ID card type
                    </label>
                  </div>
                  <div className="form-group" id="idCardNumberDiv">
                    <label htmlFor="id_card">ID Card Number</label>
                    <input
                      type="text"
                      name="id_number"
                      className="form-control"
                      value={formik.values.id_number}
                      onChange={formik.handleChange}
                    />
                    <label className="invalid-feedback" id="idCardError">
                      Please enter a valid ID Number
                    </label>
                  </div>
                  <div className="form-group" id="idImageDiv">
                    <label htmlFor="id_image_front">ID Card Front Image</label>
                    <input
                      type="file"
                      id="id_image_front"
                      name="front_image"
                      className="form-control"
                      accept="image/jpeg,image/png,application/pdf"
                      value={formik.values.front_image}
                      onChange={formik.handleChange}
                    />
                    <label className="invalid-feedback">
                      Please upload a valid image (jpg, png, jpeg or pdf)
                    </label>
                  </div>
                  <div className="form-group" id="idImageBackDiv">
                    <label htmlFor="id_image_back">ID Card Back Image</label>
                    <input
                      type="file"
                      id="id_image_back"
                      name="back_image"
                      className="form-control"
                      accept="image/jpeg,image/png,application/pdf"
                      value={formik.values.back_image}
                      onChange={formik.handleChange}
                    />
                    <label className="invalid-feedback">
                      Please upload a valid image (jpg, png, jpeg or pdf)
                    </label>
                  </div>
                  <button type="submit" name="submit" className="btn btn-dark">
                    <img src="../dist/img/icon/add.svg" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddStaff;
