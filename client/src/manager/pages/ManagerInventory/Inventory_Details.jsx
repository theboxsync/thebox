import React from "react";
import { useNavigate } from "react-router-dom";

import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function InventoryDetails() {
  const navigate = useNavigate();
  const editDetails = () => {
    navigate("/inventory/update");
  };
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Manage Inventory</h3>
                    <div className="card-tools">
                      <a href="add_inventory.php">
                        <button
                          type="button"
                          className="btn btn-block btn-dark"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        >
                          <img src="../../dist/img/add.svg" /> Add Inventory
                        </button>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="invoice p-3 mb-3">
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <small className="float-right">Date: 15/03/2024</small>
                      </h4>
                    </div>
                  </div>
                  <div className="row invoice-info col-md-6">
                    <div className="col-md-4 invoice-col">
                      Name :Dmart
                      <br />
                      Vendor :Dmart
                      <br />
                      Category :Grocery
                      <br />
                      Total Amount :5000
                      <br />
                      Paid Amount :5000
                      <br />
                      Unpaid Amount :0
                      <br />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-12 table-responsive">
                      <table className="table">
                        <thead>
                          <tr align="center">
                            <th colspan="3" style={{ fontSize: "18px" }}>
                              Inventory Details
                            </th>
                          </tr>
                          <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Rice</th>
                            <th>130</th>
                            <th>10Kg</th>
                          </tr>
                        </tbody>
                      </table>
                      <div className="col-md-12">
                        <img
                          src="../../Logo/GJ0001.webp"
                          style={{ width: "156px", height: "156px" }}
                          alt="Bill Image"
                        />
                        <a href="Logo/GJ0001.webp" download="bill_image.jpg">
                          <button>Download Image</button>
                        </a>
                      </div>

                      <button
                        className="btn btn-dark float-right"
                        type="submit"
                        name="submit_bill_id"
                        onClick={editDetails}
                      >
                        <img src="../../dist/img/edit.svg" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
