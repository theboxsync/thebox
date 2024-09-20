import React from "react";
import { useNavigate } from "react-router-dom";

import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function BookingDetails() {
  const navigate = useNavigate();
  const editDetails = () => {
    navigate("/table-booking/update");
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
        {/* Header */}
        <Header />
        {/* /.content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Table Booking</h3>
                  </div>
                </div>
                <div className="invoice p-3 mb-3">
                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <small className="float-right" />
                      </h4>
                    </div>
                  </div>
                  <div className="row invoice-info">
                    <div className="col-md-4 invoice-col">
                      Name : Pranay Gohil
                      <br />
                      Contact No. : 1111111111
                      <br />
                      Email : pg1@gmail.com
                      <br />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: 20 }}>
                    <div className="col-12 table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead>
                          <tr align="center">
                            <th colSpan={6} style={{ fontSize: 18 }}>
                              Booking Details
                            </th>
                          </tr>
                          <tr>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Table No.</th>
                            <th>Adult</th>
                            <th>Child</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>10-03-2024</td>
                            <td>14:31:49</td>
                            <td>1</td>
                            <td>2</td>
                            <td>1</td>
                          </tr>
                          <tr className="table-footer">
                            <td
                              style={{
                                paddingTop: ".25rem",
                                paddingBottom: ".25rem",
                                fontWeight: "bold",
                              }}
                              align="right"
                              colSpan={4}
                            >
                              Price
                            </td>
                            <td
                              style={{
                                paddingTop: ".25rem",
                                paddingBottom: ".25rem",
                              }}
                            >
                              50
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <form action="update-booking.html" method="POST">
                        <button
                          className=" btn btn-dark float-right"
                          type="submit"
                          name="submit_booking_id"
                          onClick={editDetails}
                        >
                          <img src="../../dist/img/icon/edit.svg" />
                          Edit
                        </button>
                      </form>
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
