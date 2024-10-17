import React, { useState, useEffect } from "react";
import StaffProfileModal from "./StaffProfileModal";
import axios from "axios";

function ViewStaff({ setSection }) {
  const [staff, setStaff] = useState([]);
  const [selectedStaffId, setSelectedStaffId] = useState(null); // Add state to track selected staff ID
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Fetch staff data from the backend
    async function fetchStaff() {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MANAGER_API}/staffdata`,
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

  const handleProfileClick = (id) => {
    setSelectedStaffId(id);
    setShowProfileModal(true);
  };

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
                </div>
                <div className="card-body p-0">
                  <ul className="users-list clearfix">
                    {staff.map((staffMember) => (
                      <li
                        key={staffMember._id}
                        className="col-md-2"
                        onClick={() => handleProfileClick(staffMember._id)} 
                      >
                        <img
                          src={`${process.env.REACT_APP_MANAGER_API}/uploads/staff/profile/${staffMember.photo}`}
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
        staffId={selectedStaffId}
      />
    </>
  );
}

export default ViewStaff;
