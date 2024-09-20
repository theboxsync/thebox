import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StaffProfileModal from "./StaffProfileModal";
import StaffDeleteModal from "./StaffDeleteModal";
import axios from "axios";

function ViewStaff({ setSection }) {
  const [staff, setStaff] = useState([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // Fetch staff data from the backend
    async function fetchStaff() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/staffdata",
          {
            withCredentials: true,
          }
        );
        setStaff(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    }

    fetchStaff();
  }, []);

  return (
    <>
      <section className="content" id="viewStaff">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 style={{ fontWeight: "bold" }} className="card-title">
                    Manage Staff
                  </h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addStaffBtn"
                      onClick={() => setSection("AddStaff")}
                    >
                      <img src="../dist/img/icon/add.svg" alt="Add" /> Add Staff
                    </button>
                  </div>
                  <div className="card-tools mx-2">
                    <Link to={"/staff/attendance"}>
                      <button type="button" className="btn btn-block btn-dark">
                        <img src="../dist/img/icon/add.svg" alt="Attendance" />{" "}
                        Attendance
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="users-list clearfix">
                    {staff.map((staffMember) => (
                      <li
                        key={staffMember.staff_id}
                        className="col-md-2"
                        onClick={() => setShowProfileModal(true)}
                      >
                        <img
                          src={`http://localhost:3001/uploads/staff/profile/${staffMember.photo}`}
                          alt="User Image"
                        />
                        <p className="users-list-name link">
                          {staffMember.f_name}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StaffProfileModal
        show={showProfileModal}
        handleClose={() => setShowProfileModal(false)}
        handleDelete={() => setShowDeleteModal(true)}
      />

      <StaffDeleteModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default ViewStaff;
