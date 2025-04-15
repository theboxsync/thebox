import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/api/subscription/getusersubscriptioninfo/${id}`,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setSubscriptions(res.data.subscriptions);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 min-vw-100">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">User Details</h2>
          <button
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        {/* User Card */}
        <div className="card shadow-sm mb-5">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">{user?.name}</h5>
          </div>
          <div className="card-body">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Mobile:</strong> {user?.mobile}
            </p>
            <p>
              <strong>Restaurant Code:</strong> {user?.restaurant_code}
            </p>
            <p>
              <strong>Location:</strong> {user?.city}, {user?.state},{" "}
              {user?.country}
            </p>
            <p>
              <strong>Address:</strong> {user?.address}
            </p>
            <p>
              <strong>Pincode:</strong> {user?.pincode}
            </p>
            <p>
              <strong>Registered On:</strong>{" "}
              {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="card shadow-sm">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">Subscriptions</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Plan Name</th>
                    <th>Price (₹)</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.length > 0 ? (
                    subscriptions.map((sub) => (
                      <tr key={sub._id}>
                        <td>{sub.plan_name}</td>
                        <td>{sub.plan_price}</td>
                        <td>{new Date(sub.start_date).toLocaleDateString()}</td>
                        <td>{new Date(sub.end_date).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 rounded-pill ${
                              sub.status === "active"
                                ? "bg-success"
                                : sub.status === "expired"
                                ? "bg-danger"
                                : "bg-secondary"
                            }`}
                          >
                            {sub.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-4">
                        No subscriptions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
