import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function DeleteBillModal({show, handleClose}) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton >
          <Modal.Title>Delete Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this inventory?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
          <img src="../../dist/img/delete.svg" />
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteBillModal;
