import React, { useState, useEffect } from "react";
import axios from "axios";
import TableAddedModal from "./TableAddedModal";
import TableDeleteModal from "./TableDeleteModal";
import EditTableModal from "./EditTableModal";

function ViewTables({ setSection }) {
  const [showTableAddedModal, setShowTableAddedModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({
    id: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState(null);
  const [tableData, setTableData] = useState([]);
  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/table/gettabledata`,
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

  const editModal = (table) => {
    setEditModalData(table);
    setShowEditModal(true);
  };


  return (
    <>
      <section className="content m-3">
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
                        <li className="m-3" key={table._id}>
                          <div className="container position-relative">
                            <div
                              className={`dashboard-table d-flex flex-column justify-content-center align-items-center`}
                            >
                              <div align="center">{table.table_no}
                                <hr style={{ margin: "0px", padding: "0px", border: "1px solid #212529" }} />
                                <span style={{ fontSize: "14px" }}> Max Person : </span>
                                <span style={{ fontSize: "16px" }}>{table.max_person}</span>
                              </div>
                            </div>

                            <div className="d-flex justify-content-between pt-1" style={{ top: 0, right: 0 }}>
                             
                              <button
                                className="btn btn-transparent bg-transparent p-0"
                                onClick={() => editModal(table)}
                              >
                                <img
                                  src="../../dist/img/edit-b.svg"
                                  alt="edit"
                                />
                              </button>
                              <button
                                className="btn btn-transparent bg-transparent p-0"
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

      <EditTableModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        data={editModalData}
        fetchTableData={fetchTableData}
      />

    </>
  );
}

export default ViewTables;
