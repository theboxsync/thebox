import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import numWords from "num-words";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function OrderFullDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const printRef = useRef();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/getorderdata/${id}`,
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
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>
        <div> 
          <div className="container col-md-4 mt-4">
            <div ref={printRef}>
              <div className="text-center">
                <h3
                  className="text-center text-dark"
                  style={{ fontSize: "40px", fontWeight: "bold" }}
                >
                  Udpi Hotel
                </h3>
                <p className="mb-4">
                  3H8W+M54, Amruthahalli Main Rd, Talacauvery Layout, Sneha Nagar, Byatarayanapura, Bengaluru, Karnataka 560092
                </p>
              </div>

              <div className="row m-3">
                <div className="col-md-6">
                  <p>
                    <strong>Date: </strong>{" "}
                    {new Date(order[0].order_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>T No.: </strong> 7
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Bill No: </strong> 180
                  </p>
                  <p>
                    <strong>W No: </strong> 8
                  </p>
                </div>
              </div>

              <div className="row m-2">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Particular</th>
                      <th>Qty</th>
                      <th>Rate</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order[0].order_items.map((item, index) => (
                      <tr key={index}>
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

                  {/* <p>
                      <strong>GSTIN No: </strong> 4554545
                  </p>
                  <p>
                    <strong>Invoice No: </strong> 445867636
                  </p> */}
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
                  <hr />
                  <p>
                    <strong>Total:</strong> {order[0].total_amount}
                  </p>
                  <hr />
                </div>
              </div>
            </div>
            <div className="">
            <p>
              <strong>GSTIN No: </strong> 4554545
            </p>
            <p>
              <strong>Invoice No: </strong> 445867636
            </p>
          </div>
            <div className="text-left mt-4">
              <button className="btn btn-dark" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default OrderFullDetails;
