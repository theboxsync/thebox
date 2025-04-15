import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../style.css";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import AddQSR from "./AddQSR";
import DeleteQsrModal from "./DeleteQsrModal";
import EditQsrModal from "./EditQsrModal";

import { AuthContext } from "../../context/AuthContext";
import Loading from "../../components/Loading";

const AdminManageQSR = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainSection, setMainSection] = useState("Dashboard");
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [QsrData, setQsrData] = useState([]);
  const [showEditQsrModal, setShowEditQsrModal] = useState(false);
  const [showDeleteQsrModal, setShowDeleteQsrModal] = useState(false);

  const fetchQsrData = async () => {
    const hasQSRPlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "QSR" && activePlans.includes("QSR")
    );

    if (!hasQSRPlan) {
      alert("You need to buy or renew to QSR plan to access this page.");
      navigate("/subscription");
      return;
    }
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      fetchQsrData();
    }
  }, [activePlans, userSubscriptions]);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="wrapper mx-3">
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
              <div className="card">
                <div>
                  <div className="card-header">
                    <h3 className="card-title">Manage Qsr</h3>
                  </div>

                  <div className="card-body p-0 m-2">
                    {activePlans.includes("QSR") && (
                      <div>
                        <div className="m-3" style={{ fontWeight: "bold" }}>
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
                                    onClick={() => deleteQsrModal(Qsr._id)}
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
              </div>
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
