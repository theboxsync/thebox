import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/NavBar";
import MenuBar from "../components/MenuBar";
import Footer from "../components/Footer";

const ChangeCaptainPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { captainId } = location.state || {}; 
  const [adminPassword, setAdminPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!captainId) {
    console.log("Captain ID not found in state");
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/captain/changecaptainpassword`,
        {
          adminPassword,
          newPassword,
          captainId,
        },
        { withCredentials: true }
      );
      setSuccess(response.data.message);
      setError("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.response.data.message || "An error occurred.");
      setSuccess("");
    }
  };
  return (
    <div className="wrapper">
      <Navbar />

      <MenuBar />
      <div className="content-wrapper p-2">
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
          <h2 className="mb-4">Change Captain Password</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
              <label>Admin Password</label>
              <input
                type="password"
                className="form-control"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                required
              />
            </div>
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
            {success && <div className="alert alert-success">{success}</div>}
            <button type="submit" className="btn btn-dark">
              Change Password
            </button>
          </form>
          <Link to="/forgot-password"> Forgot Admin Password? </Link>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ChangeCaptainPassword;
