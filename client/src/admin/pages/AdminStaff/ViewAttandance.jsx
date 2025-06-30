import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../../style.css";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import EditPresentModal from "../../components/payroll/EditPresentModal";
import EditAbsentModal from "../../components/payroll/EditAbsentModal";

import { IoMdArrowRoundBack } from "react-icons/io";

const ViewAttandance = () => {
  const { id } = useParams(); // staff_id from URL
  const navigate = useNavigate();

  const [staffData, setStaffData] = useState(null);
  const [attendanceEvents, setAttendanceEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editPresentModalShow, setEditPresentModalShow] = useState(false);
  const [editAbsentModalShow, setEditAbsentModalShow] = useState(false);

  const [selectedStaffId, setSelectedStaffId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/staff/staffdata/${id}`,
        { withCredentials: true }
      );

      const staff = response.data;
      setStaffData(staff);

      const events = staff.attandance.map((att) => {
        let title = "";

        if (att.status === "present") {
          title = `Present\nIn: ${att.in_time || "N/A"}\nOut: ${
            att.out_time || "N/A"
          }`;
        } else if (att.status === "absent") {
          title = "Absent";
        }

        return {
          title,
          date: att.date, // your model has capital "Date"
          backgroundColor: att.status === "present" ? "#28a745" : "#dc3545",
          borderColor: att.status === "present" ? "#28a745" : "#dc3545",
        };
      });

      setAttendanceEvents(events);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

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
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">{staffData?.f_name} {staffData?.l_name}'s Attendance Info</h3>
                    <div className="card-tools mx-2">
                      <button
                        type="button"
                        className="btn btn-block btn-dark"
                        onClick={() => navigate(-1)}
                      >
                        <IoMdArrowRoundBack /> Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container card p-4">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={attendanceEvents}
              eventContent={(arg) => {
                const { event } = arg;
                const [statusLine, ...timeLines] = event.title.split("\n");
                return (
                  <div className="fc-event-custom-content text-center m-2">
                    <div style={{ fontWeight: "bold" }}>{statusLine}</div>
                    {timeLines.map((line, index) => (
                      <div key={index} style={{ fontSize: "0.85rem" }}>
                        {line}
                      </div>
                    ))}
                  </div>
                );
              }}
              height="auto"
            />
          </div>
        </div>
      </div>
      <Footer />
      <EditPresentModal
        show={editPresentModalShow}
        handleClose={() => setEditPresentModalShow(false)}
        staffId={id}
        date={selectedDate}
        fetchAttendance={fetchAttendance}
      />
      <EditAbsentModal
        show={editAbsentModalShow}
        handleClose={() => setEditAbsentModalShow(false)}
        staffId={id}
        date={selectedDate}
        fetchAttendance={fetchAttendance}
      />
    </div>
  );
};

export default ViewAttandance;
