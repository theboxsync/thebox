import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function FilterModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="filterModalLabel">Inventory Filter</Modal.Title>
      </Modal.Header>
      <Form
        className="needs-validation"
        method="POST"
        action=""
        encType="multipart/form-data"
        id="filterForm"
        autoComplete="off"
        noValidate
      >
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="startDate">From</Form.Label>
            <Form.Control
              type="date"
              id="startDate"
              name="start_date"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Date
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="endDate">To</Form.Label>
            <Form.Control type="date" id="endDate" name="end_date" required />
            <Form.Control.Feedback type="invalid">
              Please enter a valid Date
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <img src="../../dist/img/cancel.svg" alt="Cancel" /> Close
          </Button>
          <Button type="submit" variant="dark" name="filterBtn">
            Apply
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default FilterModal;
