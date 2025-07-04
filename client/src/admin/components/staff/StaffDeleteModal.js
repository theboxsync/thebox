import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function StaffDeleteModal({ show, handleClose, data, fetchStaff }) {
  const deleteStaff = (id) => {
    axios
      .delete(`${process.env.REACT_APP_ADMIN_API}/staff/deletestaff/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        handleClose();
        fetchStaff();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Delete Staff</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>Are you sure you want to delete <strong>{data.f_name + " " + data.l_name}</strong>?</h5>
        <input type="hidden" name="staff_id" id="staff_id" />
        <div style={{ marginTop: 30 }}>
          <Button variant="dark" onClick={handleClose} style={{ marginRight: 20 }}>
            <img src="../dist/img/icon/cancel.svg" alt="Cancel" /> Cancel
          </Button>
          <Button variant="dark" onClick={() => deleteStaff(data._id)}>
            <img src="../dist/img/icon/delete.svg" alt="Delete" /> Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default StaffDeleteModal;
