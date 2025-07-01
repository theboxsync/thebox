import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../../style.css";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function OrderDetails() {
  const { id } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/order/getorderdata/${id}`,
        { withCredentials: true }
      );
      setOrder(response.data);
      console.log(response.data);
      console.log(response.data.order_items);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch order details");
      setLoading(false);
    }
  };
  
  const handlePrint = async (orderId) => {
    try {
      const orderResponse = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/order/getorderdata/${orderId}`,
        { withCredentials: true }
      );

      const userResponse = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/user/userdata`,
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
    fetchOrderDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="wrapper">
        <Navbar />
        <MenuBar />
        <div className="content-wrapper">
          <div id="printable-invoice">
            {order.map((data) => (
              <div className="container-fluid px-5 py-3">
                <h2 className="mb-3 text-center font-weight-bold">
                  Order Details
                </h2>
                <div className="card">
                  <div className="card-body">
                    <h4>
                      <strong>Customer: </strong> {data.customer_name}
                    </h4>
                    <p>
                      <strong>Order ID:</strong> {data._id}
                    </p>
                    <p>
                      <strong>Order Type:</strong> {data.order_type}
                    </p>
                    {data.order_type === "Dine In" && (
                      <p>
                        <strong>Table Area:</strong> {data.table_area} |{" "}
                        <strong>Table No.:</strong> {data.table_no}
                      </p>
                    )}
                    <p>
                      <strong>Waiter:</strong> {data.waiter || "Not Assigned"}
                    </p>
                    <p>
                      <strong>Total Persons:</strong>{" "}
                      {data.total_persons || "-"}
                    </p>
                    <p>
                      <strong>Comment:</strong> {data.comment || "No comments"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-weight-bold">Ordered Items</h4>
                  <table className="table table-bordered bg-white">
                    <thead>
                      <tr>
                        <th>Dish Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.order_items.map((item) => (
                        <tr key={item._id}>
                          <td>{item.dish_name}</td>
                          <td>{item.quantity}</td>
                          <td>₹ {item.dish_price}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="2" className="text-right">
                          <strong>Sub Total:</strong>
                        </td>
                        <td>₹ {data.sub_total}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-right">
                          <strong>CGST ({data.cgst_amount} %):</strong>
                        </td>
                        <td>₹ {(data.cgst_amount * data.sub_total) / 100}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-right">
                          <strong>SGST ({data.sgst_amount} %):</strong>
                        </td>
                        <td>₹ {(data.sgst_amount * data.sub_total) / 100}</td>
                      </tr>
                      <tr>
                        <td colSpan="2" className="text-right">
                          <strong>Total:</strong>
                        </td>
                        <td>₹ {data.total_amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-4">
                  <h4 className="font-weight-bold">Billing Information</h4>
                  <div className="card">
                    <div className="card-body">
                      <p>
                        <strong>Bill Amount:</strong> ₹ {data.bill_amount}
                      </p>
                      <p>
                        <strong>Discount:</strong> ₹ {data.discount_amount || 0}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ₹ {data.total_amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Print Button */}
            <div className="text-center m-3 print-btn">
              <button className="btn btn-dark" onClick={() => handlePrint(id)}>
                Print Invoice
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default OrderDetails;
