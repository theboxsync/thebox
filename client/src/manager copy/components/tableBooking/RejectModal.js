import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RejectModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="#" method="POST">
          <h5>Are you sure you want to Reject this Request?</h5>
          <div style={{ marginTop: 30 }}>
            <Button variant="secondary" onClick={handleClose} style={{ marginRight: 20 }}>
              <img src="../dist/img/icon/cancel.svg" alt="Cancel" />
              Cancel
            </Button>
            <Button variant="dark" type="submit" name="reject_c_btn" id="reject_c_btn" >
              <img src="../dist/img/icon/cancel-r.svg" alt="Reject" />
              Reject
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RejectModal;
