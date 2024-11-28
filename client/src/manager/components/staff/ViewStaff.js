import React, { useState, useEffect } from "react";
import StaffProfileModal from "./StaffProfileModal";
import axios from "axios";

function ViewStaff({ setSection }) {
  const [staff, setStaff] = useState([]);
  const [selectedStaffData, setSelectedStaffData] = useState({}); 
  const [showProfileModal, setShowProfileModal] = useState(false);

  const fetchStaff = async function () {
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
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleProfileClick = async (id) => {
    axios
      .get(`${process.env.REACT_APP_MANAGER_API}/staffdata/${id}`)
      .then((res) => {
        setSelectedStaffData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowProfileModal(true);
    console.log(selectedStaffData);
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
                          alt="Staff Image"
                        />
                        <p className="users-list-name link mt-2">
                          {staffMember.f_name + " " + staffMember.l_name}
                          <small className="users-list-date">{staffMember.position}</small>
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
        handleClose={() => {
          setShowProfileModal(false);
          setSelectedStaffData({});
        }}
        data={selectedStaffData}
      />
    </>
  );
}

export default ViewStaff;
