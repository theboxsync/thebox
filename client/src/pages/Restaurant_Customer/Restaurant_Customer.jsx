import React from "react";
import "../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RestaurantCustomer() {
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
                    <h3 className="card-title">Manage Customers</h3>
                    <div className="card-tools">
                      <a href="offer.php">
                        <button
                          type="button"
                          className="btn btn-block btn-dark"
                        >
                          <img src="../dist/img/offer.svg" /> Offer
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="container-fluid table-responsive">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Mobile No.</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>24/03/2024</th>
                        <th>Rushi Maru</th>
                        <th>0123456789</th>
                        <th>rushi123456@gmail.com</th>
                        <th>View</th>
                      </tr>
                    </tbody>
                  </table>
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
