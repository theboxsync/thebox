import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function ViewOrderHistory() {
  const [orderData, setOrderData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/getorderhistory",
        {
          withCredentials: true,
        }
      );
      const transformedData = response.data.map((order) => {
        const dateObj = new Date(order.order_date);
        const dateOptions = {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          timeZone: "Asia/Kolkata",
        };
        const timeOptions = {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        };

        const formattedDate = dateObj.toLocaleDateString("en-IN", dateOptions);
        const formattedTime = dateObj.toLocaleTimeString("en-IN", timeOptions);

        return {
          ...order,
          order_date: formattedDate,
          order_time: formattedTime,
          order_date_obj: dateObj, // store original date object for filtering
        };
      });
      setOrderData(transformedData);
      setFilteredData(transformedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  useEffect(() => {
    const filtered = orderData.filter((order) => {
      const matchesSearchText = Object.values(order).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      );

      const matchesDateRange =
        (!startDate || order.order_date_obj >= startDate) &&
        (!endDate || order.order_date_obj <= endDate);

      return matchesSearchText && matchesDateRange;
    });

    setFilteredData(filtered);
  }, [searchText, startDate, endDate, orderData]);

  const columns = [
    { name: "Order Date", selector: (row) => row.order_date, sortable: true },
    { name: "Order Time", selector: (row) => row.order_time },
    { name: "Customer Name", selector: (row) => row.customer_name },
    { name: "Table Number", selector: (row) => row.table_no, sortable: true },
    { name: "Table Area", selector: (row) => row.table_area },
    { name: "Order Type", selector: (row) => row.order_type },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
      sortable: true,
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/manager/order-details/${row._id}`);
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
    <div className="container-fluid">
      <div className="card">
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
      </div>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={tableStyle}
        onRowClicked={handleRowClick}
        responsive
      />
    </div>
  );
}

export default ViewOrderHistory;
