import React, { useState } from "react";

import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";

function BookingRequests({ setSection }) {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  return (
    <>
      <section className="content" id="bookingRequests">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Booking Requests</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtnBR"
                      onClick={() => setSection("AddBooking")}
                    >
                      <img src="../dist/img/add.svg" /> Add Booking
                    </button>
                  </div>
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="viewBtnBR"
                      onClick={() => setSection("ViewBooking")}
                    >
                      <img src="../dist/img/view.svg" /> View Booking
                    </button>
                  </div>
                </div>
                <div className="card-body table-responsive">
                  <table
                    id="table_requests"
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


                      </thead>
                      <tbody>
                      <tr>
                        <td>15-03-2024</td>
                        <td>14:31:49</td>
                        <td>XYZ Name</td>
                        <td>2</td>
                        <td>
                          <button
                            type="button"
                            className="btn bg-transparent approve_btn mx-2"
                            title="Approve"
                            onClick={() => setShowApproveModal(true)}
                          >
                            <img src="../dist/img/icon/approve -b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent reject_btn mx-2"
                            title="Reject"
                            onClick={() => setShowRejectModal(true)}
                          >
                            <img src="../dist/img/icon/cancel-b.svg" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>15-03-2024</td>
                        <td>14:31:49</td>
                        <td>XYZ Name</td>
                        <td>2</td>
                        <td>
                          <button
                            type="button"
                            className="btn bg-transparent approve_btn mx-2"
                            title="Approve"
                            onClick={() => setShowApproveModal(true)}
                          >
                            <img src="../dist/img/icon/approve -b.svg" />
                          </button>
                          <button
                            type="button"
                            className="btn bg-transparent reject_btn mx-2"
                            title="Reject"
                            onClick={() => setShowRejectModal(true)}
                          >
                            <img src="../dist/img/icon/cancel-b.svg" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ApproveModal
        show={showApproveModal}
        handleClose={() => setShowApproveModal(false)}
      />
      <RejectModal
        show={showRejectModal}
        handleClose={() => setShowRejectModal(false)}
      />
    </>
  );
}

export default BookingRequests;
