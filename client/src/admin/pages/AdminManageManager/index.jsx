import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import AddManager from "./AddManager";
import DeleteManagerModal from "./DeleteManagerModal";
import EditManagerModal from "./EditManagerModal";
import PlanCard from "../../components/ShowPlanCard.js";

import AddCaptain from "./AddCaptain";
import EditCaptainModal from "./EditCaptainModal.js";
import DeleteCaptainModal from "./DeleteCaptainModal";

const AdminManageManager = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mainSection, setMainSection] = useState("Dashboard");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);

  const [managerId, setManagerId] = useState(null);
  const [ManagerData, setManagerData] = useState([]);
  const [showEditManagerModal, setShowEditManagerModal] = useState(false);
  const [showDeleteManagerModal, setShowDeleteManagerModal] = useState(false);

  const [CaptainData, setCaptainData] = useState([]);
  const [showEditCaptainModal, setShowEditCaptainModal] = useState(false);
  const [showDeleteCaptainModal, setShowDeleteCaptainModal] = useState(false);

  const fetchData = async () => {
    try {
      const [plansResponse, userSubscriptionResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/subscription/getsubscriptionplans`,
          {
            withCredentials: true,
          }
        ),
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/subscription/getusersubscriptioninfo`,
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
          if (plan.plan_name === "Manager") {
            setManagerId(subscription.plan_id);
          }
          return {
            ...subscription,
            is_addon: plan.is_addon,
            compatible_with: plan.compatible_with,
            plan_name: plan ? plan.plan_name : "Unknown Plan",
          };
        }
      );

      if (
        !enrichedSubscriptions.filter((sub) => sub.plan_name === "Manager")
          .length
      ) {
        alert("You need to have a Manager subscription to use this page.");
        navigate("/subscription");
      }

      setUserSubscription(enrichedSubscriptions);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  const fetchManagerData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/manager/getmanagerdata`,
        {
          withCredentials: true,
        }
      );
      setManagerData(response.data);
    } catch (error) {
      console.log("Error fetching manager data:", error);
    }
  };

  const fetchCaptainData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/captain/getcaptaindata`,
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
    fetchCaptainData();
  }, []);

  const [editManagerModalData, setEditManagerModalData] = useState({});
  const editManagerModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/manager/getmanagerdata/${id}`)
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

  const [editCaptainModalData, setEditCaptainModalData] = useState({});
  const editCaptainModal = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/captain/getcaptaindata/${id}`)
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
        `${process.env.REACT_APP_ADMIN_API}/subscription/buysubscriptionplan`,
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
      <div className="wrapper">
        <Navbar />
        <MenuBar />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2"></div>
            </div>
          </div>

          {mainSection === "AddManager" ? (
            <AddManager
              setMainSection={setMainSection}
              fetchManagerData={fetchManagerData}
            />
          ) : mainSection === "AddCaptain" ? (
            <AddCaptain
              setMainSection={setMainSection}
              fetchCaptainData={fetchCaptainData}
            />
          ) : (
            <div>
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
                        <div
                          key={subscription._id}
                          className="card-body p-0 m-2"
                        >
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
                                      onClick={() =>
                                        setMainSection("AddCaptain")
                                      }
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                      }}
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
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {(() => {
            const filteredPlans = subscriptionPlans.filter((plan) => {
              const isPlanActive = userSubscription.some(
                (subscription) =>
                  subscription.plan_id === plan._id &&
                  subscription.status === "active"
              );
              return !isPlanActive && plan.compatible_with.includes(managerId);
            });

            if (filteredPlans.length === 0) {
              return null;
            }

            return (
              <>
                <div className="card">
                  <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Add-ons</h1>
                    <p className="lead">
                      Choose various addons to fit your needs
                    </p>
                  </div>
                  <div className="d-flex mb-3 text-center">
                    {filteredPlans.map((plan, index) => (
                      <PlanCard key={index} plan={plan} buyPlan={buyPlan} />
                    ))}
                  </div>
                </div>
                <hr />
              </>
            );
          })()}

          <Footer />
        </div>
      </div>
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
};

export default AdminManageManager;
