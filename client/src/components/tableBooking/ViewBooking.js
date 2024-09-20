import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ReserveModal from "./ReserveModal";
import DeleteModal from "./DeleteModal";
import CompleteModal from "./CompleteModal";

function ViewBooking({ setSection }) {
  const navigate = useNavigate();
  const getBookingDetails = () => {
    navigate("/table-booking/details");
  };

  const [showReserveModal, setShowReserveModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  return (
    <>
      <section className="content" id="viewBooking">
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
                      id="addBtnVB"
                      onClick={() => setSection("AddBooking")}
                    >
                      <img src="../dist/img/add.svg" /> Add Booking
                    </button>
                  </div>
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="bookingRequestsBtnVB"
                      onClick={() => setSection("BookingRequests")}
                    >
                      <img src="../dist/img/bell.svg" /> Booking Requests
                    </button>
                  </div>
                </div>
                <div className="card-body table-responsive">
                  {/* data table start for today's table booking */}
                  <table
                    id="table_bookings"
                    className="table table-bordered table-striped"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Dining time</th>
                        <th>Name</th>
                        <th>Table No.</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <td>10-03-2024</td>
                        <td>14:31:49</td>
                        <td>Pranay</td>
                        <td>1</td>
                        <td>
                          <button
                            className="btn bg-transparent reserve_btn"
                            style={{ float: "left" }}
                            onClick={() => setShowReserveModal(true)}
                            title="Reserve"
                          >
                            <img src="../dist/img/reserved-b.svg" />
                          </button>
                          <form
                            action="../CRM/Restaurant-Table-Booking/Booking-Details"
                            style={{ float: "left" }}
                            method="POST"
                          >
                            <button
                              className="btn bg-transparent"
                              type="submit"
                              name="submit_booking_id"
                              title="View"
                              onClick={getBookingDetails}
                            >
                              <img src="../dist/img/eye-b.svg" />
                            </button>
                          </form>
                          <button
                            className="btn bg-transparent complete_btn"
                            style={{ float: "left" }}
                            title="Completed"
                            onClick={() => setShowCompleteModal(true)}
                          >
                            <img src="../dist/img/Completed-b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent delete_btn"
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete"
                          >
                            <img src="../dist/img/delete-b.svg" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>25-02-2024</td>
                        <td>14:31:49</td>
                        <td>Rushi</td>
                        <td>4</td>
                        <td>
                          <button
                            className="btn bg-transparent reserve_btn"
                            style={{ float: "left" }}
                            onClick={() => setShowReserveModal(true)}
                            title="Reserve"
                          >
                            <img src="../dist/img/reserved-b.svg" />
                          </button>
                          <form
                            action="booking-details.html"
                            style={{ float: "left" }}
                            method="POST"
                          >
                            <button
                              className="btn bg-transparent"
                              type="submit"
                              name="submit_booking_id"
                              title="View"
                              onClick={getBookingDetails}
                            >
                              <img src="../dist/img/eye-b.svg" />
                            </button>
                          </form>
                          <button
                            className="btn bg-transparent complete_btn"
                            style={{ float: "left" }}
                            title="Completed"
                            onClick={() => setShowCompleteModal(true)}
                          >
                            <img src="../dist/img/Completed-b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent delete_btn"
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete"
                          >
                            <img src="../dist/img/delete-b.svg" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>15-03-2024</td>
                        <td>14:31:49</td>
                        <td>Pranay</td>
                        <td>2.</td>
                        <td>
                          <button
                            className="btn bg-transparent reserve_btn"
                            style={{ float: "left" }}
                            onClick={() => setShowReserveModal(true)}
                            title="Reserve"
                          >
                            <img src="../dist/img/reserved-b.svg" />
                          </button>
                          <form
                            action="booking-details.html"
                            style={{ float: "left" }}
                            method="POST"
                          >
                            <button
                              className="btn bg-transparent"
                              type="submit"
                              name="submit_booking_id"
                              title="View"
                              onClick={getBookingDetails}
                            >
                              <img src="../dist/img/eye-b.svg" />
                            </button>
                          </form>
                          <button
                            className="btn bg-transparent complete_btn"
                            style={{ float: "left" }}
                            title="Completed"
                            onClick={() => setShowCompleteModal(true)}
                          >
                            <img src="../dist/img/Completed-b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent delete_btn"
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete"
                          >
                            <img src="../dist/img/delete-b.svg" />
                          </button>
                        </td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                  {/* data table end for today's table booking */}
                </div>
              </div>
            </div>
          </div>
          {/* Div start for today's online table booking */}
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Online Booked Table</h3>
                </div>
                <div className="card-body table-responsive">
                  <table
                    id="online_table_bookings"
                    className="table table-bordered table-striped"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Dining time</th>
                        <th>Name</th>
                        <th>Table No.</th>
                        <th>Action</th>
                      </tr>
                      <tr>
                        <td>15-03-2024</td>
                        <td>14:31:49</td>
                        <td>Pranay</td>
                        <td>2.</td>
                        <td>
                          <button
                            className="btn bg-transparent reserve_btn"
                            style={{ float: "left" }}
                            onClick={() => setShowReserveModal(true)}
                            title="Reserve"
                          >
                            <img src="../dist/img/reserved-b.svg" />
                          </button>
                          <form
                            action="booking-details.html"
                            style={{ float: "left" }}
                            method="POST"
                          >
                            <button
                              className="btn bg-transparent"
                              type="submit"
                              name="submit_booking_id"
                              title="View"
                              onClick={getBookingDetails}
                            >
                              <img src="../dist/img/eye-b.svg" />
                            </button>
                          </form>
                          <button
                            className="btn bg-transparent complete_btn"
                            style={{ float: "left" }}
                            title="Completed"
                            onClick={() => setShowCompleteModal(true)}
                          >
                            <img src="../dist/img/Completed-b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent delete_btn"
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete"
                          >
                            <img src="../dist/img/delete-b.svg" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>15-03-2024</td>
                        <td>14:31:49</td>
                        <td>Pranay</td>
                        <td>2.</td>
                        <td>
                          <button
                            className="btn bg-transparent reserve_btn"
                            style={{ float: "left" }}
                            onClick={() => setShowReserveModal(true)}
                            title="Reserve"
                          >
                            <img src="../dist/img/reserved-b.svg" />
                          </button>
                          <form
                            action="booking-details.html"
                            style={{ float: "left" }}
                            method="POST"
                          >
                            <button
                              className="btn bg-transparent"
                              type="submit"
                              name="submit_booking_id"
                              title="View"
                              onClick={getBookingDetails}
                            >
                              <img src="../dist/img/eye-b.svg" />
                            </button>
                          </form>
                          <button
                            className="btn bg-transparent complete_btn"
                            style={{ float: "left" }}
                            title="Completed"
                            onClick={() => setShowCompleteModal(true)}
                          >
                            <img src="../dist/img/Completed-b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent delete_btn"
                            onClick={() => setShowDeleteModal(true)}
                            title="Delete"
                          >
                            <img src="../dist/img/delete-b.svg" />
                          </button>
                        </td>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ReserveModal
        show={showReserveModal}
        handleClose={() => setShowReserveModal(false)}
      />
      <CompleteModal
        show={showCompleteModal}
        handleClose={() => setShowCompleteModal(false)}
      />
      <DeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default ViewBooking;
