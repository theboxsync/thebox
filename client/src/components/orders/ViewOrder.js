import React, { useState } from "react";

import RejectOrderModal from "./RejectOrderModal";
import UpdateOrderModal from "./UpdateOrderModal";

function ViewOrder({ setSection }) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <section className="content" id="viewOrder">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Offline Orders</h3>
                  <div className="card-tools d-flex">
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-block btn-dark "
                        id="VMorderHistory"
                        onClick={() => setSection("OrderHistory")}
                      >
                        <img src="../dist/img/order-history.svg" /> Order
                        History
                      </button>
                    </div>
                    <div className="card-tools mx-2">
                      <button
                        type="button"
                        className="btn btn-block btn-dark "
                        id="VMaddButton"
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
                      id="offline_order_tbl"
                      className="table table-striped table-bordered"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Customer Name</th>
                          <th>Table Number</th>
                          <th>Customer Number</th>
                          <th>Customer Email</th>
                          <th>Total Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Hello</td>
                          <td>1</td>
                          <td>1111111111</td>
                          <td>hello11@gmail.com</td>
                          <td>50</td>
                          <td>
                            <button
                              type="button"
                              className="btn bg-transparent update_order_btn "
                              title="Edit"
                              onClick={() => setShowEditModal(true)}
                            >
                              <img src="../dist/img/edit-b.svg" />
                            </button>
                            <button
                              type="button"
                              name="order_ompleted"
                              className="btn bg-transparent  order_ompleted"
                              title="Order Completed"
                            >
                              <img src="../dist/img/Completed-b.svg" />
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Hello</td>
                          <td>1</td>
                          <td>1111111111</td>
                          <td>hello11@gmail.com</td>
                          <td>50</td>
                          <td>
                            <button
                              type="button"
                              className="btn bg-transparent update_order_btn "
                              title="Edit"
                              onClick={() => setShowEditModal(true)}
                            >
                              <img src="../dist/img/edit-b.svg" />
                            </button>
                            <button
                              type="button"
                              name="order_ompleted"
                              className="btn bg-transparent  order_ompleted"
                              title="Order Completed"
                            >
                              <img src="../dist/img/Completed-b.svg" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title ">Manage Online Orders</h3>
                </div>
                <div className="card-body">
                  <div className="container-fluid table-responsive">
                    <table
                      id="online_order_tbl"
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
                          <th>Current Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>xyz</td>
                          <td>1111111111</td>
                          <td>xyz@gmail.com</td>
                          <td>500</td>
                          <td>Pending</td>
                          <td>
                            <div className="d-flex">
                              <form
                                action="/CRM/Restaurant-Order/Order-Details"
                                method="POST"
                              >
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
                                className="btn bg-transparent accept_order_btn "
                                title="Approve"
                                onClick={() => setShowEditModal(true)}
                              >
                                <img src="../dist/img/approve -b.svg" />
                              </button>
                              <button
                                type="button"
                                className="btn bg-transparent reject_order_btn"
                                title="Reject"
                                onClick={() => setShowRejectModal(true)}
                              >
                                <img src="../dist/img/cancel-b.svg" />
                              </button>
                              <button
                                type="button"
                                className="btn bg-secondary dispached_order_btn mx-2"
                                onClick={() => setShowEditModal(true)}
                              >
                                Dispached
                              </button>
                              <button
                                type="button"
                                className="btn bg-secondary delivered_order_btn mx-2"
                                onClick={() => setShowEditModal(true)}
                              >
                                Delivered
                              </button>
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

      <UpdateOrderModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
      />

      <RejectOrderModal
        show={showRejectModal}
        handleClose={() => setShowRejectModal(false)}
      />
    </>
  );
}

export default ViewOrder;
