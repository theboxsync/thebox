import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style.css";
import Navbar from "../../components/NavBar.js";

import MenuBar from "../../components/MenuBar.js";
import Footer from "../../components/Footer.js";

import AddCaptain from "./AddCaptain.js";
import EditCaptainModal from "./EditCaptainModal.js";
import DeleteCaptainModal from "./DeleteCaptainModal.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import Loading from "../../components/Loading";

const AdminManageCaptain = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainSection, setMainSection] = useState("Dashboard");
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [CaptainData, setCaptainData] = useState([]);
  const [showEditCaptainModal, setShowEditCaptainModal] = useState(false);
  const [showDeleteCaptainModal, setShowDeleteCaptainModal] = useState(false);

  const fetchCaptainData = async () => {
    const hasCaptainPlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "Captain Panel" &&
        activePlans.includes("Captain Panel")
    );

    if (!hasCaptainPlan) {
      alert("You need to buy or renew to Captain Panel plan to access this page.");
      navigate("/subscription");
      return;
    }

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
    if (userSubscriptions.length > 0) {
      fetchCaptainData();
    }
  }, [activePlans, userSubscriptions]);

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
          {mainSection === "AddCaptain" ? (
            <AddCaptain
              setMainSection={setMainSection}
              fetchCaptainData={fetchCaptainData}
            />
          ) : (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Manager</h3>
                </div>
                <div className="card-body p-0 m-2">
                  {activePlans.includes("Captain Panel") && (
                    <div>
                      <div className="m-3" style={{ fontWeight: "bold" }}>
                        Captain Management
                      </div>
                      {CaptainData.length === 0 ? (
                        <div className="d-flex align-items-center justify-content-center m-3">
                          You don't have any Captains yet.
                          <div
                            className="m-1"
                            onClick={() => setMainSection("AddCaptain")}
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
                                  onClick={() => editCaptainModal(captain._id)}
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
            </div>
          )}

          <Footer />
        </div>
      </div>

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

export default AdminManageCaptain;
