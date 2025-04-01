import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { State } from "country-state-city";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import { QRCodeSVG } from "qrcode.react";

function AdminProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [taxInfo, setTaxInfo] = useState({ cgst: 0, sgst: 0 });
  const [isEditingTax, setIsEditingTax] = useState(false);
  const [feedbackToken, setFeedbackToken] = useState("");
  const qrCodeRef = useRef(null);

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
        setTaxInfo(response.data.taxInfo || { cgst: 0, sgst: 0 });
        if (response.data.feedbackToken) {
          setFeedbackToken(response.data.feedbackToken);
        }
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const updateTaxInfo = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/user/update-tax`,
        { taxInfo },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Tax information updated successfully!");
        setIsEditingTax(false); // Disable edit mode after saving
      }
    } catch (error) {
      console.log("Error updating tax info:", error);
      alert("Failed to update tax information.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleTaxChange = (e) => {
    const { name, value } = e.target;
    setTaxInfo({ ...taxInfo, [name]: value });
  };

  const generateFeedbackQR = async () => {
    console.log("Generating feedback token...");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/feedback/generate-feedback-token`,
        {},
        { withCredentials: true }
      );

      setFeedbackToken(response.data.feedbackToken);
      console.log("Feedback token:", response.data.feedbackToken);
    } catch (error) {
      console.error("Error generating feedback token:", error);
      console.log(error);
    }
  };
  const printQRCode = () => {
    const printContent = qrCodeRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
      <head>
        <title>Print QR Code</title>
        <style>
          body { text-align: center; font-family: Arial, sans-serif; }
          .qr-container { padding: 20px; }
          .qr-container h2 { font-size: 18px; margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="qr-container">
          <h2 style="margin-bottom: 25px;">Scan the QR Code to Give Feedback</h2>
          ${printContent}
        </div>
      </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
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

                        {/* Tax Edit Section */}
                        {/* <div className="mt-4">
                          <h3 className="mb-3" style={{ fontWeight: "bold" }}>
                            Tax Information
                          </h3>
                          <form className="row">
                            <div className="form-group col-md-4">
                              <label>CGST (%)</label>
                              <input
                                type="number"
                                name="cgst"
                                value={taxInfo.cgst}
                                onChange={handleTaxChange}
                                className="form-control"
                                disabled={!isEditingTax} 
                                
                              />
                            </div>
                            <div className="form-group col-md-4">
                              <label>SGST (%)</label>
                              <input
                                type="number"
                                name="sgst"
                                value={taxInfo.sgst}
                                onChange={handleTaxChange}
                                className="form-control"
                                disabled={!isEditingTax} 
                                
                              />
                            </div>
                            
                            {!isEditingTax ? (
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => setIsEditingTax(true)}
                              >
                                Edit Tax Info
                              </button>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="btn btn-success"
                                  onClick={updateTaxInfo}
                                >
                                  Save
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-secondary ml-2"
                                  onClick={() => setIsEditingTax(false)}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          </form>
                        </div> */}
                        <div className="mt-4">
                          <h3 className="mb-3" style={{ fontWeight: "bold" }}>
                            Feedback QR Code
                          </h3>
                          <button
                            className="btn btn-primary"
                            onClick={generateFeedbackQR}
                          >
                            Create New Feedback QR
                          </button>

                          {feedbackToken && (
                            <div className="mt-3">
                              <p>Scan the QR code to give feedback:</p>
                              <div ref={qrCodeRef}>
                                <QRCodeSVG
                                  size={300}
                                  value={`${process.env.REACT_APP_URL}/feedback/${feedbackToken}`}
                                />
                              </div>
                            </div>
                          )}

                          {feedbackToken && (
                            <button
                              className="btn btn-secondary mt-2"
                              onClick={printQRCode}
                            >
                              Print QR Code
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="col-md-2"></div>
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
