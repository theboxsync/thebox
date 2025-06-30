import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style.css";
import { Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";



export default function ManageAttendance() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [staffList, setStaffList] = useState([]);



  const fetchStaff = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/staff/staffdata`,
        {
          withCredentials: true,
        }
      );
      setStaffList(response.data);
      console.log("Staff List:", response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    const options = { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit" };
    const [day, month, year] = today.toLocaleDateString("en-IN", options).split("/");
  
    return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // "HH:MM"
  };

  const handleCheckIn = async (staffId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/staff/checkin`,
        {
          staff_id: staffId,
          date: getTodayDate(),
          in_time: getCurrentTime(),
        },
        { withCredentials: true }
      );
      fetchStaff(); // refresh staff data
    } catch (error) {
      console.error("Error during Check-In:", error);
    }
  };

  const handleCheckOut = async (staffId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/staff/checkout`,
        {
          staff_id: staffId,
          date: getTodayDate(),
          out_time: getCurrentTime(),
        },
        { withCredentials: true }
      );
      fetchStaff();
    } catch (error) {
      console.error("Error during Check-Out:", error);
    }
  };

  const handleAbsent = async (staffId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/staff/markabsent`,
        {
          staff_id: staffId,
          date: getTodayDate(),
        },
        { withCredentials: true }
      );
      fetchStaff();
    } catch (error) {
      console.error("Error marking Absent:", error);
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

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Manage Attendance</h3>
                    <div className="card-tools mx-2">
                      <Link to={"/staff"}>
                        <button
                          type="button"
                          className="btn btn-block btn-dark"
                        >
                          <img src="../dist/img/icon/view.svg" /> View Staff
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="container-fluid" style={{ overflowX: "scroll" }}>
                <div className="container">
                  <h5>
                    Date : {getTodayDate().split("-").reverse().join("-")}
                  </h5>
                </div>
                <hr
                  style={{ height: 1, backgroundColor: "grey", border: "none" }}
                />
                <div id="staff_atten_info">
                  <div id="staff_info">
                    <table
                      className="table table-bordered table-striped"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th className="col-md-2">Staff Id</th>
                          <th className="col-md-2">Name</th>
                          <th className="col-md-2">Position</th>
                          <th className="col-md-2">Attendance</th>
                          <th className="col-md-2">View Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffList.map((staff) => (
                          <tr key={staff._id}>
                            <td>{staff.staff_id}</td>
                            <td>{`${staff.f_name} ${staff.l_name}`}</td>
                            <td>{staff.position}</td>
                            <td>
                              <div className="d-flex justify-content-around">
                                {(() => {
                                  // Find today's attendance record
                                  const today = getTodayDate();
                                  const todayAttendance =
                                    staff.attandance?.find(
                                      (a) => a.date === today
                                    );

                                  if (!todayAttendance) {
                                    // No record yet → Only show Check-in
                                    return (
                                      <>
                                        <button
                                          className="btn btn-dark"
                                          type="button"
                                          onClick={() =>
                                            handleCheckIn(staff._id)
                                          }
                                        >
                                          Check-In
                                        </button>
                                        <button
                                          className="btn btn-dark"
                                          type="button"
                                          onClick={() =>
                                            handleAbsent(staff._id)
                                          }
                                        >
                                          Absent
                                        </button>
                                      </>
                                    );
                                  } else if (
                                    todayAttendance &&
                                    todayAttendance.in_time &&
                                    !todayAttendance.out_time
                                  ) {
                                    // Checked in but not yet checked out → Only show Check-out
                                    return (
                                      <>
                                        <button
                                          className="btn btn-primary"
                                          type="button"
                                          onClick={() =>
                                            handleCheckOut(staff._id)
                                          }
                                        >
                                          Check-Out
                                        </button>
                                      </>
                                    );
                                  } else {
                                    // Already checked-out or marked absent → No buttons
                                    return (
                                      <span className="badge bg-secondary p-2">
                                        Completed
                                      </span>
                                    );
                                  }
                                })()}
                              </div>
                            </td>
                            <td className="text-center">
                              <button
                                className="btn btn-dark"
                                style={{ width: 150 }}
                                onClick={() =>
                                  navigate(`/staff/attendance/${staff._id}`)
                                }
                              >
                                View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <hr
                      style={{
                        height: 1,
                        backgroundColor: "grey",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
