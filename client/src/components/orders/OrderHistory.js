import React, { useState } from "react";

import RejectOrderModal from "./RejectOrderModal";

function OrderHistory({ setSection }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  return (
    <>
      <section className="content" id="orderHistory">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Order History</h3>
                  <div className="card-tools d-flex">
                    <div className="card-tools mx-2">
                      <button
                        type="button"
                        className="btn btn-block btn-dark "
                        id="OHviewBtn"
                        onClick={() => setSection("ViewOrder")}
                      >
                        <img src="../dist/img/view.svg" /> View Order
                      </button>
                    </div>
                    <div className="card-tools mx-2">
                      <button
                        type="button"
                        className="btn btn-block btn-dark"
                        id="OHaddButton"
                        onClick={() => setSection("AddOrder")}
                      >
                        <img src="../dist/img/add.svg" /> Add Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="container-fluid table-responsive">
                    <table
                      id="order_history_tbl"
                      className="table table-striped table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer Name</th>
                          <th>Customer Number</th>
                          <th>Customer Email</th>
                          <th>Total Amount</th>
                          <th>Order Mode</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>Hello</td>
                          <td>5457456585</td>
                          <td>hello@gmasil.com</td>
                          <td>51000</td>
                          <td>Online</td>
                          <td>
                            <div className="d-flex ">
                              <form action="Order-Details" method="POST">
                                <input type="hidden" name="order_id" />
                                <button
                                  type="submit"
                                  name="view_details"
                                  className="btn bg-transparent "
                                  title="View"
                                >
                                  <img src="../dist/img/eye-b.svg" />
                                </button>
                              </form>
                              <button
                                type="button"
                                className="btn bg-transparent reject_order_btn "
                                title="Delete"
                                onClick={() => setShowRejectModal(true)}
                              >
                                <img src="../dist/img/delete-b.svg" />
                              </button>
                            </div>
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

      <RejectOrderModal
        show={showRejectModal}
        handleClose={() => setShowRejectModal(false)}
      />
    </>
  );
}

export default OrderHistory;
