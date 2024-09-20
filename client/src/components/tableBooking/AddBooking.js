import React from "react";

function AddBooking({ setSection }) {
  return (
    <section className="content" id="addBooking">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Table Booking</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtnAB"
                    onClick={() => setSection("ViewBooking")}
                  >
                    <img src="../dist/img/icon/view.svg" /> View Booking
                  </button>
                </div>
                <div className="card-tools mx-2">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="bookingRequestsBtnAB"
                    onClick={() => setSection("BookingRequests")}
                  >
                    <img src="../dist/img/icon/bell.svg" /> Booking Requests
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <form
          className="needs-validation"
          action="#"
          method="POST"
          autoComplete="off"
          onsubmit="return validate()"
          encType="multipart/form-data"
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
                  <div className="form-group">
                    <label htmlFor="book_date">Date</label>
                    <input
                      type="date"
                      data-date
                      data-date-format="DD MM YYYY"
                      id="book_date"
                      name="book_date"
                      className="form-control"
                      required
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Date
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="Time"> Time</label>
                    <input
                      type="time"
                      id="book_time"
                      name="book_time"
                      className="form-control"
                      required
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Time
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="dtype">Dining Type</label>
                    <select
                      id="dtype"
                      name="dtype"
                      className="form-select custom-select"
                      required
                    >
                      <option selected disabled value>
                        Select Option
                      </option>
                      <option value="A.C.">A.C.</option>
                      <option value="Non A.C.">Non A.C.</option>
                    </select>
                    <label className="invalid-feedback">
                      Please Select Option
                    </label>
                  </div>
                  <div className="form-group" id="tbl_no">
                    <select
                      name="tbl_no"
                      id="tbl_no_select"
                      className="form-select custom-select"
                      onchange="fetchTableDetails()"
                      required
                    >
                      <option selected disabled>
                        Select Table No.
                      </option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                    </select>
                  </div>
                  <div className="form-group" id="table_details">
                    Max Person : 4
                  </div>
                  <div id="newElementId" className="form-group" />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Customer Details </h3>
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
                    <label htmlFor="cus_name">Name</label>
                    <input
                      type="text"
                      id="cus_name"
                      name="cus_name"
                      className="form-control"
                      required
                    />
                    <label className="invalid-feedback">
                      {" "}
                      Please enter vaild name{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="number">Mobile Number</label>
                    <input
                      type="phone"
                      id="mbl_no"
                      name="mbl_no"
                      className="form-control"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"
                      required
                    />
                    <label className="invalid-feedback">
                      {" "}
                      Please enter valid number{" "}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email"> Email</label>
                    <input
                      type="email"
                      id="cus_email"
                      name="cus_email"
                      className="form-control"
                      pattren="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                      required
                    />
                    <label className="invalid-feedback">
                      {" "}
                      please enter valid email address
                    </label>
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
                        style={{
                          float: "left",
                          height: 36,
                          marginRight: 2,
                        }}
                      />
                      <input
                        id="adult"
                        type="number"
                        name="adult"
                        min={0}
                        defaultValue={0}
                        style={{
                          float: "left",
                          height: 36,
                          width: 50,
                          borderRadius: "0.25rem",
                          textAlign: "center",
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
                        style={{
                          float: "left",
                          height: 36,
                          marginRight: 2,
                        }}
                      />
                      <input
                        id="child"
                        type="number"
                        name="child"
                        min={0}
                        defaultValue={0}
                        style={{
                          float: "left",
                          height: 36,
                          width: 50,
                          borderRadius: "0.25rem",
                          textAlign: "center",
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
                  <div>
                    <label
                      className="text-danger"
                      id="total_person_error"
                      style={{ display: "none" }}
                    >
                      Total person is more than max person for tables{" "}
                    </label>
                  </div>
                  <button type="submit" name="submit" className="btn btn-dark">
                    {" "}
                    <img src="../dist/img/icon/add.svg" /> Add
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

export default AddBooking;
