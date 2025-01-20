import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function QsrProfile() {
  const [managerData, setManagerData] = useState("");
  const navigate = useNavigate();
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QSR_API}/userdata`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "Null") {
        navigate("/login");
      } else {
        setManagerData(response.data);
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
                        src="../Logo/<?php echo $user['logo']; ?>"
                        alt="User profile picture"
                      />
                    </div>
                    <h3 className="profile-username text-center">
                      {managerData.name}
                    </h3>
                    <p className="text-muted text-center">
                      {managerData.restaurant_code}
                    </p>
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-md-8">
                        <table className="table-responsive">
                          <tbody>
                            <tr>
                              <td>Email</td>
                              <td>{managerData.email}</td>
                            </tr>
                            <tr>
                              <td>Moblie</td>
                              <td>{managerData.mobile}</td>
                            </tr>
                            <tr>
                              <td>Address</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Start Date</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>End Date</td>
                              <td></td>
                            </tr>
                          </tbody>
                        </table>
                        <button
                          type="button"
                          className="btn btn-dark float-right"
                          id="edit-profile"
                        >
                          <img src="../dist/img/icon/edit.svg" /> Edit
                        </button>
                      </div>
                      <div className="col-md-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <div className="text-center">
          <div>
            <h1> Restaurant Code : {managerData.restaurant_code} </h1>
            <h3> Name: {managerData.name} </h3>
            <h3> Email: {managerData.email} </h3>
            <h3> Mobile: {managerData.mobile} </h3>
          </div>
        </div> */}

        <Footer />
      </div>
    </div>
  );
}

export default QsrProfile;
