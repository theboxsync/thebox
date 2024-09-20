import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import DeleteBillModal from "./DeleteBillModal";
import FilterModal from "./FilterModal";

function ViewInventory({ setSection }) {
  // Ensure correct casing for component names
  const navigate = useNavigate();
  const viewDetails = () => {
    navigate("/inventory/details");
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showFilterModal, setShowFilterModal] = useState(false);

  return (
    <>
      <section className="content" id="viewInventory">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Inventory</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtn"
                      onClick={() => setSection("AddInventory")}
                    >
                      <img src="../../dist/img/add.svg" alt="Add" /> Add
                      Inventory
                    </button>
                  </div>
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      data-bs-toggle="modal"
                      data-bs-target="#filterModal"
                      onClick={() => setShowFilterModal(true)}
                    >
                      <img src="../../dist/img/filter.svg" alt="Filter" />{" "}
                      Filter
                    </button>
                  </div>
                </div>
                <div className="card-body ">
                  <div className="table-responsive">
                    <table
                      id="example1"
                      className="table table-bordered table-striped"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Bill No.</th>
                          <th>Vendor</th>
                          <th>Category</th>
                          <th>Total Amount</th>
                          <th>Unpaid Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>15/03/2024</td>
                          <td>12345</td>
                          <td>Dmart</td>
                          <td>Grocery</td>
                          <td>5000</td>
                          <td>0</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-block bg-transparent"
                              onClick={viewDetails}
                            >
                              <img src="../../dist/img/icon/eye-b.svg" />
                            </button>
                            <button
                              type="button"
                              className="btn btn-block bg-transparent"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteBillModal"
                              onClick={() => setShowDeleteModal(true)}
                            >
                              <img
                                src="../../dist/img/delete-b.svg"
                                alt="Add"
                              />{" "}
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
        </div>
      </section>

      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
      />
      <DeleteBillModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default ViewInventory;
