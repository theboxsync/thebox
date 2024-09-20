import React from "react";
import { Modal, Button } from "react-bootstrap";

function StaffDeleteModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>Are you sure you want to delete Staff?</h5>
        <input type="hidden" name="staff_id" id="staff_id" />
        <div style={{ marginTop: 30 }}>
          <Button variant="dark" onClick={handleClose} style={{ marginRight: 20 }}>
            <img src="../dist/img/icon/cancel.svg" alt="Cancel" /> Cancel
          </Button>
          <Button variant="dark">
            <img src="../dist/img/icon/delete.svg" alt="Delete" /> Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default StaffDeleteModal;
