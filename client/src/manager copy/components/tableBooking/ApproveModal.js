import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ApproveModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Approve Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form action="#" method="POST">
          <Form.Group>
            <h5>Select Table Number for Confirm Approval</h5>
            <Form.Control
              as="select"
              name="select_table_type"
              required
            >
              <option selected disabled value>
                Select Option
              </option>
              <option value="A.C.">A.C.</option>
              <option value="Non A.C.">Non A.C.</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please Select Option
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group id="fetched_tbl_no">
            <Form.Control
              as="select"
              name="tbl_no"
              required
            >
              <option selected disabled>
                Select Table No.
              </option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Form.Control>
          </Form.Group>
          <div style={{ marginTop: 30 }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginRight: 20 }}
            >
              <img src="../dist/img/icon/cancel.svg" alt="Cancel" />
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              <img src="../dist/img/icon/approve.svg" alt="Approve" />
              Approve
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ApproveModal;
