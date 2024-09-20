import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function EditPresentModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Present</Modal.Title>
      </Modal.Header>
      <Form id="editPresentForm">
        <Modal.Body>
          <input type="hidden" id="staff_id_modal" name="staff_id" />
          <input type="hidden" id="day_modal" name="day" />
          <Row>
            <Col md={6}>
              <Form.Group controlId="checkin_time_modal">
                <Form.Label>Check-in Time</Form.Label>
                <Form.Control type="time" name="checkin_time" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="checkout_time_modal">
                <Form.Label>Check-out Time</Form.Label>
                <Form.Control type="time" name="checkout_time" />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <img src="../dist/img/icon/cancel.svg" alt="Close" /> Close
          </Button>
          <Button variant="dark" id="editPresentBtnModal" name="editPresent">
            Present
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditPresentModal;
