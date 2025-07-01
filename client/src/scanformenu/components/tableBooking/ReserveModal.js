import React from "react";
import { Modal, Button } from "react-bootstrap";

function ReserveModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Reserve Confirmation</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Are you sure!!
          <br />
          you want to Reserve this Table?
        </h5>
        <input type="hidden" name="reserve_id" id="reserve_id" />
        <div style={{ marginTop: 30 }}>
          <Button
            variant="dark"
            onClick={handleClose}
            style={{ marginRight: 20 }}
          >
            <img src="../dist/img/cancel.svg" alt="Cancel" /> Cancel
          </Button>
          <Button variant="dark" type="button" id="reserve_btn">
            <img src="../dist/img/reserved.svg" alt="Reserve" /> Reserve
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ReserveModal;
