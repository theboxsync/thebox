import React, { useState, useEffect } from "react";
import axios from "axios";

function AddOrder({ setSection }) {
  const [tableData, setTableData] = useState([]);
  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/gettabledata",
        {
          withCredentials: true,
        }
      );
      setTableData(response.data);
    } catch (error) {
      console.log("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);
  return (
    <section className="content" id="addOrder">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add Order</h3>
                <div className="card-tools d-flex">
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark "
                      id="VMorderHistory"
                      onClick={() => setSection("OrderHistory")}
                    >
                      <img src="../dist/img/order-history.svg" /> Order History
                    </button>
                  </div>
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark "
                      id="OHviewBtn"
                      onClick={() => setSection("ViewOrder")}
                    >
                      <img src="../dist/img/view.svg" /> View Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <form
          className="needs-validation"
          id="reservation-form"
          autoComplete="off"
          encType="multipart/form-data"
          noValidate
        >
          <div className="row">
            <div className="col-md-12">
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
                <div className="card-body row">
                  <input type="hidden" name="customer_id" id="customer_id" />
                  <div className="form-group col-md-3">
                    <div className="d-flex">
                      <div className="w-50 px-2">
                        <label htmlFor="dtype">Dining Type</label>
                        <select
                          id="dtype"
                          name="dtype"
                          className="form-select custom-select"
                          value={""}
                          required
                        >
                          <option disabled value={""}>
                            Select Option
                          </option>
                          <option value="A.C.">A.C.</option>
                          <option value="Non A.C.">Non A.C.</option>
                        </select>
                      </div>
                      <div className="w-50 px-2" id="tbl_no">
                        <label>Select table no.</label>
                        <select
                          className="form-select custom-select"
                          name="tbl_no"
                          id="tbl_no_select"
                          required
                        >
                          <option disabled value={""}>
                            Select Table No.
                          </option>
                          {tableData.map((table) => (
                            <option value={table.table_no} key={table.table_no}>
                              {table.table_no}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <label
                      className="invalid-feedback"
                      id="tbl_no_error"
                      style={{ display: "none" }}
                    >
                      Please Select Option
                    </label>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="cus_name">Customer Name</label>
                    <input
                      type="text"
                      id="cus_name"
                      name="cus_name"
                      className="form-control"
                      required
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Name
                    </label>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="phone">Contact Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      maxLength={10}
                      pattern="[0-9]{10}"
                      required
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Contact Number
                    </label>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      required
                    />
                    <label className="invalid-feedback">
                      Please enter a valid Email
                    </label>
                  </div>
                  <div className="form-group w-100 d-flex justify-content-between align-items-center">
                    <p
                      className="text-danger mx-3"
                      id="error-customer"
                      style={{ fontWeight: "bold" }}
                    ></p>
                    <button
                      className="btn btn-dark mx-3"
                      type="button"
                      id="fetch_customer"
                    >
                      <img src="../dist/img/add.svg" />
                      Add Customer
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-md-12 row menu"
              id="menu-div"
              style={{ display: "none" }}
            >
              {/* ======= Menu Section ======= */}
              <div className="card card-secondary col-md-6" data-aos="fade-up">
                <div className="card-header">
                  <h3 className="card-title">Menu</h3>
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
                <div
                  className="card-body"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  style={{ height: 620 }}
                >
                  <div className="row">
                    <div className="d-flex justify-content-center">
                      <ul id="menu-flters" style={{ overflowX: "auto" }}>
                        <li>All</li>
                        <li> Panner Items </li>
                      </ul>
                    </div>
                  </div>
                  <div
                    className="row menu-container hidescrollbar"
                    id="menu-list"
                    style={{ maxHeight: 550, overflowY: "auto" }}
                  >
                    <div className="col-md-12">
                      <img
                        src="../../website/Sunset_Bay_Villas_Bharuch-1/images/dish_menu/dish_Panner Masala.jpg"
                        className="menu-img"
                      />
                      <div className="menu-content">
                        <p>Panner Masala </p>
                        <span className="d-flex">
                          <p className="mx-5">₹ 180 </p>
                          <div
                            className="order"
                            data-aos="fade-up"
                            data-aos-delay={100}
                          >
                            <input
                              type="button"
                              // onClick="decrement_dish('3','1','1')"
                              defaultValue="-"
                              className="btn btn-dark"
                              style={{
                                float: "left",
                                height: 36,
                                width: 36,
                                marginRight: 2,
                              }}
                            />
                            <input
                              id="dish_1"
                              type="number"
                              name="dish_1"
                              min={0}
                              defaultValue={6}
                              style={{
                                float: "left",
                                height: 36,
                                width: 50,
                                borderRadius: "0.25rem",
                                textAlign: "center",
                              }}
                              readOnly
                            />
                            <input
                              type="button"
                              // onClick="increment_dish('3','1','1')"
                              className="btn btn-dark"
                              style={{
                                height: 36,
                                width: 36,
                                marginLeft: 3,
                              }}
                              defaultValue="+"
                            />
                          </div>
                        </span>
                      </div>
                      <hr />
                    </div>
                    <div className="col-md-12">
                      <img
                        src="../../website/Sunset_Bay_Villas_Bharuch-1/images/dish_menu/dish_Hello.png"
                        className="menu-img"
                      />
                      <div className="menu-content">
                        <p>Hello </p>
                        <span className="d-flex">
                          <p className="mx-5">₹ 5000 </p>
                          <div
                            className="order"
                            data-aos="fade-up"
                            data-aos-delay={100}
                          >
                            <input
                              type="button"
                              // onClick="decrement_dish('3','2','1')"
                              defaultValue="-"
                              className="btn btn-dark"
                              style={{
                                float: "left",
                                height: 36,
                                width: 36,
                                marginRight: 2,
                              }}
                            />
                            <input
                              id="dish_2"
                              type="number"
                              name="dish_2"
                              min={0}
                              defaultValue={0}
                              style={{
                                float: "left",
                                height: 36,
                                width: 50,
                                borderRadius: "0.25rem",
                                textAlign: "center",
                              }}
                              readOnly
                            />
                            <input
                              type="button"
                              // onClick="increment_dish('3','2','1')"
                              className="btn btn-dark"
                              style={{
                                height: 36,
                                width: 36,
                                marginLeft: 3,
                              }}
                              defaultValue="+"
                            />
                          </div>
                        </span>
                      </div>
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card card-secondary col-md-6" data-aos="fade-up">
                <div className="card-header">
                  <h3 className="card-title">Customer's cart</h3>
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
                <div
                  className="card-body"
                  data-aos="fade-up"
                  data-aos-delay={100}
                  style={{ height: 620 }}
                >
                  <div
                    className="row menu-container hidescrollbar"
                    id="cart-list"
                    style={{ maxHeight: 550, overflowY: "auto" }}
                  >
                    <div className="col-md-12">
                      <img
                        src="../../website/Sunset_Bay_Villas_Bharuch-1/images/dish_menu/dish_Panner Masala.jpg"
                        className="menu-img"
                      />
                      <div className="menu-content">
                        <p>Panner Masala </p>
                        <span className="d-flex">
                          <p className="mx-5">₹ 180 </p>
                          <div
                            className="order"
                            data-aos="fade-up"
                            data-aos-delay={100}
                          >
                            <input
                              type="button"
                              // onClick="decrement_dish_cart('3','1','1')"
                              defaultValue="-"
                              className="btn btn-dark"
                              style={{
                                float: "left",
                                height: 36,
                                width: 36,
                                marginRight: 2,
                              }}
                            />
                            <input
                              id="dish_cart_1"
                              type="number"
                              name="dish_1"
                              min={0}
                              defaultValue={6}
                              style={{
                                float: "left",
                                height: 36,
                                width: 50,
                                borderRadius: "0.25rem",
                                textAlign: "center",
                              }}
                              readOnly
                            />
                            <input
                              type="button"
                              // onClick="increment_dish_cart('3','1','1')"
                              className="btn btn-dark"
                              style={{
                                height: 36,
                                width: 36,
                                marginLeft: 3,
                              }}
                              defaultValue="+"
                            />
                          </div>
                        </span>
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-dark px-3 mx-3"
                      type="button"
                      id="done_cart"
                    >
                      {" "}
                      <img src="../dist/img/done.svg" /> Done
                    </button>
                  </div>
                </div>
              </div>
              {/* End Menu Section */}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddOrder;
