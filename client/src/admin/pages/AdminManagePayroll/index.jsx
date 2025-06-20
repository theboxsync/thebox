import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../../style.css";
import Navbar from "../../components/NavBar.js";

import MenuBar from "../../components/MenuBar.js";
import Footer from "../../components/Footer.js";

import AddAttendance from "./AddAttendance.js";
import EditAttendanceModal from "./EditAttendanceModal.js";
import DeleteAttendanceModal from "./DeleteAttendanceModal.js";

import { AuthContext } from "../../context/AuthContext.jsx";
import Loading from "../../components/Loading.js";


import { MdManageAccounts } from "react-icons/md";

const AdminManagePayroll = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainSection, setMainSection] = useState("Dashboard");
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [AttendanceData, setAttendanceData] = useState([]);
  const [showEditAttendanceModal, setShowEditAttendanceModal] = useState(false);
  const [showDeleteAttendanceModal, setShowDeleteAttendanceModal] =
    useState(false);

  const fetchAttendanceData = async () => {
    const hasAttendancePlan = userSubscriptions.some(
      (subscription) =>
        subscription.plan_name === "Payroll By The Box" &&
        activePlans.includes("Payroll By The Box")
    );

    if (!hasAttendancePlan) {
      alert(
        "You need to buy or renew to Payroll By The Box plan to access this page."
      );
      navigate("/subscription");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/attendance/getattendancedata`,
        {
          withCredentials: true,
        }
      );
      setAttendanceData(response.data);
    } catch (error) {
      console.log("Error fetching attendance data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      fetchAttendanceData();
    }
  }, [activePlans, userSubscriptions]);

  const [editAttendanceModalData, setEditAttendanceModalData] = useState({});
  const editAttendanceModal = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_ADMIN_API}/attendance/getattendancedata/${id}`
      )
      .then((res) => {
        setEditAttendanceModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
    setShowEditAttendanceModal(true);
  };

  const [deleteAttendanceModalData, setDeleteAttendanceModalData] = useState({
    id: "",
  });
  const deleteAttendanceModal = (id) => {
    console.log(id);
    setShowDeleteAttendanceModal(true);
    setDeleteAttendanceModalData({ ...deleteAttendanceModalData, id: id });
    console.log(deleteAttendanceModalData);
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
          {mainSection === "AddAttendance" ? (
            <AddAttendance
              setMainSection={setMainSection}
              fetchAttendanceData={fetchAttendanceData}
            />
          ) : (
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Attendance Panel</h3>
                  <div className="card-tools mx-2">
                    <Link to={"/staff/attendance"}>
                      <button type="button" className="btn btn-block btn-dark">
                        <MdManageAccounts /> Manage Attendance
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="card-body p-0 m-2">
                  {activePlans.includes("Payroll By The Box") && (
                    <div>
                      <div className="m-3" style={{ fontWeight: "bold" }}>
                        Attendance Panel
                      </div>
                      {AttendanceData.length === 0 ? (
                        <div className="d-flex align-items-center justify-content-center m-3">
                          You don't have any Attendance Panel created yet.
                          <div
                            className="m-1"
                            onClick={() => setMainSection("AddAttendance")}
                            style={{
                              color: "blue",
                              cursor: "pointer",
                            }}
                          >
                            Create Attendance Panel
                          </div>
                        </div>
                      ) : (
                        AttendanceData.map((attendance) => (
                          <div
                            className="card m-3"
                            style={{ width: "20rem" }}
                            key={attendance._id}
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
                                  {attendance.username}
                                </div>
                              </div>
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-block btn-dark"
                                  onClick={() =>
                                    editAttendanceModal(attendance._id)
                                  }
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  className="btn btn-block btn-dark"
                                  onClick={() =>
                                    deleteAttendanceModal(attendance._id)
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

      <EditAttendanceModal
        show={showEditAttendanceModal}
        handleClose={() => setShowEditAttendanceModal(false)}
        data={editAttendanceModalData}
        fetchAttendanceData={fetchAttendanceData}
      />

      <DeleteAttendanceModal
        show={showDeleteAttendanceModal}
        handleClose={() => setShowDeleteAttendanceModal(false)}
        data={deleteAttendanceModalData}
        fetchAttendanceData={fetchAttendanceData}
      />
    </>
  );
};

export default AdminManagePayroll;
