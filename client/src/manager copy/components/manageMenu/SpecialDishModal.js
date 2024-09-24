import React from "react";
import { Modal, Button } from "react-bootstrap";

function SpecialDishModal({show, handleClose}) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Today's Special Menu</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want set this dish as a Today's Special?</h5>
        <input type="hidden" name="special_dish_id" id="special_dish_id" />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" >
          <img src="../../dist/img/approve.svg" alt="Save" /> Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpecialDishModal;
