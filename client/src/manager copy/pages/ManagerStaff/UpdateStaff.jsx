import React from "react";
import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function UpdateStaff() {
  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>
        {/* Header */}
        <Header />
        {/* /.content */}

        <section className="content">
          <form
            action=""
            method="POST"
            className="needs-validation"
            onsubmit="return validate()"
            encType="multipart/form-data"
            autoComplete="off"
            noValidate=""
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
                    <input
                      type="hidden"
                      name="id"
                      defaultValue={1}
                      className="form-control"
                      required=""
                    />
                    <div className="row">
                      <div className="form-group col-4">
                        <label htmlFor="staffId">Staff Id</label>
                        <input
                          type="text"
                          id="staffId"
                          name="staff_id"
                          defaultValue={1}
                          className="form-control"
                          required=""
                        />
                        <label className="invalid-feedback">
                          Please enter a valid Staff ID
                        </label>
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="fname">First Name</label>
                        <input
                          type="text"
                          id="fname"
                          name="fname"
                          defaultValue="Pranay"
                          className="form-control"
                          required=""
                        />
                        <label className="invalid-feedback">
                          Please enter a valid First Name
                        </label>
                      </div>
                      <div className="form-group col-4">
                        <label htmlFor="lname">Last Name</label>
                        <input
                          type="text"
                          id="lname"
                          name="lname"
                          defaultValue="Gohil"
                          className="form-control"
                          required=""
                        />
                        <label className="invalid-feedback">
                          Please enter a valid Last Name
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="bdate">Birthday</label>
                        <input
                          type="date"
                          id="bdate"
                          name="bdate"
                          defaultValue="23-05-2002"
                          className="form-control"
                          required=""
                        />
                        <label className="invalid-feedback">
                          Please enter a valid Birth Date
                        </label>
                      </div>
                      <div className="form-group col-6">
                        <label htmlFor="jdate">Joining Date</label>
                        <input
                          type="date"
                          id="jdate"
                          name="jdate"
                          defaultValue="01-03-2024"
                          className="form-control"
                          required=""
                        />
                        <label className="invalid-feedback">
                          Please enter a valid Joining Date
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        className="form-control"
                        rows={3}
                        required=""
                        defaultValue={"Tavra, Bharuch, Gujarat"}
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Address
                      </label>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Contact No.</label>
                      <input
                        type="tel"
                        id="phone"
                        name="mobile"
                        defaultValue={8980117634}
                        className="form-control"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                        required=""
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
                        defaultValue="pranaygohil2@gmail.com"
                        className="form-control"
                      />
                      <label className="invalid-feedback">
                        Please enter a valid Email
                      </label>
                    </div>
                    <div className="row">
                      <div className="form-group col-6">
                        <label htmlFor="position">Position</label>
                        <input
                          autoComplete="off"
                          role="combobox"
                          list=""
                          id="input"
                          defaultValue="Owner"
                          className="form-control"
                          name="position"
                          required=""
                        />
                        <datalist id="browsers" role="listbox">
                          <option value="Owner"> Owner </option>
                          <option value="Manager"> Manager </option>
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
                          defaultValue={100000}
                          className="form-control"
                          required=""
                        />
                        <label className="invalid-feedback">
                          Please enter a valid Salary
                        </label>
                      </div>
                    </div>
                  </div>
                  {/* /.card-body */}
                </div>
                {/* /.card */}
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
                      <div className="w-100">
                        <img src="./profile.png" alt="" className="w-25 m-3" />
                      </div>
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        className="form-control"
                        required=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputStatus">ID Card Type</label>
                      <select
                        id="inputStatus"
                        name="id_type"
                        className="form-select custom-select"
                        required=""
                      >
                        <option disabled="" value="">
                          Select one
                        </option>
                        <option value={1} selected="">
                          National Identity Card
                        </option>
                        <option disabled="" value={2}>
                          Pan Card
                        </option>
                        <option disabled="" value={3}>
                          Voter Card
                        </option>
                      </select>
                      <label className="invalid-feedback">
                        Please select a valid ID card type
                      </label>
                    </div>
                    <div className="form-group" id="idCardNumberDiv">
                      <label htmlFor="id_card">ID Card Number</label>
                      <input
                        type="text"
                        id="id_card"
                        name="id_card_no"
                        className="form-control"
                        defaultValue={487545683219}
                        required=""
                      />
                      <label className="invalid-feedback" id="idCardError">
                        Please enter a valid ID Number
                      </label>
                    </div>
                    <div
                      className="form-group"
                      id="idImageDiv"
                      style={{ display: "none" }}
                    >
                      <label htmlFor="id_image_front">
                        ID Card Front Image
                      </label>
                      <div className="w-100">
                        <img src="./id proof.jpg" alt="" className="w-50 m-3" />
                      </div>
                      <input
                        type="file"
                        id="id_image_front"
                        name="id_image_front"
                        className="form-control"
                        accept="image/jpeg,image/png,application/pdf"
                        required=""
                      />
                      <label className="invalid-feedback">
                        Please upload a valid image (jpg, png, jpeg or pdf)
                      </label>
                    </div>
                    <div
                      className="form-group"
                      id="idImageBackDiv"
                      style={{ display: "none" }}
                    >
                      <label htmlFor="id_image_back">ID Card Back Image</label>
                      <div className="w-100">
                        <img src="./id proof.jpg" alt="" className="w-50 m-3" />
                      </div>
                      <input
                        type="file"
                        id="id_image_back"
                        name="id_image_back"
                        className="form-control"
                        accept="image/jpeg,image/png,application/pdf"
                      />
                      <label className="invalid-feedback">
                        Please upload a valid image (jpg, png, jpeg or pdf)
                      </label>
                    </div>
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-dark"
                    >
                      <img src="../dist/img/icon/update.svg" /> Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>

        <Footer />
      </div>
    </div>
  );
}
