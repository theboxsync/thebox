import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style.css";
import Navbar from "../../components/NavBar.js";

import MenuBar from "../../components/MenuBar.js";
import Footer from "../../components/Footer.js";

import AddManager from "./AddManager.js";
import DeleteManagerModal from "./DeleteManagerModal.js";
import EditManagerModal from "./EditManagerModal.js";

import Loading from "../../components/Loading";

import { AuthContext } from "../../context/AuthContext.jsx";

const AdminManageManager = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [mainSection, setMainSection] = useState("Dashboard");
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [ManagerData, setManagerData] = useState([]);
  const [showEditManagerModal, setShowEditManagerModal] = useState(false);
  const [showDeleteManagerModal, setShowDeleteManagerModal] = useState(false);

  const fetchManagerData = async () => {
    const hasManagerPlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "Manager" && activePlans.includes("Manager")
    );

    if (!hasManagerPlan) {
      alert("You need to renew to Manager plan to access this page.");
      navigate("/subscription");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/manager/getmanagerdata`,
        { withCredentials: true }
      );
      setManagerData(response.data);
    } catch (error) {
      console.log("Error fetching manager data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if ( userSubscriptions.length > 0) {
      fetchManagerData();
    }
  }, [activePlans, userSubscriptions]);

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

          {mainSection === "AddManager" ? (
            <AddManager
              setMainSection={setMainSection}
              fetchManagerData={fetchManagerData}
            />
          ) : (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Manager</h3>
                </div>

                <div className="card-body p-0 m-2">
                  {activePlans.includes("Manager") && (
                    <div>
                      <div className="m-3" style={{ fontWeight: "bold" }}>
                        Manager
                      </div>
                      {ManagerData.length === 0
                        ? (console.log("Manager Data: ", ManagerData),
                          (
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
                          ))
                        : ManagerData.map((manager) => (
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
                          ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
    </>
  );
};

export default AdminManageManager;
