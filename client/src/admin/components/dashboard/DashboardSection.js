import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../Loading";
import PlanCard from "../ShowPlanCard";

function DashboardSection({ setMainSection, setTableId, setOrderId }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);

  const [tableData, setTableData] = useState([]);

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
          return {
            ...subscription,
            is_addon: plan.is_addon,
            plan_name: plan ? plan.plan_name : "Unknown Plan",
          };
        }
      );

      setUserSubscription(enrichedSubscriptions);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  const fetchTableData = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTableData();
  }, []);

  const formateDate = (date) => {
    const dateObj = new Date(date);
    const dateOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Kolkata",
    };
    const formattedDate = dateObj.toLocaleDateString("en-IN", dateOptions);
    return formattedDate;
  };

  const buyPlan = async (planId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/subscription/buysubscriptionplan`,
        { planId },
        {
          withCredentials: true,
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const renewPlan = async (subscriptionId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/subscription/renewsubscription`,
        { subscriptionId },
        { withCredentials: true }
      );

      window.location.reload();
    } catch (error) {
      console.error("Error renewing subscription:", error);
      alert("Failed to renew subscription. Please try again.");
    }
  };

  const managePlan = async (planName) => {
    if (planName === "Manager") {
      navigate("/manage-manager");
    } else if (planName === "QSR") {
      navigate("/manage-qsr");
    } else if (planName === "Captain Panel") {
      navigate("/manage-captain");
    } else if (planName === "Staff Management") {
      navigate("/staff");
    } else if (planName === "Feedback") {
      navigate("/feedbacks");
    } else if (planName === "Scan For Menu") {
      navigate("/manage-menu");
    } else if (planName === "Restaurant Website") {
      navigate("/manage-restaurant-website");
    } else if (planName === "Online Order Reconciliation") {
      navigate("/manage-online-order-reconciliation");
    } else if (planName === "Reservation Manager") {
      navigate("/manage-reservation-manager");
    } else if (planName === "Payroll By The Box") {
      navigate("/manage-payroll");
    }
  };

  return (
    <>
      {isLoading && <Loading />}

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {userSubscription.length > 0 && (
                <div className="card mx-3">
                  <div>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Plan Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userSubscription.map((subscription) => (
                          <tr key={subscription._id}>
                            <td>{subscription.plan_name}</td>
                            <td>{formateDate(subscription.start_date)}</td>
                            <td>{formateDate(subscription.end_date)}</td>
                            <td>{subscription.status}</td>
                            <td>
                              {subscription.status === "active" && (
                                <button

                                  onClick={() =>
                                    managePlan(subscription.plan_name)
                                  }
                                >
                                  Manage <button class="btn btn-transparent bg-transparent" title="Edit"><img src="../../dist/img/icon/edit-b.svg" alt="edit Details" /></button>
                                  <button class="btn btn-transparent bg-transparent" title="delete"><img src="../../dist/img/icon/delete-b.svg" alt="delete Details" /></button>
                                </button>

                              )}
                              {subscription.status === "expired" && (
                                <button

                                  onClick={() => renewPlan(subscription._id)}
                                >
                                  Renew <button class="btn btn-transparent bg-transparent" title="Renew"><img src="../../dist/img/icon/renew.png" width="20" alt="Renew Details" /></button>
                                </button>
                              )}
                              {subscription.status === "blocked" && (
                                <button

                                  onClick={() => ("")}
                                >
                                  Raise inquiry <button class="btn btn-transparent bg-transparent" title="Renew"><img src="../../dist/img/icon/enquriy.png" width="20" alt="Renew Details" /></button>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {subscriptionPlans.length !== userSubscription.length &&
                (() => {
                  const filteredBasePlans = subscriptionPlans.filter((plan) => {
                    const isPlanActive = userSubscription.some(
                      (subscription) => subscription.plan_id === plan._id
                    );
                    return !isPlanActive && !plan.is_addon;
                  });

                  return filteredBasePlans.length > 0 ? (
                    <>
                      <div className="card">
                        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                          <h1 className="display-4">Our Plans</h1>
                          <p className="lead">
                            Choose various plans to fit your needs
                          </p>
                        </div>
                        <div className="d-flex mb-3 text-center">
                          {filteredBasePlans.map((plan, index) => (
                            <PlanCard
                              key={index}
                              plan={plan}
                              buyPlan={buyPlan}
                            />
                          ))}
                        </div>
                      </div>
                      <hr />
                    </>
                  ) : null;
                })()}
            </div>
          </div>
        </div>
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
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
                              className={`dashboard-table d-flex justify-content-center align-items-center ${table.current_status === "Save"
                                ? "table-save"
                                : table.current_status === "KOT"
                                  ? "table-kot"
                                  : ""
                                }`}
                            >
                              <div align="center">
                                <span style={{ fontSize: "14px" }}>No. </span>
                                <span style={{ fontSize: "26px" }}>{table.table_no}</span> 
                                <hr style={{ margin: "0px", padding: "0px", border: "1px solid #212529" }} />
                                <span style={{ fontSize: "14px" }}> Max Person : </span> 
                                <span style={{ fontSize: "16px" }}>{table.max_person}</span>
                              </div>
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
    </>
  );
}

export default DashboardSection;
