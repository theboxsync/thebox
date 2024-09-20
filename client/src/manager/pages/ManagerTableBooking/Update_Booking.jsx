import React from "react";
import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function UpdateBooking() {
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
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Table Booking</h3>
            </div>
          </div>
          <form
            className="needs-validation"
            action
            method="POST"
            onsubmit="return validate()"
            encType="multipart/form-data"
            autoComplete="off"
            noValidate
          >
            <div className="row">
              <div className="col-md-6">
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Table Details</h3>
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
                      id="id"
                      name="booking_id"
                      defaultValue="booking id"
                      className="form-control"
                      required
                    />
                    <div className="form-group">
                      <label htmlFor="book_date">Date</label>
                      <input
                        type="date"
                        id="book_date"
                        name="book_date"
                        defaultValue="10-03-2024"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Time">Time</label>
                      <input
                        type="text"
                        id="tbl_time"
                        name="book_time"
                        className="form-control"
                        defaultValue="14:31:49"
                        data-error="Select Room No"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="table_no">Table no</label>
                      <input
                        autoComplete="off"
                        role="combobox"
                        list
                        id="input"
                        className="form-control"
                        defaultValue={1}
                        name="tbl_no"
                        required
                      />
                      <datalist id="browsers" role="listbox">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                      </datalist>
                    </div>
                    <div className="row">
                      <div className="form-group col-md-6">
                        <label htmlFor="Adult">Adults</label>
                        <br />
                        <input
                          type="button"
                          onclick="decrement1()"
                          defaultValue="-"
                          className="btn btn-dark"
                          style={{ float: "left", height: 36, marginRight: 2 }}
                        />
                        <input
                          id="adult"
                          type="number"
                          name="adult"
                          min={0}
                          defaultValue={2}
                          placeholder={0}
                          style={{
                            float: "left",
                            height: 36,
                            width: 50,
                            borderRadius: "0.25rem",
                          }}
                        />
                        <input
                          type="button"
                          onclick="increment1()"
                          className="btn btn-dark"
                          style={{ height: 36, marginLeft: 3 }}
                          defaultValue="+"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="child">Child</label>
                        <br />
                        <input
                          type="button"
                          onclick="decrement2()"
                          defaultValue="-"
                          className="btn btn-dark"
                          style={{ float: "left", height: 36, marginRight: 2 }}
                        />
                        <input
                          id="child"
                          type="number"
                          name="child"
                          min={0}
                          defaultValue={1}
                          placeholder={0}
                          style={{
                            float: "left",
                            height: 36,
                            width: 50,
                            borderRadius: "0.25rem",
                          }}
                        />
                        <input
                          type="button"
                          onclick="increment2()"
                          className="btn btn-dark"
                          style={{ height: 36, marginLeft: 3 }}
                          defaultValue="+"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="total_amount">Total Amount</label>
                      <input
                        type="text"
                        id="total_amount"
                        name="total_amount"
                        className="form-control"
                        defaultValue={50}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Customer Details</h3>
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
                      defaultValue="customer id"
                      name="c_id"
                      className="form-control"
                    />
                    <div className="form-group">
                      <label htmlFor="item">Name</label>
                      <input
                        type="text"
                        id="cus_name"
                        defaultValue="Pranay"
                        name="cus_name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="item">Email</label>
                      <input
                        type="text"
                        id="email"
                        defaultValue="pg1@gmail.com"
                        name="email"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="item">Contact No.</label>
                      <input
                        type="tel"
                        id="cus_name"
                        defaultValue={1111111111}
                        name="phone"
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-dark"
                    >
                      <img src="../../dist/img/icon/update.svg" />
                      Update
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
