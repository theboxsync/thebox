import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Delete Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete this Booking?</h5>
        <input type="hidden" name="booking_id" id="booking_id" />
        <div style={{ marginTop: 30 }}>
          <Button
            variant="dark"
            onClick={handleClose}
            style={{ marginRight: 20 }}
          >
            <img src="../dist/img/cancel.svg" alt="Cancel" /> Cancel
          </Button>
          <Button variant="dark" type="button" id="delete_c_btn">
            <img src="../dist/img/delete.svg" alt="Delete" /> Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DeleteModal;
