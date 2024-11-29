import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FilterModal from "./FilterModal";
import RejectRequestModal from "./RejectRequestModal";

function ViewInventory({ setSection }) {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);

  // Fetch data and filter by status
  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getinventorydata`,
        { withCredentials: true }
      );
      // Filter inventory data with "Requested" status
      const requestedInventory = response.data.filter(
        (item) => item.status === "Requested"
      );
      setInventoryData(requestedInventory);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const viewInventoryDetails = (id) => {
    navigate(`/inventory/details/${id}`);
  };

  const completeInventoryRequest = (id) => {
    navigate("/inventory/complete", { state: { id } });
  };

  const openRejectModal = (id) => {
    setSelectedInventoryId(id); // Set the ID of the selected inventory
    setShowRejectModal(true); // Open the modal
  };

  const closeRejectModal = () => {
    setSelectedInventoryId(null); // Clear the selected ID
    setShowRejectModal(false); // Close the modal
  };

  // Format date to IST
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
    <>
      <section className="content" id="viewInventory">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Inventory Requests</h3>
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
                      className="btn btn-dark"
                      onClick={() => setSection("InventoryHistory")}
                    >
                      <img
                        src="../../dist/img/order-history.svg"
                        alt="History"
                        className="mx-1"
                      />
                      Inventory History
                    </button>
                  </div>
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
                        {inventoryData.map((data) => (
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
                                onClick={() => viewInventoryDetails(data._id)}
                              >
                                <img
                                  src="../../dist/img/icon/eye-b.svg"
                                  alt="View Details"
                                />
                              </button>
                              <button
                                className="btn btn-transparent bg-transparent"
                                title="Complete"
                                onClick={() =>
                                  completeInventoryRequest(data._id)
                                }
                              >
                                <img
                                  src="../../dist/img/icon/approve -b.svg"
                                  alt="Approve"
                                />
                              </button>
                              <button
                                className="btn btn-transparent bg-transparent"
                                title="Reject"
                                onClick={() => openRejectModal(data._id)}
                              >
                                <img
                                  src="../../dist/img/icon/cancel-b.svg"
                                  alt="Reject"
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

      <FilterModal
        show={showFilterModal}
        handleClose={() => setShowFilterModal(false)}
      />

      <RejectRequestModal
        show={showRejectModal}
        handleClose={closeRejectModal}
        id={selectedInventoryId}
        fetchInventoryData={fetchInventoryData}
      />
    </>
  );
}

export default ViewInventory;
