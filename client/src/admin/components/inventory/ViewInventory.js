import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FilterModal from "./FilterModal";
import RejectRequestModal from "./RejectRequestModal";

function ViewInventory({ setSection }) {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedInventoryId, setSelectedInventoryId] = useState(null);

  const fetchInventoryData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getinventorydata`,
        { withCredentials: true }
      );

      const requestedInventory = response.data
        .filter((item) => item.status === "Requested")
        .map((item) => ({
          ...item,
          request_date_obj: new Date(item.request_date),
          formatted_date: new Date(item.request_date).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        }));

      setInventoryData(requestedInventory);
      setFilteredData(requestedInventory);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  useEffect(() => {
    const filtered = inventoryData.filter((data) => {
      // Check if any property of the inventory object matches the search text
      const matchesSearchText =
        Object.values(data).some((value) =>
          typeof value === "string"
            ? value.toLowerCase().includes(searchText.toLowerCase())
            : false
        ) ||
        // Check if any item name in the `items` array matches the search text
        data.items.some((item) =>
          item.item_name.toLowerCase().includes(searchText.toLowerCase())
        );

      // Check if the inventory request date falls within the selected date range
      const matchesDateRange =
        (!startDate || data.request_date_obj >= startDate) &&
        (!endDate || data.request_date_obj <= endDate);

      return matchesSearchText && matchesDateRange;
    });

    setFilteredData(filtered);
  }, [searchText, startDate, endDate, inventoryData]);

  const columns = [
    {
      name: "Requested Date",
      selector: (row) => row.formatted_date,
      sortable: true,
    },
    {
      name: "Items",
      cell: (row) => (
        <div>
          {row.items.map((item, index) => (
            <p key={index} style={{ margin: 0 }}>
              {item.item_name} - {item.item_quantity} {item.unit}
            </p>
          ))}
        </div>
      ),
    },
    { name: "Status", selector: (row) => row.status },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn btn-transparent bg-transparent"
            title="View Details"
            onClick={() => navigate(`/inventory/details/${row._id}`)}
          >
            <img src="../../dist/img/icon/eye-b.svg" alt="View Details" />
          </button>
          <button
            className="btn btn-transparent bg-transparent"
            title="Complete"
            onClick={() =>
              navigate("/inventory/complete", { state: { id: row._id } })
            }
          >
            <img src="../../dist/img/icon/approve -b.svg" alt="Approve" />
          </button>
          <button
            className="btn btn-transparent bg-transparent"
            title="Reject"
            onClick={() => openRejectModal(row._id)}
          >
            <img src="../../dist/img/icon/cancel-b.svg" alt="Reject" />
          </button>
        </div>
      ),
    },
  ];

  const openRejectModal = (id) => {
    setSelectedInventoryId(id);
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setSelectedInventoryId(null);
    setShowRejectModal(false);
  };

  const tableStyle = {
    head: {
      style: {
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        color: "#212529",
        border: "1px solid #dee2e6",
      },
    },
    rows: {
      style: {
        fontSize: 14,
        textAlign: "center",
        color: "#212529",
        border: "1px solid #dee2e6",
      },
    },
  };

  return (
    <>
      <section className="content" id="viewInventory">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Inventory Requests</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-dark mx-2"
                  onClick={() => setSection("InventoryHistory")}
                >
                  <img
                    src="../../dist/img/order-history.svg"
                    alt="History"
                    className="mx-1"
                  />
                  Inventory History
                </button>
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
            </div>
            <div className="card-body">
              <div className="m-3 d-flex justify-content-between">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="form-control w-25 mx-3"
                />
                <div className="d-flex align-items-center w-25">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="form-control"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    className="form-control mx-3"
                  />
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
                customStyles={tableStyle}
                responsive
              />
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
