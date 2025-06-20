import React, { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { State } from "country-state-city";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function AdminProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/user/userdata`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "Null") {
        navigate("/login");
      } else {
        setUserData(response.data);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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

        <section className="content" id="display-profile">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card card-primary card-outline">
                  <div className="card-body box-profile">
                    <div className="text-center">
                      <img
                        className="profile-user-img img-fluid img-circle"
                        src={`${
                          process.env.REACT_APP_ADMIN_API +
                          "/uploads/" +
                          userData.logo
                        }`}
                        alt="User profile picture"
                      />
                    </div>
                    <h3
                      className="profile-username text-center"
                      style={{ fontWeight: "bold" }}
                    >
                      {userData.name}
                    </h3>
                    <p className="text-muted text-center">
                      {userData.restaurant_code}
                    </p>
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                        <table className="table-responsive">
                          <tr>
                            <td style={{ fontWeight: "bold" }}>Email</td>
                            <td className="px-2">:</td>
                            <td>{userData.email}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>Mobile</td>
                            <td className="px-2">:</td>
                            <td>{userData.mobile}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>Address</td>
                            <td className="px-2">:</td>
                            <td>{userData.address}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>City</td>
                            <td className="px-2">:</td>
                            <td>{userData.city}</td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>State</td>
                            <td className="px-2">:</td>
                            <td>
                              {State.getStateByCodeAndCountry(
                                userData.state,
                                userData.country
                              )?.name || userData.state}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                    <div className="row mt-4 mb-2">
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => navigate("/settings")}
                        >
                          Update Profile
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary ml-2"
                          onClick={() => navigate("/forgot-password")}
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
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

export default AdminProfile;
