import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";

function DeleteCaptainModal({ show, handleClose, data, fetchCaptainData }) {
  const [isLoading, setIsLoading] = useState(false);

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setShowPasswordField(true); // Show the password input field
  };

  const handleConfirmDelete = async () => {
    if (!adminPassword) {
      setError("Admin password is required.");
      return;
    }

    setError("");
    setSuccess("");
    setIsLoading(true);
    try {
      console.log("DATA : ", data);
      await axios
        .post(
          `${process.env.REACT_APP_ADMIN_API}/captain/deletecaptain`,
          {
            captainId: data.id,
            adminPassword,
          },
          { withCredentials: true }
        )
        .then((res) => {
          if (res.status === 200) {
            setSuccess(res.data.message);
            setError("");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
            fetchCaptainData();
            resetFields(); // Reset fields after successful deletion
            handleClose();
          } else {
            setError(res.data.message);
            setSuccess("");
          }
        })
        .catch((err) => {
          setError(err.response?.data?.message || "Failed to delete Captain.");
          setSuccess("");
        });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete Captain.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to reset all fields
  const resetFields = () => {
    setShowPasswordField(false);
    setAdminPassword("");
    setError("");
    setSuccess("");
  };

  // Modified handleClose to reset fields
  const handleModalClose = () => {
    resetFields();
    handleClose();
  };

  return (
    <>
      {isLoading && <Loading />}
      <Modal
        show={show}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="deleteCaptainModalLabel">Delete Captain</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!showPasswordField ? (
            <>
              <h5>Are you sure you want to delete this Captain?</h5>
              <p>This action cannot be undone.</p>
            </>
          ) : (
            <>
              <h5>Confirm Admin Password</h5>
              <Form.Group controlId="adminPassword">
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter admin password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                />
                <Link to="/forgot-password"> Forgot Admin Password? </Link>
              </Form.Group>
              {error && <div className="alert alert-danger mt-2">{error}</div>}
              {success && (
                <div className="alert alert-success mt-2">{success}</div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
          </Button>
          {!showPasswordField ? (
            <Button variant="dark" onClick={handleDeleteClick}>
              <img src="../../dist/img/delete.svg" alt="Delete" /> Delete
            </Button>
          ) : (
            <Button variant="danger" onClick={handleConfirmDelete}>
              Confirm Delete
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteCaptainModal;
