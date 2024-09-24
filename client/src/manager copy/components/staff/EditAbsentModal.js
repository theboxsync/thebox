import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditAbsentModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Absent</Modal.Title>
      </Modal.Header>
      <Form id="editAbsentForm">
        <Modal.Body>
          <input type="hidden" id="staff_id_modal_a" name="staff_id" />
          <input type="hidden" id="day_modal_a" name="day" />
          <h5 style={{ color: "black" }}>
            Are You sure you want to mark absent
          </h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <img src="../dist/img/icon/cancel.svg" alt="Close" /> Close
          </Button>
          <Button variant="dark" id="editAbsentBtnModal" name="editAbsent">
            Absent
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditAbsentModal;
