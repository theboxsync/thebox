import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import DeleteInventoryModal from "./DeleteInventoryModal";

import Loading from "../Loading";

function InventoryHistory({ setSection }) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // State for completed and rejected inventory
  const [completedInventory, setCompletedInventory] = useState([]);
  const [rejectedInventory, setRejectedInventory] = useState([]);
  const [filteredCompletedInventory, setFilteredCompletedInventory] = useState(
    []
  );
  const [filteredRejectedInventory, setFilteredRejectedInventory] = useState(
    []
  );

  // Filters for Completed
  const [completedSearchTerm, setCompletedSearchTerm] = useState("");
  const [completedStartDate, setCompletedStartDate] = useState("");
  const [completedEndDate, setCompletedEndDate] = useState("");

  // Filters for Rejected
  const [rejectedSearchTerm, setRejectedSearchTerm] = useState("");
  const [rejectedStartDate, setRejectedStartDate] = useState("");
  const [rejectedEndDate, setRejectedEndDate] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/inventory/getinventorydata`,
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
      setFilteredCompletedInventory(completed);
      setFilteredRejectedInventory(rejected);
    } catch (error) {
      console.error("Error fetching inventory history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  // Filtering for Completed Requests
  useEffect(() => {
    const filterData = (data) => {
      return data.filter((item) => {
        const matchesSearch =
          completedSearchTerm === "" ||
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(completedSearchTerm.toLowerCase()) ||
          item.items.some((subItem) =>
            Object.values(subItem)
              .join(" ")
              .toLowerCase()
              .includes(completedSearchTerm.toLowerCase())
          );
        const matchesDate =
          (!completedStartDate ||
            new Date(item.request_date) >= new Date(completedStartDate)) &&
          (!completedEndDate ||
            new Date(item.request_date) <= new Date(completedEndDate));
        return matchesSearch && matchesDate;
      });
    };

    setFilteredCompletedInventory(filterData(completedInventory));
  }, [
    completedSearchTerm,
    completedStartDate,
    completedEndDate,
    completedInventory,
  ]);

  // Filtering for Rejected Requests
  useEffect(() => {
    const filterData = (data) => {
      return data.filter((item) => {
        const matchesSearch =
          rejectedSearchTerm === "" ||
          Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(rejectedSearchTerm.toLowerCase()) ||
          item.items.some((subItem) =>
            Object.values(subItem)
              .join(" ")
              .toLowerCase()
              .includes(rejectedSearchTerm.toLowerCase())
          );
        const matchesDate =
          (!rejectedStartDate ||
            new Date(item.request_date) >= new Date(rejectedStartDate)) &&
          (!rejectedEndDate ||
            new Date(item.request_date) <= new Date(rejectedEndDate));
        return matchesSearch && matchesDate;
      });
    };

    setFilteredRejectedInventory(filterData(rejectedInventory));
  }, [
    rejectedSearchTerm,
    rejectedStartDate,
    rejectedEndDate,
    rejectedInventory,
  ]);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

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

  const formatToISTshort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // DataTable Columns for Completed Requests
  const completedColumns = [
    {
      name: "Requested Date",
      selector: (row) => new Date(row.request_date),
      sortable: true,
      format: (row) => formatToISTshort(row.request_date),
    },
    {
      name: "Bill Date",
      selector: (row) => new Date(row.bill_date),
      sortable: true,
      format: (row) => formatToISTshort(row.bill_date),
    },
    { name: "Bill Number", selector: (row) => row.bill_number, sortable: true },
    { name: "Vendor Name", selector: (row) => row.vendor_name, sortable: true },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name: "Unpaid Amount",
      selector: (row) => row.unpaid_amount,
      sortable: true,
    },
    {
      name: "Items",
      cell: (row) =>
        row.items.map((item) => (
          <p key={item._id}>
            {item.item_name} - {item.item_quantity} {item.unit}
          </p>
        )),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            className="btn-transparent bg-transparent"
            title="View Details"
            style={{ border: "none" }}
            onClick={() => navigate(`/inventory/complete-details/${row._id}`)}
          >
            <img src="../../dist/img/icon/eye-b.svg" alt="View Details" />
          </button>
          <button
            className="btn-transparent bg-transparent"
            title="Edit"
            style={{ border: "none" }}
            onClick={() => navigate(`/inventory/completed-update/${row._id}`)}
          >
            <img src="../../dist/img/edit-b.svg" alt="Edit" />
          </button>
          <button
            className="btn-transparent bg-transparent"
            title="Delete"
            style={{ border: "none" }}
            onClick={() => handleDelete(row._id)}
          >
            <img src="../../dist/img/delete-b.svg" alt="Delete" />
          </button>
        </div>
      ),
    },
  ];

  // DataTable Columns for Rejected Requests
  const rejectedColumns = [
    {
      name: "Requested Date",
      selector: (row) => new Date(row.request_date),
      sortable: true,
      format: (row) => formatToISTshort(row.request_date),
    },
    {
      name: "Items",
      cell: (row) =>
        row.items.map((item) => (
          <p key={item._id}>
            {item.item_name} - {item.item_quantity} {item.unit}
          </p>
        )),
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="btn-transparent bg-transparent"
            title="View Details"
            style={{ border: "none" }}
            onClick={() => navigate(`/inventory/details/${row._id}`)}
          >
            <img src="../../dist/img/icon/eye-b.svg" alt="View Details" />
          </button>
          <button
            className="btn-transparent bg-transparent"
            title="Delete"
            style={{ border: "none" }}
            onClick={() => handleDelete(row._id)}
          >
            <img src="../../dist/img/delete-b.svg" alt="Delete" />
          </button>
        </>
      ),
    },
  ];

  const rejectResetFilters = () => {
    setRejectedSearchTerm("");
    setRejectedStartDate("");
    setRejectedEndDate("");
  };

  const comfirmResetFilters = () => {
    setCompletedSearchTerm("");
    setCompletedStartDate("");
    setCompletedEndDate("");
  };

  if (loading) return <Loading />;

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Inventory History</h3>
            <div className="card-tools">
              <button
                type="button"
                className="btn-dark mx-2"
                style={{ border: "none" }}
                onClick={() => setSection("ViewInventory")}
              >
                <img
                  src="../../dist/img/view.svg"
                  alt="History"
                  className="mx-1"
                />
                View Inventory
              </button>
              <button
                type="button"
                className="btn-dark"
                style={{ border: "none" }}
                onClick={() => setSection("AddInventory")}
              >
                <img src="../../dist/img/add.svg" alt="Add" className="mx-1" />
                Add Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Filters for Completed */}
        <div className="card mb-3">
          <div className="card-header">
            <h3 className="card-title">Completed Requests</h3>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div style={{ width: "400px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Completed Requests"
                    value={completedSearchTerm}
                    onChange={(e) => setCompletedSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="row col-md-8 d-flex justify-content-end">
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                    value={completedStartDate}
                    onChange={(e) => setCompletedStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="End Date"
                    value={completedEndDate}
                    onChange={(e) => setCompletedEndDate(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={comfirmResetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            <DataTable
              columns={completedColumns}
              data={filteredCompletedInventory}
              defaultSortFieldId={1} // first column
              defaultSortAsc={false} // newest first
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>

        {/* Filters for Rejected */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Rejected Requests</h3>
          </div>
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-4">
                <div style={{ width: "400px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Rejected Requests"
                    value={rejectedSearchTerm}
                    onChange={(e) => setRejectedSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="row col-md-8 d-flex justify-content-end">
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Start Date"
                    value={rejectedStartDate}
                    onChange={(e) => setRejectedStartDate(e.target.value)}
                  />
                </div>
                <div className="col-md-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="End Date"
                    value={rejectedEndDate}
                    onChange={(e) => setRejectedEndDate(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  onClick={rejectResetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
            <DataTable
              columns={rejectedColumns}
              data={filteredRejectedInventory}
              defaultSortFieldId={1}
              defaultSortAsc={false}
              pagination
              highlightOnHover
              responsive
            />
          </div>
        </div>

        <DeleteInventoryModal
          show={showDeleteModal}
          handleClose={handleCloseDeleteModal}
          id={deleteId}
          fetchInventoryData={fetchInventoryData}
        />
      </div>
    </section>
  );
}

export default InventoryHistory;
