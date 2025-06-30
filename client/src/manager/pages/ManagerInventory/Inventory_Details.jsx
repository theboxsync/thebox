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
          `${process.env.REACT_APP_MANAGER_API}/inventory/getinventorydata/${id}`,
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
    return <div>Loading...</div>;
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
                  </div>
                </div>

                <div className="invoice p-3 mb-3">
                  {/* <div className="row">
                    <div className="col-12">
                      <h4>
                        <small className="float-right">
                          Date:{" "}
                          {new Date(
                            inventoryItem.request_date
                          ).toLocaleDateString("en-IN")}
                        </small>
                      </h4>
                    </div>
                  </div> */}
                  {/* <div className="row">
                    <div className="col-12">
                      <h4>
                        <small className="float-right">
                          Time:{" "}
                          {new Date(
                            inventoryItem.request_date
                          ).toLocaleTimeString("en-IN")}
                        </small>
                      </h4>
                    </div>
                  </div> */}
                  {/* <div className="row">
                    <div className="col-12 m-3">
                      <h4>
                        <small>
                          <strong>Status :  </strong>{inventoryItem.status}
                        </small>
                      </h4>
                    </div>
                  </div> */}

                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-12 table-responsive">
                      <table className="table">
                        <thead>
                          <tr align="center">
                            <th> <h4 className="float-left">
                              <small>
                                <strong>Status :  </strong>{inventoryItem.status}
                              </small>
                            </h4></th>
                          
                            <th> 
                              <div className="d-flex justify-content-end">
                                <h4>
                                  <small>
                                    Date:{" "}
                                    {new Date(
                                      inventoryItem.request_date
                                    ).toLocaleDateString("en-IN")}
                                  </small>
                                </h4>
                                &emsp;
                                <h4>
                                  <small >
                                    Time:{" "}
                                    {new Date(
                                      inventoryItem.request_date
                                    ).toLocaleTimeString("en-IN")}
                                  </small>
                                </h4>
                              </div> 
                              </th>
                          </tr>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItem.items.map((item) => (
                            <tr key={item._id}>
                              <td>{item.item_name}</td>
                              <td>
                                {item.item_quantity} {item.unit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {inventoryItem.status === "Requested" ? (
                        <button
                        className="btn btn-dark float-right"
                        type="button"
                        onClick={editDetails}
                      >
                        <img src="../../dist/img/edit.svg" alt="Edit" />
                        Edit
                      </button>
                      ):""}

                      
                    </div>
                  </div>
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
