import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { addInventory } from "../../schemas";

function AddInventory({ setSection }) {
  const navigate = useNavigate();

  const data = {
    bill_date: "",
    bill_number: "",
    vendor_name: "",
    category: "",
    bill_image: "",
    total_amount: "",
    paid_amount: "",
    unpaid_amount: "",
    item_name: "",
    unit: "",
    item_quantity: "",
    item_price: "",
    approve_status: "",
  };

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: data,
      validationSchema: addInventory,
      onSubmit: (values) => {
        console.log(values);
        axios
          .post("http://localhost:3001/api/addinventory", values, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
            setSection("ViewInventory");
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  const amountChange = (e) => {
    let totalAmount = document.getElementById("totalAmount").value;
    let paidAmount = document.getElementById("paidAmount").value;
    let unpaidAmount = totalAmount - paidAmount;
    document.getElementById("unpaidAmount").value = unpaidAmount;
  };
  return (
    <section className="content" id="addInventory">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Manage Inventory</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtn"
                    onClick={() => setSection("ViewInventory")}
                  >
                    <img src="../../dist/img/view.svg" /> View Inventory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" id="addInventoryForm">
        <form
          method="POST"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Purchase</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="bill_date">Date</label>
                    <input
                      type="date"
                      name="bill_date"
                      className="form-control"
                      value={values.bill_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.bill_date && touched.bill_date
                        ? errors.bill_date
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bill_number">Bill No.</label>
                    <input
                      type="text"
                      name="bill_number"
                      className="form-control"
                      value={values.bill_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.bill_number && touched.bill_number
                        ? errors.bill_number
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="vendor_name">Vendor Name</label>
                    <input
                      type="text"
                      name="vendor_name"
                      className="form-control"
                      value={values.vendor_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.vendor_name && touched.vendor_name
                        ? errors.vendor_name
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                      autoComplete="off"
                      role="combobox"
                      list=""
                      id="input"
                      className="form-control"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <datalist id="browsers" role="listbox">
                      <option>Dairy Product</option>
                      <option>Vegetables</option>
                      <option>Grocery</option>
                    </datalist>
                    <label className="text-danger">
                      {errors.category && touched.category
                        ? errors.category
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bill_image">Bill Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="bill_image"
                      multiple
                      value={values.bill_image}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <label className="text-danger">
                      {errors.bill_image && touched.bill_image
                        ? errors.bill_image
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="total_amount">Total Amount</label>
                    <input
                      type="number"
                      id="totalAmount"
                      name="total_amount"
                      className="form-control"
                      onChange={(e) => {
                        amountChange();
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.total_amount && touched.total_amount
                        ? errors.total_amount
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paid_amount">Paid Amount</label>
                    <input
                      type="number"
                      id="paidAmount"
                      name="paid_amount"
                      className="form-control"
                      onChange={(e) => {
                        amountChange();
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.paid_amount && touched.paid_amount
                        ? errors.paid_amount
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="unpaid_amount">Unpaid Amount</label>
                    <input
                      type="text"
                      id="unpaidAmount"
                      name="uamount"
                      className="form-control"
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Details</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="item_name">Item</label>
                    <input
                      type="text"
                      name="item_name"
                      className="form-control"
                      value={values.item_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.item_name && touched.item_name
                        ? errors.item_name
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="unit">Weight Type</label>
                    <select
                      name="unit"
                      className="form-control custom-select"
                      value={values.unit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    >
                      <option value={""} defaultValue={""} disabled>
                        Select Option
                      </option>
                      <option value="Kilogram">Kilogram(kg)</option>
                      <option value="Grams">Grams(g)</option>
                      <option value="Liter">Liter(L)</option>
                      <option value="ml">Milligram Liter</option>
                      <option value="nos">Nos</option>
                      <option value="Pieces">Pieces</option>
                    </select>
                    <label className="text-danger">
                      {errors.unit && touched.unit ? errors.unit : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="item_quantity">Quantity</label>
                    <input
                      type="text"
                      name="item_quantity"
                      className="form-control"
                      value={values.item_quantity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min="1"
                      required
                    />
                    <label className="text-danger">
                      {errors.item_quantity && touched.item_quantity
                        ? errors.item_quantity
                        : null}
                    </label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="item_price">Price</label>
                    <input
                      type="number"
                      min="1"
                      name="item_price"
                      className="form-control"
                      value={values.item_price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <label className="text-danger">
                      {errors.item_price && touched.item_price
                        ? errors.item_price
                        : null}
                    </label>
                  </div>
                  <hr />
                  <div id="newElementId" className="form-group"></div>
                  <p
                    id="result"
                    style={{
                      fontSize: "80%",
                      fontWeight: "700",
                      color: "#dc3545",
                    }}
                  ></p>
                  <div className="form-group">
                    <input
                      type="button"
                      className="btn btn-dark"
                      // onClick="createNewElement();"
                      value="+ Add More"
                    />
                  </div>
                  <button type="submit" name="submit" className="btn btn-dark">
                    <img src="../../dist/img/add.svg" />
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

export default AddInventory;
