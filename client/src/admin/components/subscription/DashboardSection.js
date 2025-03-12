import React, { useState, useEffect } from "react";
import axios from "axios";

import EditManagerModal from "./EditManagerModal";
import DeleteManagerModal from "./DeleteManagerModal";

import EditQsrModal from "./EditQsrModal";
import DeleteQsrModal from "./DeleteQsrModal";

import EditCaptainModal from "./EditCaptainModal";
import DeleteCaptainModal from "./DeleteCaptainModal";

import Loading from "../Loading";

function DashboardSection({ setMainSection }) {
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);
  const [ManagerData, setManagerData] = useState([]);
  const [QsrData, setQsrData] = useState([]);
  const [CaptainData, setCaptainData] = useState([]);
  const [showEditManagerModal, setShowEditManagerModal] = useState(false);
  const [showDeleteManagerModal, setShowDeleteManagerModal] = useState(false);

  const [showEditQsrModal, setShowEditQsrModal] = useState(false);
  const [showDeleteQsrModal, setShowDeleteQsrModal] = useState(false);

  const [showEditCaptainModal, setShowEditCaptainModal] = useState(false);
  const [showDeleteCaptainModal, setShowDeleteCaptainModal] = useState(false);

  const fetchData = async () => {
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

  const fetchQsrData = async () => {
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
    }
  };

  const fetchCaptainData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getcaptaindata`,
        {
          withCredentials: true,
        }
      );
      setCaptainData(response.data);
    } catch (error) {
      console.log("Error fetching captain data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchManagerData();
    fetchQsrData();
    fetchCaptainData();
  }, []);

  const [editManagerModalData, setEditManagerModalData] = useState({});
  const editManagerModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getmanagerdata/${id}`)
      .then((res) => {
        setEditManagerModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getqsrdata/${id}`)
      .then((res) => {
        setEditQsrModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
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

  const [editCaptainModalData, setEditCaptainModalData] = useState({});
  const editCaptainModal = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getcaptaindata/${id}`)
      .then((res) => {
        setEditCaptainModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setShowEditCaptainModal(true);
  };

  const [deleteCaptainModalData, setDeleteCaptainModalData] = useState({
    id: "",
  });
  const deleteCaptainModal = (id) => {
    console.log(id);
    setShowDeleteCaptainModal(true);
    setDeleteCaptainModalData({ ...deleteCaptainModalData, id: id });
    console.log(deleteCaptainModalData);
  };

  const buyPlan = async (planId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/buysubscriptionplan`,
        { planId },
        {
          withCredentials: true,
        }
      );
      fetchData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {userSubscription.length > 0 && (
                <div className="card">
                  <div>
                    <div className="card-header">
                      <h3 className="card-title">Manage Manager</h3>
                    </div>
                    {userSubscription.map((subscription) => (
                      <div key={subscription._id} className="card-body p-0 m-2">
                        {subscription.plan_name === "Manager" &&
                          subscription.status === "active" && (
                            <div>
                              <div
                                className="m-3"
                                style={{ fontWeight: "bold" }}
                              >
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
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: 25,
                                          }}
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
                                          onClick={() =>
                                            editManagerModal(manager._id)
                                          }
                                        >
                                          Edit
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-block btn-dark"
                                          onClick={() =>
                                            deleteManagerModal(manager._id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                        {subscription.plan_name === "QSR" &&
                          subscription.status === "active" && (
                            <div>
                              <div
                                className="m-3"
                                style={{ fontWeight: "bold" }}
                              >
                                QSR Management
                              </div>
                              {QsrData.length === 0 ? (
                                <div className="d-flex align-items-center justify-content-center m-3">
                                  You don't have any QSRs yet.
                                  <div
                                    className="m-1"
                                    onClick={() => setMainSection("AddQSR")}
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
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: 25,
                                          }}
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
                                          onClick={() =>
                                            deleteQsrModal(qsr._id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}

                        {subscription.plan_name === "Captain" &&
                          subscription.status === "active" && (
                            <div>
                              <div
                                className="m-3"
                                style={{ fontWeight: "bold" }}
                              >
                                Captain Management
                              </div>
                              {CaptainData.length === 0 ? (
                                <div className="d-flex align-items-center justify-content-center m-3">
                                  You don't have any Captains yet.
                                  <div
                                    className="m-1"
                                    onClick={() => setMainSection("AddCaptain")}
                                    style={{ color: "blue", cursor: "pointer" }}
                                  >
                                    Create Captain
                                  </div>
                                </div>
                              ) : (
                                CaptainData.map((captain) => (
                                  <div
                                    className="card m-3"
                                    style={{ width: "20rem" }}
                                    key={captain._id}
                                  >
                                    <div className="card-body">
                                      <div className="d-flex align-items-center">
                                        <div
                                          className="card-title m-3"
                                          style={{
                                            fontWeight: "bold",
                                            fontSize: 25,
                                          }}
                                        >
                                          Username:
                                        </div>
                                        <div
                                          className="card-subtitle m-1"
                                          style={{ fontSize: 20 }}
                                        >
                                          {captain.username}
                                        </div>
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-block btn-dark"
                                          onClick={() =>
                                            editCaptainModal(captain._id)
                                          }
                                        >
                                          Edit
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-block btn-dark"
                                          onClick={() =>
                                            deleteCaptainModal(captain._id)
                                          }
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {subscriptionPlans.length !== userSubscription.length && (
                <>
                  <div className="card">
                    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                      <h1 className="display-4">Our Plans</h1>
                      <p className="lead">
                        Choose various plans to fit your needs
                      </p>
                    </div>
                    <div className="d-flex mb-3 text-center">
                      {subscriptionPlans
                        .filter((plan) => {
                          // Check if the plan is already active in user subscriptions
                          const isPlanActive = userSubscription.some(
                            (subscription) =>
                              subscription.plan_id === plan._id &&
                              subscription.status === "active"
                          );
                          return !isPlanActive; // Only show plans that are not active
                        })
                        .map((plan) => (
                          <div
                            className="card m-4 box-shadow"
                            style={{ width: "20rem" }}
                            key={plan._id}
                          >
                            <div className="card-header">
                              <h4 className="my-0 font-weight-normal">
                                {plan.plan_name}
                              </h4>
                            </div>
                            <div className="card-body">
                              <h1 className="card-title pricing-card-title">
                                ₹ {plan.plan_price}{" "}
                                <small className="text-muted">/ year</small>
                              </h1>
                              <div className="mt-5">
                                <button
                                  type="button"
                                  className="btn btn-lg btn-block btn-primary"
                                  onClick={() => {
                                    buyPlan(plan._id);
                                  }}
                                >
                                  Buy Now
                                </button>
                              </div>

                              <div className="d-flex justify-content-center align-items-center mt-3">
                                <ul className="list-unstyled mt-3 mb-4">
                                  {plan.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <hr />
                </>
              )}
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

      <EditCaptainModal
        show={showEditCaptainModal}
        handleClose={() => setShowEditCaptainModal(false)}
        data={editCaptainModalData}
        fetchCaptainData={fetchCaptainData}
      />

      <DeleteCaptainModal
        show={showDeleteCaptainModal}
        handleClose={() => setShowDeleteCaptainModal(false)}
        data={deleteCaptainModalData}
        fetchCaptainData={fetchCaptainData}
      />
    </>
  );
}

export default DashboardSection;
