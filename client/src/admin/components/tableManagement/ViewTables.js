import React, { useState, useEffect } from "react";
import axios from "axios";
import TableAddedModal from "./TableAddedModal";
import TableDeleteModal from "./TableDeleteModal";

function ViewTables({ setSection }) {
  const [showTableAddedModal, setShowTableAddedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({
    id: "",
  });
  const [tableData, setTableData] = useState([]);
  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        "http://admin.localhost:3001/api/gettabledata",
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

  const deleteModal = (id) => {
    console.log(id);
    setShowDeleteModal(true);
    setDeleteModalData({ ...deleteModalData, id: id });
    console.log(deleteModalData);
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
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
                {tableData.map((table) => (
                  <div className="card-body p-0 m-2" key={table._id}>
                    <h3 className="m-4">Area Type : {table.area}</h3>
                    <ul className="row my-5" style={{ listStyle: "none" }}>
                      {table.tables.map((table) => (
                        <li className="col-md-2 my-3" key={table._id}>
                          <div className="container d-flex align-items-center">
                            <div
                              className={`dashboard-table d-flex flex-column justify-content-center align-items-center`}
                            >
                              <div align="center">{table.table_no}</div>
                            </div>
                            <div>
                              <h5 className="mx-3">
                                Max Person : {table.max_person}
                              </h5>
                              <button
                                className="btn btn-transparent bg-transparent  mx-3"
                                onClick={() => deleteModal(table._id)}
                              >
                                <img
                                  src="../../dist/img/delete-b.svg"
                                  alt="delete"
                                />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <hr />
                  </div>
                ))}
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
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        data={deleteModalData}
        fetchTableData={fetchTableData}
      />
    </>
  );
}

export default ViewTables;
