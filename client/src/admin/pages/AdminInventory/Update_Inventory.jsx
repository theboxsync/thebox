import React from "react";
import "../../style.css";
import Navbar from "../../../components/NavBar";

import MenuBar from "../../../components/MenuBar";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export default function UpdateInventory() {
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

        <Header />

        <section className="content">
          <form
            className="needs-validation"
            id="inventory-form"
            autocomplete="off"
            enctype="multipart/form-data"
            novalidate
          >
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Manage Inventory</h3>
              </div>
            </div>
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
                    <input
                      type="hidden"
                      id="id"
                      name="bill_id"
                      className="form-control"
                      required
                    />
                    <div className="form-group">
                      <label for="billdate">Date</label>
                      <input
                        type="date"
                        id="billdate"
                        name="billdate"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        data-error="Select Room No"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="vendor">Vendor</label>
                      <input
                        type="text"
                        id="vendor"
                        name="vendor"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="category">Category</label>
                      <input
                        autocomplete="off"
                        role="combobox"
                        list=""
                        id="input"
                        className="form-control"
                        required
                      />
                      <datalist id="browsers" role="listbox">
                        <option>Dairy Product</option>
                        <option>Grocery</option>
                        <option>Vegetables</option>
                      </datalist>
                    </div>

                    <div className="form-group">
                      <label for="total_amount">Total Amount</label>
                      <input
                        type="text"
                        id="total_amount"
                        name="totalamount"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="paid_amount">Paid Amount</label>
                      <input
                        type="text"
                        id="paid_amount"
                        name="pamount"
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="unpaid_amount">Unpaid Amount</label>
                      <input
                        type="text"
                        id="unpaid_amount"
                        name="uamount"
                        className="form-control"
                        readonly
                      />
                    </div>
                  </div>
                  {/* <!-- /.card-body --> */}
                </div>
                {/* <!-- /.card --> */}
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
                      <label for="item">Item</label>
                      <input
                        type="text"
                        id="item"
                        name="item[]"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label for="quantity">Quantity</label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity[]"
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label for="wtype">Weight Type</label>
                      <select
                        id="wtype"
                        name="wtype[]"
                        className="form-control custom-select"
                      >
                        <option value="Kilogram">Kilogram(kg)</option>
                        <option value="Grams">Grams(g)</option>
                        <option value="Liter">Liter(L)</option>
                        <option value="ml">Milligram Liter</option>
                        <option value="nos">Nos</option>
                        <option value="Pieces">Pieces</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label for="price">Price</label>
                      <input
                        type="number"
                        id="price"
                        name="price[]"
                        className="productPrice form-control"
                        oninput="calculateTotalPrice()"
                      />
                    </div>
                    <p
                      id="result"
                      style={{
                        fontSize: "80%",
                        fontWeight: "700",
                        color: "#dc3545",
                      }}
                    ></p>
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-dark"
                    >
                      <img src="../../dist/img/update.svg" />
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
