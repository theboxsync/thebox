import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import numWords from "num-words";

function OrderFullDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const printRef = useRef();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getorderdata/${id}`,
        {
          withCredentials: true,
        }
      );
      setOrder(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4" style={{ width: "600px" }}>
      <div ref={printRef}>
        <h1
          className="text-center text-dark mb-5"
          style={{ fontSize: "40px", fontWeight: "bold" }}
        >
          Regenta
        </h1>
        <div className="row m-3">
          <div className="col-md-6">
            <p>
              <strong>Address: </strong> Gujarat
            </p>
            <p>
              <strong>Phone Number: </strong> 454564545454
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>GSTIN No: </strong> 4554545
            </p>
            <p>
              <strong>Invoice No: </strong> 445867636
            </p>
          </div>
        </div>
        <div className="row bg-dark text-white m-2">
          <h4 className="m-4 col">Bill To:</h4>
        </div>
        <div className="row m-2">
          <div className="col-md-6">
            <p>
              <strong>Name:</strong> {order[0].customer_name}
            </p>
            <p>
              <strong>Email:</strong> --
            </p>
            <p>
              <strong>Phone No:</strong> --
            </p>
          </div>
          <div className="col-md-6">
            <p>
              <strong>GSTIN:</strong> --
            </p>
            <p>
              <strong>State:</strong> --
            </p>
            <p>
              <strong>Date:</strong>
              {new Date(order[0].order_date).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="row m-2">
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>S.No</th>
                <th>Goods Description</th>
                <th>QTY</th>
                <th>MRP</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {order[0].order_items.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.dish_name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.dish_price}</td>
                  <td>{item.quantity * item.dish_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row m-2">
          <div className="col-md-8">
            <p>
              <strong>Amount in words:</strong>{" "}
              {numWords(order[0].total_amount)}
            </p>
          </div>
          <div className="col-md-4">
            <p>
              <strong>Discount:</strong> --
            </p>
            <p>
              <strong>SGST:</strong> --
            </p>
            <p>
              <strong>CGST:</strong> --
            </p>
            <p>
              <strong>Service Tax:</strong> --
            </p>
            <p>
              <strong>Total:</strong> {order[0].total_amount}
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}

export default OrderFullDetails;
