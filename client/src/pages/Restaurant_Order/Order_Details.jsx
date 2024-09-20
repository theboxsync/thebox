import React from "react";
import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function OrderDetails() {
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Manage Order Details</h3>
                    <div className="card-tools"></div>
                  </div>
                </div>
                <div className="invoice p-3 mb-3">
                  <div className="row">
                    <div className="col-12"></div>
                  </div>
                  <div className="row">
                    <div className="row invoice-info col-md-6">
                      <div className="col-md-12 invoice-col">
                        <b>Order ID : </b>1
                        <br />
                        <b>Customer Name : </b> Rushi
                        <br />
                        <b>Mobile Number : </b> 6353335996
                        <br />
                        <b>Email Address : </b> rushimaru96@gmail.com
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-12 table-responsive">
                      <table className="table">
                        <thead>
                          <tr align="center">
                            <th colSpan={3} style={{ fontSize: 18 }}>
                              Order Details
                            </th>
                          </tr>
                          <tr>
                            <th>Dishes</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Panner Masala </td>
                            <td>2</td>
                            <td>360</td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                paddingTop: ".25rem",
                                paddingBottom: ".25rem",
                              }}
                              align="right"
                              colSpan={2}
                            >
                              Total Amount
                            </td>
                            <td
                              style={{
                                paddingTop: ".25rem",
                                paddingBottom: ".25rem",
                              }}
                            >
                              360{" "}
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
