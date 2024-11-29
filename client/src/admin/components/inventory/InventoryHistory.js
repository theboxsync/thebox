import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InventoryHistory({ setSection }) {
  const navigate = useNavigate();
  const [completedInventory, setCompletedInventory] = useState([]);
  const [rejectedInventory, setRejectedInventory] = useState([]);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getinventorydata`,
        { withCredentials: true }
      );

      // Filter inventory data into Completed and Rejected
      const completed = response.data.filter(
        (item) => item.status === "Completed"
      );
      const rejected = response.data.filter(
        (item) => item.status === "Rejected"
      );

      setCompletedInventory(completed);
      setRejectedInventory(rejected);
    } catch (error) {
      console.error("Error fetching inventory history:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const formatToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Requested Inventory</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => setSection("AddInventory")}
                  >
                    <img
                      src="../../dist/img/add.svg"
                      alt="Add"
                      className="mx-1"
                    />
                    Add Inventory
                  </button>
                </div>
                <div className="card-tools mx-2">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtn"
                    onClick={() => setSection("ViewInventory")}
                  >
                    <img src="../../dist/img/view.svg" /> View Requests
                  </button>
                </div>
                {/* <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-dark"
                      data-bs-toggle="modal"
                      onClick={() => setShowFilterModal(true)}
                    >
                      <img src="../../dist/img/filter.svg" alt="Filter" />{" "}
                      Filter
                    </button>
                  </div> */}
              </div>
              <div className="card-header">
                <h3 className="card-title">Completed Requests</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Bill Date</th>
                        <th>Bill Number</th>
                        <th>Category</th>
                        <th>Vendor Name</th>
                        <th>Total Amount</th>
                        <th>Unpaid Amount</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {completedInventory.map((data) => (
                        <tr key={data._id}>
                          <td>
                            {new Date(
                              data.bill_date
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </td>
                          <td>{data.bill_number}</td>
                          <td>{data.category}</td>
                          <td>{data.vendor_name}</td>
                          <td>{data.total_amount}</td>
                          <td>{data.unpaid_amount}</td>
                          <td>
                            {data.items.map((item) => (
                              <p key={item._id}>
                                {item.item_name} - {item.item_quantity}{" "}
                                {item.unit}
                              </p>
                            ))}
                          </td>
                          <td>{data.status}</td>
                          <td>
                            <button
                              className="btn btn-transparent bg-transparent"
                              title="View Details"
                              onClick={() =>
                                navigate(`/inventory/complete-details/${data._id}`)
                              }
                            >
                              <img
                                src="../../dist/img/icon/eye-b.svg"
                                alt="View Details"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Rejected Requests</h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Requested Date</th>
                        <th>Items</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rejectedInventory.map((data) => (
                        <tr key={data._id}>
                          <td>{formatToIST(data.request_date)}</td>
                          <td>
                            {data.items.map((item) => (
                              <p key={item._id}>
                                {item.item_name} - {item.item_quantity}{" "}
                                {item.unit}
                              </p>
                            ))}
                          </td>
                          <td>{data.status}</td>
                          <td>
                            <button
                              className="btn btn-transparent bg-transparent"
                              title="View Details"
                              onClick={() => navigate(`/inventory/details/${data._id}`)}
                            >
                              <img
                                src="../../dist/img/icon/eye-b.svg"
                                alt="View Details"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InventoryHistory;
