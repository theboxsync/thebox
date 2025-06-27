import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../../../style.css";

import AddAttendanceModal from "./AddAttendanceModal.js";
import EditAttendanceModal from "./EditAttendanceModal.js";
import DeleteAttendanceModal from "./DeleteAttendanceModal.js";

import { AuthContext } from "../../../context/AuthContext.jsx";
import Loading from "../../../components/Loading.js";

const AdminManagePayroll = ({ setPayrollName }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mainSection, setMainSection] = useState("Dashboard");
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [AttendanceData, setAttendanceData] = useState([]);

  const [showAddAttendance, setShowAddAttendance] = useState(false);
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
      if (response.data.length > 0) {
        setPayrollName(response.data[0].username);
      }
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
    <div className="btn-group">
      <button
        className="btn btn-transparent bg-transparent"
        title="View"
        onClick={() => navigate("/staff/attendance")}
      >
        <img src="../../dist/img/icon/eye-b.svg" alt="View" />
      </button>
      {AttendanceData.length === 0
        ? (console.log("Atendance Data: ", AttendanceData),
          (
            <>
              <button
                className="btn btn-transparent bg-transparent"
                title="Add"
                onClick={() => setShowAddAttendance(true)}
              >
                <img
                  src="../../dist/img/icon/add.svg"
                  alt="edit Details"
                  style={{ filter: "invert(100%)" }}
                />
              </button>
            </>
          ))
        : AttendanceData.map((att) => (
            <div key={att._id}>
              <button
                className="btn btn-transparent bg-transparent"
                title="Edit"
                onClick={() => editAttendanceModal(att._id)}
              >
                <img src="../../dist/img/icon/edit-b.svg" alt="edit Details" />
              </button>
              <button
                className="btn btn-transparent bg-transparent"
                title="delete"
                onClick={() => deleteAttendanceModal(att._id)}
              >
                <img
                  src="../../dist/img/icon/delete-b.svg"
                  alt="delete Details"
                />
              </button>
            </div>
          ))}

      <AddAttendanceModal
        show={showAddAttendance}
        handleClose={() => setShowAddAttendance(false)}
        fetchAttendanceData={fetchAttendanceData}
      />

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
    </div>
  );
};

export default AdminManagePayroll;
