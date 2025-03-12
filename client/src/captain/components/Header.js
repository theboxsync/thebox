import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-dark">
              <div className="inner">
                <h3>10</h3>
                <p>Table Booking</p>
              </div>
              <div className="icon">
                <img src="../../dist/img/table_booking.png" alt="" />
              </div>
              <Link
                to="../CRM/Restaurant-Table-Booking"
                className="small-box-footer"
              >
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="small-box bg-dark">
              <div className="inner">
                <h3>50</h3>
                <p>Manage Menu</p>
              </div>
              <div className="icon">
                <img src="../../dist/img/manage_men.png" alt="" />
              </div>
              <Link
                to="../CRM/Restaurant-Menu-List/"
                className="small-box-footer"
              >
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>

          <div className="col-lg-3 col-6">
            <div className="small-box bg-dark">
              <div className="inner">
                <h3>20</h3>
                <p>Manage Table</p>
              </div>
              <div className="icon">
                <img src="../../dist/img/manage_table.png" alt="" />
              </div>
              <Link
                to="../CRM/Restaurant-Table-Management/"
                className="small-box-footer"
              >
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            <div className="small-box bg-dark">
              <div className="inner">
                <h3>5₹</h3>
                <p>Inventory</p>
              </div>
              <div className="icon">
                <img src="../../dist/img/inventory.png" alt="" />
              </div>
              <Link
                to="../CRM/Restaurant-Inventory/"
                className="small-box-footer"
              >
                More info <i className="fas fa-arrow-circle-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
