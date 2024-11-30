import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

export default function InventoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inventoryItem, setInventoryItem] = useState(null);

  // Fetch inventory details based on the ID from the URL
  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_API}/getinventorydata/${id}`,
          { withCredentials: true }
        );
        setInventoryItem(response.data);
      } catch (error) {
        console.error("Error fetching inventory item details:", error);
      }
    };

    fetchInventoryItem();
  }, [id]);

  const editDetails = () => {
    navigate(`/inventory/update/${id}`);
  };

  if (!inventoryItem) {
    return (
      <div className="wrapper">
        <Navbar />
        <MenuBar />
        <div className="content-wrapper">
          <div className="text-center my-5">
            <h3>Loading...</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Inventory Details</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-block btn-dark"
                        id="viewBtn"
                        onClick={() => navigate("/inventory/")}
                      >
                        <img src="../../dist/img/view.svg" alt="view" /> View
                        Inventory
                      </button>
                    </div>
                  </div>
                </div>
                <div className="invoice p-3 mb-3">
                  {/* Inventory Header */}
                  {inventoryItem.request_date !== null ? (
                    <>
                      <div className="row">
                        <div className="col-12">
                          <h4>
                            <small>
                              <strong>Requested Date:</strong>{" "}
                              {new Date(
                                inventoryItem.request_date
                              ).toLocaleDateString("en-IN")}
                            </small>
                          </h4>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <h4>
                            <small>
                              <strong>Requested Time:</strong>{" "}
                              {new Date(
                                inventoryItem.request_date
                              ).toLocaleTimeString("en-IN")}
                            </small>
                          </h4>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className="row">
                    <div className="col-12">
                      <h4>
                        <small>
                          <strong>Bill Date:</strong>{" "}
                          {new Date(inventoryItem.bill_date).toLocaleDateString(
                            "en-IN"
                          )}
                        </small>
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 m-3">
                      <h4>
                        <small>
                          <strong>Status: </strong>
                          {inventoryItem.status}
                        </small>
                      </h4>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-12 table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr align="center">
                            <th colSpan="7" style={{ fontSize: "18px" }}>
                              Purchase Details
                            </th>
                          </tr>
                          <tr>
                            <th>Bill Number</th>
                            <th>Category</th>
                            <th>Vendor Name</th>
                            <th>Paid Amount</th>
                            <th>Total Amount</th>
                            <th>Unpaid Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={inventoryItem._id}>
                            <td>{inventoryItem.bill_number}</td>
                            <td>{inventoryItem.category}</td>
                            <td>{inventoryItem.vendor_name}</td>
                            <td>{inventoryItem.paid_amount}</td>
                            <td>{inventoryItem.total_amount}</td>
                            <td>{inventoryItem.unpaid_amount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Inventory Items */}
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-12 table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr align="center">
                            <th colSpan="3" style={{ fontSize: "18px" }}>
                              Inventory Items
                            </th>
                          </tr>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItem.items.map((item) => (
                            <tr key={item._id}>
                              <td>{item.item_name}</td>
                              <td>
                                {item.item_quantity} {item.unit}
                              </td>
                              <td>{item.item_price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Attached Files */}
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-md-12">
                      {inventoryItem.bill_files &&
                      inventoryItem.bill_files.length > 0 ? (
                        <>
                          <h5>Attached Files:</h5>
                          <div className="d-flex flex-wrap">
                            {inventoryItem.bill_files.map((file, index) => (
                              <div
                                key={index}
                                className="m-2"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                }}
                              >
                                {file.endsWith(".pdf") ? (
                                  <iframe
                                    src={
                                      process.env.REACT_APP_ADMIN_API +
                                      "/uploads/inventory/bills/" +
                                      file
                                    }
                                    title={`PDF File ${index + 1}`}
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={
                                      process.env.REACT_APP_ADMIN_API +
                                      "/uploads/inventory/bills/" +
                                      file
                                    }
                                    alt={`Bill ${index + 1}`}
                                    style={{
                                      width: "150px",
                                      height: "150px",
                                      objectFit: "cover",
                                      border: "1px solid #ccc",
                                    }}
                                  />
                                )}
                                <a
                                  href={
                                    process.env.REACT_APP_ADMIN_API +
                                    "/uploads/inventory/bills/" +
                                    file
                                  }
                                  download={
                                    process.env.REACT_APP_ADMIN_API +
                                    "/uploads/inventory/bills/" +
                                    file
                                  }
                                >
                                  <button className="btn btn-primary btn-sm mt-2">
                                    View
                                  </button>
                                </a>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p>No files attached.</p>
                      )}
                    </div>
                  </div>

                  {/* Edit Button */}
                  {/* <div className="row mt-3">
                    <div className="col-12">
                      <button
                        className="btn btn-dark float-right"
                        type="button"
                        onClick={editDetails}
                      >
                        <img
                          src="../../dist/img/edit.svg"
                          alt="Edit"
                          style={{ marginRight: "5px" }}
                        />
                        Edit
                      </button>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
