import React, { useState, useEffect } from "react";
import axios from "axios";
import TableAddedModal from "./TableAddedModal";
import TableDeleteModal from "./TableDeleteModal";

function ViewTables({ setSection }) {
  const [showTableAddedModal, setShowTableAddedModal] = useState(false);
  const [showTableDeleteModal, setShowTableDeleteModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/gettabledata",
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
    <>
      <section className="content" id="viewTables">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Table </h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtn"
                      onClick={() => setSection("AddTable")}
                    >
                      <img src="../../dist/img/icon/add.svg" /> Add Table
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="container-fluid table-responsive">
                <table
                  id="example1"
                  className="table table-bordered table-striped"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>Table No.</th>
                      <th>Dine Type</th>
                      <th>Max Person</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((data) => (
                      <tr key={data._id}>
                        <td>{data.table_no}</td>
                        <td>{data.area}</td>
                        <td>{data.max_person}</td>
                        <td>
                          <button
                            type="button"
                            className="btn bg-transparent delete_btn"
                            onClick={() => setShowTableDeleteModal(true)}
                            title="Delete"
                          >
                            <img src="../../dist/img/icon/delete-b.svg" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TableAddedModal
        show={showTableAddedModal}
        handleClose={() => setShowTableAddedModal(false)}
      />

      <TableDeleteModal
        show={showTableDeleteModal}
        handleClose={() => setShowTableDeleteModal(false)}
      />
    </>
  );
}

export default ViewTables;
