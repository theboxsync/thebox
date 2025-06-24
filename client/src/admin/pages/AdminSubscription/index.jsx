import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../../components/Loading";

import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import PlanCard from "../../components/ShowPlanCard";

function AdminSubscription() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);

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
      enrichedSubscriptions.sort(
        (a, b) =>
          new Date(b.start_date) - new Date(a.start_date)
      )
      setUserSubscription(enrichedSubscriptions);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
      const response = await axios.post(
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
      const response = await axios.post(
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
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>

        <div>
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
                            {userSubscription.map(
                              (subscription) =>
                                 (
                                  <tr key={subscription._id}>
                                    <td>{subscription.plan_name}</td>
                                    <td>
                                      {formateDate(subscription.start_date)}
                                    </td>
                                    <td>
                                      {formateDate(subscription.end_date)}
                                    </td>
                                    <td>{subscription.status}</td>
                                    <td>
                                      {subscription.status === "active" && (
                                        <button
                                          className="btn btn-primary"
                                          onClick={() =>
                                            managePlan(subscription.plan_name)
                                          }
                                        >
                                          Manage
                                        </button>
                                      )}
                                      {subscription.status === "expired" && (
                                        <button
                                          className="btn btn-primary"
                                          onClick={() =>
                                            renewPlan(subscription._id)
                                          }
                                        >
                                          Renew
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                )
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                    {subscriptionPlans.length !== userSubscription.length &&
                      (() => {
                        const filteredBasePlans = subscriptionPlans.filter(
                          (plan) => {
                            const isPlanActive = userSubscription.some(
                              (subscription) =>
                                subscription.plan_id === plan._id
                            );
                            return !isPlanActive;
                          }
                        );

                        return filteredBasePlans.length > 0 ? (
                          <>
                            <div className="card">
                              <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                                <h1 className="display-4">Our Add-ons</h1>
                                <p className="lead">
                                  Choose various plans to fit your needs
                                </p>
                              </div>
                              <div className="d-flex mb-3 text-center row">
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
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default AdminSubscription;
