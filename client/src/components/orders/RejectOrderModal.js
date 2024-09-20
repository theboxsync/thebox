import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

function RejectOrderModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="delete_order_form">
          <h5>Are you sure you want to Delete this Request?</h5>
          <Form.Control type="hidden" name="order_id_for_reject" id="order_id_for_reject" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark">
          <img src="../dist/img/delete.svg" alt="Delete" /> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectOrderModal;
