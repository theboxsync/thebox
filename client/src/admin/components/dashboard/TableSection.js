import React, { useState, useEffect } from "react";
import axios from "axios";

import { MdLocalPrintshop } from "react-icons/md";

function TableSection({ setMainSection, setTableId, setOrderId }) {
  const [tableData, setTableData] = useState([]);

  const fetchTableData = async () => {
    try {
      console.log("URL : " + process.env.REACT_APP_ADMIN_API);
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/gettabledata`,
        {
          withCredentials: true,
        }
      );
      setTableData(response.data);
    } catch (error) {
      console.log("Error fetching table data:", error);
    } 
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Table Management</h3>
                <button
                  type="button"
                  className="btn float-right"
                  onClick={() => {
                    setMainSection("AddManager");
                  }}
                >
                  Add Manager
                </button>
              </div>
              {tableData.map((table) => (
                <div className="card-body p-0 m-2" key={table._id}>
                  <div className="m-3" style={{ fontWeight: "bold" }}>
                    {table.area}
                  </div>
                  <ul className="row" style={{ listStyle: "none" }}>
                    {table.tables.map((table) => (
                      <li key={table._id}>
                        <div className="container">
                          <div
                            className={`dashboard-table d-flex justify-content-center align-items-center ${
                              table.current_status === "Save"
                                ? "table-save"
                                : table.current_status === "KOT" ||
                                  table.current_status === "KOT and Print"
                                ? "table-kot"
                                : ""
                            }`}
                          >
                            <div align="center">{table.table_no}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <hr />
                </div>
              ))}
              <div className="row m-3">
                <div className="col-md-6">
                  <div className="card" style={{ maxWidth: 640 }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src="../../Logo/GJ0001.webp"
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card" style={{ maxWidth: 640 }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src="../../Logo/GJ0001.webp"
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card" style={{ maxWidth: 640 }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          src="../../Logo/GJ0001.webp"
                          className="img-fluid rounded-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">Card title</h5>
                          <p className="card-text">
                            This is a wider card with supporting text below as a
                            natural lead-in to additional content. This content
                            is a little bit longer.
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TableSection;
