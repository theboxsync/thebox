import React, { useState } from "react";
import { Link } from "react-router-dom";
import StaffProfileModal from "./StaffProfileModal";
import StaffDeleteModal from "./StaffDeleteModal";

function ViewStaff({ setSection }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                      <img src="../dist/img/icon/add.svg" /> Add Staff
                    </button>
                  </div>
                  <div className="card-tools mx-2">
                    <Link to={"/staff/attendance"}>
                      <button type="button" className="btn btn-block btn-dark">
                        <img src="../dist/img/icon/add.svg" /> Attendance
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="users-list clearfix">
                    <li
                      className="col-md-2"
                      onClick={() => setShowProfileModal(true)}
                    >
                      <img src="../../Logo/GJ0001.webp" alt="User Image" />
                      <p className="users-list-name link">Pranay</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StaffProfileModal show={showProfileModal} handleClose={() => setShowProfileModal(false)} handleDelete={() => setShowDeleteModal(true)} />

      <StaffDeleteModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} />
    </>
  );
}

export default ViewStaff;
