import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import AddQSR from "./AddQSR";
import DeleteQsrModal from "./DeleteQsrModal";
import EditQsrModal from "./EditQsrModal";

const AdminManageQSR = () => {
  const navigate = useNavigate();
  const [mainSection, setMainSection] = useState("Dashboard");
  const [userSubscription, setUserSubscription] = useState([]);
  const [QsrData, setQsrData] = useState([]);

  const [showEditQsrModal, setShowEditQsrModal] = useState(false);
  const [showDeleteQsrModal, setShowDeleteQsrModal] = useState(false);

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

      const enrichedSubscriptions = userSubscriptionResponse.data.map(
        (subscription) => {
          const plan = plans.find((plan) => plan._id === subscription.plan_id);
          return {
            ...subscription,
            plan_name: plan ? plan.plan_name : "Unknown Plan",
          };
        }
      );

      if (!enrichedSubscriptions.filter((sub) => sub.plan_name === "QSR").length) {
        alert("You need to have a QSR subscription to use this page.");
        navigate("/subscription");
      }

      setUserSubscription(enrichedSubscriptions);
    } catch (error) {
      console.error("Error in fetching data:", error);
    }
  };

  const fetchQsrData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/qsr/getqsrdata`,
        {
          withCredentials: true,
        }
      );
      setQsrData(response.data);
    } catch (error) {
      console.log("Error fetching qsr data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchQsrData();
  }, []);

  const [editQsrModalData, setEditQsrModalData] = useState({});
  const editQsrModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/qsr/getQsrdata/${id}`)
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

          {mainSection === "AddQsr" ? (
            <AddQSR
              setMainSection={setMainSection}
              fetchQsrData={fetchQsrData}
            />
          ) : (
            <div>
              {userSubscription.length > 0 && (
                <div className="card">
                  <div>
                    <div className="card-header">
                      <h3 className="card-title">Manage Qsr</h3>
                    </div>
                    {userSubscription.map((subscription) => (
                      <div key={subscription._id} className="card-body p-0 m-2">
                        {subscription.plan_name === "QSR" &&
                          subscription.status === "active" && (
                            <div>
                              <div
                                className="m-3"
                                style={{ fontWeight: "bold" }}
                              >
                                QSR
                              </div>
                              {QsrData.length === 0 ? (
                                <div className="d-flex align-items-center justify-content-center m-3">
                                  You don't have any Qsrs yet.
                                  <div
                                    className="m-1"
                                    onClick={() => setMainSection("AddQsr")}
                                    style={{ color: "blue", cursor: "pointer" }}
                                  >
                                    Create Qsr
                                  </div>
                                </div>
                              ) : (
                                QsrData.map((Qsr) => (
                                  <div
                                    className="card m-3"
                                    style={{ width: "20rem" }}
                                    key={Qsr._id}
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
                                          {Qsr.username}
                                        </div>
                                      </div>
                                      <div>
                                        <button
                                          type="button"
                                          className="btn btn-block btn-dark"
                                          onClick={() => editQsrModal(Qsr._id)}
                                        >
                                          Edit
                                        </button>

                                        <button
                                          type="button"
                                          className="btn btn-block btn-dark"
                                          onClick={() =>
                                            deleteQsrModal(Qsr._id)
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
            </div>
          )}

          <Footer />
        </div>
      </div>
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
};

export default AdminManageQSR;
