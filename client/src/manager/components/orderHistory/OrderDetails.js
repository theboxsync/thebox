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
        `${process.env.REACT_APP_MANAGER_API}/getorderdata/${id}`,
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
  const handlePrint = () => {
    window.print();
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
                  <table className="table table-bordered">
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
                          <td>{item.dish_price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4">
                  <h4 className="font-weight-bold">Billing Information</h4>
                  <div className="card">
                    <div className="card-body">
                      <p>
                        <strong>Bill Amount:</strong> ₹{data.bill_amount}
                      </p>
                      <p>
                        <strong>Discount:</strong> ₹{data.discount_amount}
                      </p>
                      <p>
                        <strong>Total Amount:</strong> ₹{data.total_amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Print Button */}
          <div className="text-center m-3 print-btn">
            <button className="btn btn-dark" onClick={handlePrint}>
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
