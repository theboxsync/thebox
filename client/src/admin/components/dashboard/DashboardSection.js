import React, { useState, useEffect } from "react";
import axios from "axios";

import EditManagerModal from "./EditManagerModal";
import DeleteManagerModal from "./DeleteManagerModal";

function DashboardSection({ setMainSection, setTableId, setOrderId }) {
  const [tableData, setTableData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchManagerData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getmanagerdata`,
        {
          withCredentials: true,
        }
      );
      setManagerData(response.data);
    } catch (error) {
      console.log("Error fetching manager data:", error);
    }
  };

  const fetchTableData = async () => {
    try {
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
    fetchManagerData();
  }, []);

  const [editModalData, setEditModalData] = useState({});
  const editModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getmanagerdata/${id}`)
      .then((res) => {
        setEditModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowEditModal(true);
  };

  const [deleteModalData, setDeleteModalData] = useState({
    id: "",
  });
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
                  <h3 className="card-title">Manage Manager</h3>
                </div>
                <div>
                  <div className="card-body p-0 m-2">
                    <div className="m-3" style={{ fontWeight: "bold" }}>
                      Manager
                    </div>
                    {ManagerData.length === 0 ? (
                      <div className="d-flex align-items-center justify-content-center m-3">
                        You don't have any managers yet.
                        <div
                          className="m-1"
                          onClick={() => setMainSection("AddManager")}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          Create manager
                        </div>
                      </div>
                    ) : (
                      ManagerData.map((manager) => (
                        <div
                          className="card m-3"
                          style={{ width: "20rem" }}
                          key={manager._id}
                        >
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div
                                className="card-title m-3"
                                style={{ fontWeight: "bold", fontSize: 25 }}
                              >
                                Username:
                              </div>
                              <div
                                className="card-subtitle m-1"
                                style={{ fontSize: 20 }}
                              >
                                {manager.username}
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-block btn-dark"
                                onClick={() => editModal(manager._id)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-block btn-dark"
                                onClick={() => deleteModal(manager._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
                <hr />

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
              </div>
            </div>
          </div>
        </div>
      </section>

      <EditManagerModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        data={editModalData}
        fetchManagerData={fetchManagerData}
      />

      <DeleteManagerModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        data={deleteModalData}
        fetchManagerData={fetchManagerData}
      />
    </>
  );
}

export default DashboardSection;
