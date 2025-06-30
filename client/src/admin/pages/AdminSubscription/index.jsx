import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Loading from "../../components/Loading";

import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import PlanCard from "../../components/ShowPlanCard";
import RaiseInquiryModal from "./RaiseInquiryModal";

import Manager from "./manager/Manager";
import Qsr from "./qsr/Qsr";
import Captain from "./captain/Captain";
import Payroll from "./payroll/Payroll";

function AdminSubscription() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [userSubscription, setUserSubscription] = useState([]);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquirySubName, setInquirySubName] = useState(null);

  const [existingQueries, setExistingQueries] = useState({});

  const [managerName, setManagerName] = useState("Hello");
  const [qsrName, setQsrName] = useState(null);
  const [captainName, setCaptainName] = useState(null);
  const [payrollName, setPayrollName] = useState(null);

  const fetchData = async () => {
    try {
      const [plansResponse, userSubscriptionResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/subscription/getsubscriptionplans`,
          { withCredentials: true }
        ),
        axios.get(
          `${process.env.REACT_APP_ADMIN_API}/subscription/getusersubscriptioninfo`,
          { withCredentials: true }
        ),
      ]);

      const plans = plansResponse.data;
      setSubscriptionPlans(plans);

      const enrichedSubscriptions = userSubscriptionResponse.data
        .map((subscription) => {
          const plan = plans.find((plan) => plan._id === subscription.plan_id);
          return {
            ...subscription,
            is_addon: plan?.is_addon || false,
            plan_name: plan?.plan_name || "Unknown Plan",
          };
        })
        .sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

      setUserSubscription(enrichedSubscriptions);

      // Fetch existing customer queries for blocked plans
      const blocked = enrichedSubscriptions.filter(
        (s) => s.status === "blocked"
      );
      const queryResults = await Promise.all(
        blocked.map((sub) =>
          axios
            .get(
              `${process.env.REACT_APP_ADMIN_API}/customerquery/get-customer-query/${sub.plan_name}`,
              { withCredentials: true }
            )
            .then((res) => ({ plan: sub.plan_name, data: res.data }))
        )
      );

      const queries = {};
      queryResults.forEach(({ plan, data }) => {
        if (data.exists) {
          queries[plan] = data.query;
        }
      });
      setExistingQueries(queries);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  const openInquiryModal = (subscriptionName) => {
    setInquirySubName(subscriptionName);
    setShowInquiryModal(true);
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
                              {userSubscription.map((subscription) => (
                                <tr key={subscription._id}>
                                  <td>
                                    {subscription.plan_name}{" "}
                                    <span className="font-weight-bold">
                                      {subscription.plan_name === "Manager" &&
                                        managerName &&
                                        `(${managerName})`}
                                      {subscription.plan_name === "QSR" &&
                                        qsrName &&
                                        `(${qsrName})`}
                                      {subscription.plan_name ===
                                        "Captain Panel" &&
                                        captainName &&
                                        `(${captainName})`}
                                      {subscription.plan_name ===
                                        "Payroll By The Box" &&
                                        payrollName &&
                                        `(${payrollName})`}
                                    </span>
                                  </td>
                                  <td>
                                    {formateDate(subscription.start_date)}
                                  </td>
                                  <td>{formateDate(subscription.end_date)}</td>
                                  <td>
                                    {subscription.status === "active" && (
                                      <span className="badge bg-success p-2">
                                        Active
                                      </span>
                                    )}
                                    {subscription.status === "inactive" && (
                                      <span className="badge bg-warning p-2">
                                        Inactive
                                      </span>
                                    )}
                                    {subscription.status === "blocked" && (
                                      <span className="badge bg-danger p-2">
                                        Blocked
                                      </span>
                                    )}
                                  </td>
                                  <td>
                                    {subscription.status === "active" && (
                                      <>
                                        {subscription.plan_name ===
                                          "Manager" && (
                                          <Manager
                                            setManagerName={setManagerName}
                                          />
                                        )}
                                        {subscription.plan_name === "QSR" && (
                                          <Qsr setQsrName={setQsrName} />
                                        )}
                                        {subscription.plan_name ===
                                          "Captain Panel" && (
                                          <Captain
                                            setCaptainName={setCaptainName}
                                          />
                                        )}
                                        {subscription.plan_name ===
                                          "Payroll By The Box" && (
                                          <Payroll
                                            setPayrollName={setPayrollName}
                                          />
                                        )}
                                        {subscription.plan_name ===
                                          "Scan For Menu" && (
                                          <button
                                            className="btn btn-transparent bg-transparent"
                                            title="View"
                                            onClick={() =>
                                              navigate("/manage-menu")
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                        {subscription.plan_name ===
                                          "Restaurant Website" && (
                                          <button
                                            className="btn btn-transparent bg-transparent"
                                            title="View"
                                            onClick={() =>
                                              navigate(
                                                "/manage-restaurant-website"
                                              )
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                        {subscription.plan_name ===
                                          "Reservation Manager" && (
                                          <button
                                            className="btn btn-transparent bg-transparent"
                                            title="View"
                                            onClick={() =>
                                              navigate(
                                                "/manage-reservation-manager"
                                              )
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                        {subscription.plan_name ===
                                          "Online Order Reconciliation" && (
                                          <button
                                            className="btn btn-transparent bg-transparent"
                                            title="View"
                                            onClick={() =>
                                              navigate(
                                                "/manage-online-order-reconciliation"
                                              )
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                        {subscription.plan_name ===
                                          "Feedback" && (
                                          <button
                                            className="btn btn-transparent bg-transparent"
                                            title="View"
                                            onClick={() =>
                                              navigate("/manage-feedback")
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                        {subscription.plan_name ===
                                          "Staff Management" && (
                                          <button
                                            className="btn btn-transparent bg-transparent"
                                            title="View"
                                            onClick={() =>
                                              navigate("/manage-staff")
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                        {subscription.plan_name ===
                                          "Dynamic Reports" && (
                                          <button
                                            className="btn btn-transparent bg-dark"
                                            title="View"
                                            onClick={() =>
                                              navigate("/dynamic-reports")
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/eye-b.svg"
                                              alt="View"
                                            />
                                          </button>
                                        )}
                                      </>
                                    )}
                                    {subscription.status === "inactive" && (
                                      <button
                                        onClick={() =>
                                          renewPlan(subscription._id)
                                        }
                                      >
                                        Renew{" "}
                                        <button
                                          className="btn btn-transparent bg-transparent"
                                          title="Renew"
                                        >
                                          <img
                                            src="../../dist/img/icon/renew.png"
                                            width="20"
                                            alt="Renew Details"
                                          />
                                        </button>
                                      </button>
                                    )}
                                    {subscription.status === "blocked" &&
                                      (existingQueries[
                                        subscription.plan_name
                                      ] ? (
                                        <span> <button
                                            className="btn btn-transparent bg-transparent"
                                            title="Already query was sent"
                                            onClick={() =>
                                              navigate("/dynamic-reports")
                                            }
                                          >
                                            <img
                                              src="../../dist/img/icon/sandclock.png" width="20px"
                                              alt="Already query was sent"
                                            />
                                          </button></span>
                                      ) : (
                                        <button
                                          className="btn btn-dark bg-transparent"
                                          title="Raise Inquiry"
                                          onClick={() =>
                                            openInquiryModal(
                                              subscription.plan_name
                                            )
                                          }
                                        >
                                         
                                          <img
                                            src="../../dist/img/icon/enquriy.png"
                                            width="20"
                                            alt="Raise Inquiry"
                                            style={{
                                              marginLeft: "5px",
                                            }}
                                          />
                                        </button>
                                      ))}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    {subscriptionPlans.length !== userSubscription.length ||
                      (userSubscription.some(
                        (subscription) => subscription.status === "inactive"
                      ) &&
                        (() => {
                          const filteredBasePlans = subscriptionPlans.filter(
                            (plan) => {
                              const isPlanActive = userSubscription.some(
                                (subscription) =>
                                  subscription.plan_id === plan._id &&
                                  (subscription.status === "active" ||
                                    subscription.status === "blocked")
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
                        })())}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <Footer />
        </div>
      </div>
      <RaiseInquiryModal
        show={showInquiryModal}
        handleClose={() => setShowInquiryModal(false)}
        subscriptionName={inquirySubName}
        fetchData={fetchData}
      />
    </>
  );
}

export default AdminSubscription;
