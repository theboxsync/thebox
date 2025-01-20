import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./components/Loading";
import Navbar from "./components/NavBar";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";

function ForgotAdminPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: OTP, Step 2: Change Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSendOtp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/sendadminotp`,
        { email }
      );
      setSuccess(response.data.message);
      setError("");
      setStep(2); // Move to the next step
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/verifyadminotp`,
        { email, otp }
      );
      setSuccess(response.data.message);
      setError("");
      setStep(3); // Move to the password reset step
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  }; 

  const handleResetPassword = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/resetadminpassword`,
        { email, newPassword }
      );
      setSuccess(response.data.message);
      setError("");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to the admin login page
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="login-page">
        <div className="login-box">
          <div className="card card-outline card-secondary">
            <div className="card-header text-center">
              <p className="title">
                <b>THE</b>BOX
              </p>
            </div>
            <div className="card-body">
              <p className="login-box-msg text-dark">
                You forgot your password? Here you can easily retrieve a new
                password.
              </p>
              {step === 1 && (
                <form onSubmit={handleSendOtp}>
                  <div className="form-group">
                    <label>Enter Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <button type="submit" className="btn btn-dark">
                    Send OTP
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleVerifyOtp}>
                  <div className="form-group">
                    <label>Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <button type="submit" className="btn btn-dark">
                    Verify OTP
                  </button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleResetPassword}>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && (
                    <div className="alert alert-success">{success}</div>
                  )}
                  <button type="submit" className="btn btn-dark">
                    Reset Password
                  </button>
                </form>
              )}
              <div className="mb-1 text-right">
                <Link to="/login" className="text-dark ">
                  {" "}
                  <b> Login </b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="p-2">
          <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="mb-4">Forgot Admin Password</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotAdminPassword;
