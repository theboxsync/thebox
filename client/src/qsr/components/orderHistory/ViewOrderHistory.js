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
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QSR_API}/order/getorderhistory`,
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

  const handlePrint = async (orderId) => {
    try {
      const orderResponse = await axios.get(
        `${process.env.REACT_APP_QSR_API}/order/getorderdata/${orderId}`,
        { withCredentials: true }
      );

      const userResponse = await axios.get(
        `${process.env.REACT_APP_QSR_API}/user/userdata`,
        { withCredentials: true }
      );

      const order = orderResponse.data[0];
      const userData = userResponse.data;

      const printDiv = document.createElement("div");
      printDiv.id = "printable-invoice";
      printDiv.style.display = "none";
      document.body.appendChild(printDiv);

      printDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; border: 1px solid #ccc; padding: 10px;">
          <div style="text-align: center; margin-bottom: 10px;">
            <h3 style="margin: 10px;">${userData.name}</h3>
            <p style="margin: 0; font-size: 12px;">${userData.address}</p>
            <p style="margin: 0; font-size: 12px;">${userData.city}, ${
        userData.state
      } ${userData.pincode}</p>
            <p style="margin: 10px; font-size: 12px;"><strong>Phone: </strong> ${
              userData.mobile
            }</p>
          </div>
          <hr style="border: 0.5px dashed #ccc;" />
          <p><strong>Name:</strong> ${
            order.customer_name || "(M: 1234567890)"
          }</p>
          <hr style="border: 0.5px dashed #ccc;" />
          <table style="font-size: 12px; margin-bottom: 10px;">
            <tr>
            <td style="width: 50%; height: 30px;">
              <strong>Date:</strong> ${new Date(
                order.order_date
              ).toLocaleString()}</td>
                <td style="text-align: right;"><strong>${
                  order.order_type
                }</strong>
                </td>
            </tr>
            <tr>
            <td colspan="2"><strong>Bill No:</strong> ${order._id}</td>
            
            </tr>
          </table>
          <hr style="border: 0.5px dashed #ccc;" />
          <table style="width: 100%; font-size: 12px; margin-bottom: 10px;">
            <thead>
              <tr>
                <th style="text-align: left; border-bottom: 1px dashed #ccc">Item</th>
                <th style="text-align: center; border-bottom: 1px dashed #ccc">Qty</th>
                <th style="text-align: center; border-bottom: 1px dashed #ccc">Price</th>
                <th style="text-align: right; border-bottom: 1px dashed #ccc">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${order.order_items
                .map(
                  (item) => `
                  <tr>
                    <td>${item.dish_name}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: center;">${item.dish_price}</td>
                    <td style="text-align: right;">₹ ${
                      item.dish_price * item.quantity
                    }</td>
                  </tr>
                `
                )
                .join("")}
              <tr>
                <td colspan="3" style="text-align: right; border-top: 1px dashed #ccc"><strong>Sub Total: </strong></td>
                <td style="text-align: right; border-top: 1px dashed #ccc">₹ ${
                  order.sub_total
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>CGST (${
                  order.cgst_amount || 0
                } %):</strong></td>
                <td style="text-align: right;">₹ ${
                  ((order.cgst_amount || 0) * order.bill_amount) / 100
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>SGST (${
                  order.sgst_amount || 0
                } %):</strong></td>
                <td style="text-align: right;">₹ ${
                  ((order.sgst_amount || 0) * order.bill_amount) / 100
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>Total: </strong></td>
                <td style="text-align: right;">₹ ${order.total_amount}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>Discount: </strong></td>
                <td style="text-align: right;">- ₹ ${
                  order.discount_amount || 0
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; border-top: 1px dashed #ccc"><strong>Paid Amount: </strong></td>
                <td style="text-align: right; border-top: 1px dashed #ccc">₹ ${
                  order.bill_amount
                }</td>
              </tr>
            </tbody>
          </table>
          <hr style="border: 0.5px dashed #ccc;" />
          <div style="text-align: center; font-size: 12px;">
            <p style="margin: 10px; font-size: 12px;"><strong>FSSAI Lic No:</strong> 11224333001459</p>
            <p style="margin: 10px; font-size: 12px;"><strong>GST No:</strong> ${
              userData.gst_no
            }</p>
            <p style="margin: 10px; font-size: 12px;"><strong>Thanks, Visit Again</strong></p>
          </div>
        </div>
      `;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(printDiv.innerHTML);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();

      document.body.removeChild(printDiv);
      setPaymentSection(false);
    } catch (error) {
      console.error("Error fetching order or user data:", error);
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
    {
      name: "Action",
      cell: (row) => (
        <>
          <img
            src="../../dist/img/eye-b.svg"
            alt="view"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/order-details/${row._id}`)}
          />

          <img
            src="../../dist/img/print.svg"
            alt="Print"
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={() => handlePrint(row._id)}
          />
        </>
      ),
    },
  ];

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
          responsive
        />
      </div>
    </>
  );
}

export default ViewOrderHistory;
