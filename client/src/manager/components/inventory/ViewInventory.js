import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteInventoryModal from "./DeleteInventoryModal";
import FilterModal from "./FilterModal";

function ViewInventory({ setSection }) {
  const navigate = useNavigate();

  const [inventoryData, setInventoryData] = useState([]);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/getinventorydata`,
        {
          withCredentials: true,
        }
      );
      setInventoryData(response.data);
    } catch (error) {
      console.log("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const viewInventoryDetails = (id) => {
    navigate(`/inventory/details/${id}`);
  };

  const [selectedDeleteInventory, setSelectedDeleteInventory] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const deleteModal = (id) => {
    setSelectedDeleteInventory(id);
    setShowDeleteModal(true)
  }

  // Utility function to format date to IST
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
                                type="button"
                                className="btn btn-transparent bg-transparent"
                                onClick={() => viewInventoryDetails(data._id)}
                              >
                                <img src="../../dist/img/icon/eye-b.svg" alt="View Details" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-transparent bg-transparent"
                                onClick={() => deleteModal(data._id)}
                              >
                                <img src="../../dist/img/icon/delete-b.svg" alt="Delete" />
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
      <DeleteInventoryModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id = { selectedDeleteInventory }
        fetchInventoryData={fetchInventoryData}
      />
    </>
  );
}

export default ViewInventory;
