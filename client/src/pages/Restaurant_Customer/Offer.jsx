import React from "react";
import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function CustomerOffer() {
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
        <section className="content" id="viewBooking">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Offers</h3>
                    <div className="card-tools"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="container-fluid">
                  <form action="send-offer.php" method="post">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Offer</th>
                          <th>Start on</th>
                          <th>Expiry On</th>
                          <th>Discount</th>
                          <th>Coupen Code</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Holi Offer</td>
                          <td>22/03/2024</td>
                          <td>25/03/2024</td>
                          <td>25%</td>
                          <td>HOLI24</td>
                          <td>Send</td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
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
