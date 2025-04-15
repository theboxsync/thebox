import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

function CompleteModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Completed Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="complete-form"
          method="POST"
          encType="multipart/form-data"
          noValidate
        >
          <Form.Control type="hidden" name="complete_id" id="complete_id" />
          <div className="pb-2">
            <label style={{ fontWeight: "bold" }}>Payment Method</label>
          </div>
          <Form.Group className="row">
            <div className="form-check col-md-3">
              <Form.Check
                type="radio"
                name="pmethod"
                id="exampleRadios1"
                value="Credit Card"
                label="Credit Card"
                required
              />
            </div>
            <div className="form-check col-md-3">
              <Form.Check
                type="radio"
                name="pmethod"
                id="exampleRadios2"
                value="Debit Card"
                label="Debit Card"
                required
              />
            </div>
            <div className="form-check col-md-2">
              <Form.Check
                type="radio"
                name="pmethod"
                id="exampleRadios3"
                value="UPI"
                label="UPI"
                required
              />
            </div>
            <div className="form-check col-md-2">
              <Form.Check
                type="radio"
                name="pmethod"
                id="exampleRadios4"
                value="Cash"
                label="Cash"
                required
              />
            </div>
          </Form.Group>
          <div style={{ marginTop: 30 }}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={{ marginRight: 20 }}
            >
              <img src="../dist/img/cancel.svg" alt="Cancel" />
              Cancel
            </Button>
            <Button variant="dark" type="submit">
              <img src="../dist/img/icon/Completed.svg" alt="Complete" />
              Complete
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CompleteModal;
