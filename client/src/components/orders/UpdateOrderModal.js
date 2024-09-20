import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateOrderModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Order Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="update_status_form">
          <h5 id="heading_update_modal">Are you sure you want to Update this Request?</h5>
          <Form.Control type="hidden" name="order_id_for_update" id="order_id_for_update" />
          <Form.Control type="hidden" name="order_status_for_update" id="order_status_for_update" />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark">
          <img src="../dist/img/add.svg" alt="Yes" /> Yes
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default UpdateOrderModal;
