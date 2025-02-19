import React, { useState, useEffect } from "react";
import axios from "axios";

import EditManagerModal from "./EditManagerModal";
import DeleteManagerModal from "./DeleteManagerModal";

import EditQsrModal from "./EditQsrModal";
import DeleteQsrModal from "./DeleteQsrModal";
import Loading from "../Loading";

function DashboardSection({ setMainSection, setTableId, setOrderId }) {
  const [isLoading, setIsLoading] = useState(false);

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);

  const [tableData, setTableData] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [QsrData, setQsrData] = useState([]);

  const [showEditManagerModal, setShowEditManagerModal] = useState(false);
  const [showDeleteManagerModal, setShowDeleteManagerModal] = useState(false);

  const [showEditQsrModal, setShowEditQsrModal] = useState(false);
  const [showDeleteQsrModal, setShowDeleteQsrModal] = useState(false);

  const fetchSubscriptionData = async () => {
    try {
      const [plansResponse, userSubscriptionResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_ADMIN_API}/getsubscriptionplans`, {
          withCredentials: true,
        }),
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/getusersubscriptioninfo`,
          {
            withCredentials: true,
          }
        ),
      ]);

      const plans = plansResponse.data;
      setSubscriptionPlans(plans);

      const enrichedSubscriptions = userSubscriptionResponse.data.map(
        (subscription) => {
          const plan = plans.find((plan) => plan._id === subscription.plan_id);
          return {
            ...subscription,
            plan_name: plan ? plan.plan_name : "Unknown Plan",
          };
        }
      );

      setUserSubscription(enrichedSubscriptions);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };
  const fetchManagerData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchQsrData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getqsrdata`,
        {
          withCredentials: true,
        }
      );
      setQsrData(response.data);
    } catch (error) {
      console.log("Error fetching qsr data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTableData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionData();
    fetchTableData();
    fetchManagerData();
    fetchQsrData();
  }, []);

  

  const [editManagerModalData, setEditManagerModalData] = useState({});
  const editManagerModal = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getmanagerdata/${id}`)
      .then((res) => {
        setEditManagerModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setShowEditManagerModal(true);
  };

  const [deleteManagerModalData, setDeleteManagerModalData] = useState({
    id: "",
  });
  const deleteManagerModal = (id) => {
    console.log(id);
    setShowDeleteManagerModal(true);
    setDeleteManagerModalData({ ...deleteManagerModalData, id: id });
    console.log(deleteManagerModalData);
  };

  const [editQsrModalData, setEditQsrModalData] = useState({});
  const editQsrModal = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getqsrdata/${id}`)
      .then((res) => {
        setEditQsrModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setShowEditQsrModal(true);
  };

  const [deleteQsrModalData, setDeleteQsrModalData] = useState({
    id: "",
  });
  const deleteQsrModal = (id) => {
    console.log(id);
    setShowDeleteQsrModal(true);
    setDeleteQsrModalData({ ...deleteQsrModalData, id: id });
    console.log(deleteQsrModalData);
  };

  const hasValidSubscription = (plan_name) => {
    return userSubscription.some(subscription => 
      subscription.plan_name === plan_name 
    );
  };
  

  return (
    <>
      {isLoading && <Loading />}

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
                          onClick={() => {
                            if (hasValidSubscription("Manager")) {
                              setMainSection("AddManager");
                            } else {
                              window.location.href = "/subscription";
                            }
                          }}
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
                                onClick={() => editManagerModal(manager._id)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-block btn-dark"
                                onClick={() => deleteManagerModal(manager._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="card-body p-0 m-2">
                    <div className="m-3" style={{ fontWeight: "bold" }}>
                      QSR Management
                    </div>
                    {QsrData.length === 0 ? (
                      <div className="d-flex align-items-center justify-content-center m-3">
                        You don't have any QSRs yet.
                        <div
                          className="m-1"
                          onClick={() => {
                            if (hasValidSubscription("QSR")) {
                              setMainSection("AddQSR");
                            } else {
                              window.location.href = "/subscription";
                            }
                          }}
                          style={{ color: "blue", cursor: "pointer" }}
                        >
                          Create QSR
                        </div>
                      </div>
                    ) : (
                      QsrData.map((qsr) => (
                        <div
                          className="card m-3"
                          style={{ width: "20rem" }}
                          key={qsr._id}
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
                                {qsr.username}
                              </div>
                            </div>
                            <div>
                              <button
                                type="button"
                                className="btn btn-block btn-dark"
                                onClick={() => editQsrModal(qsr._id)}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="btn btn-block btn-dark"
                                onClick={() => deleteQsrModal(qsr._id)}
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
              </div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Tables</h3>
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
                                  : table.current_status === "KOT"
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
        show={showEditManagerModal}
        handleClose={() => setShowEditManagerModal(false)}
        data={editManagerModalData}
        fetchManagerData={fetchManagerData}
      />

      <DeleteManagerModal
        show={showDeleteManagerModal}
        handleClose={() => setShowDeleteManagerModal(false)}
        data={deleteManagerModalData}
        fetchManagerData={fetchManagerData}
      />

      <EditQsrModal
        show={showEditQsrModal}
        handleClose={() => setShowEditQsrModal(false)}
        data={editQsrModalData}
        fetchQsrData={fetchQsrData}
      />

      <DeleteQsrModal
        show={showDeleteQsrModal}
        handleClose={() => setShowDeleteQsrModal(false)}
        data={deleteQsrModalData}
        fetchQsrData={fetchQsrData}
      />
    </>
  );
}

export default DashboardSection;
