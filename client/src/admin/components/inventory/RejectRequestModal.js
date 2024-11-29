import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function RejectRequestModal({ show, handleClose, id, fetchInventoryData }) {
  const rejectInventory = () => {
    axios
      .post(`${process.env.REACT_APP_ADMIN_API}/rejectinventoryrequest/${id}`)
      .then((res) => {
        console.log("Inventory rejected:", res.data);
        handleClose(); // Close the modal
        fetchInventoryData(); // Refresh the inventory list
      })
      .catch((err) => {
        console.error("Error rejecting inventory:", err);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reject Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to reject this inventory request?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={rejectInventory}>
          <img src="../../dist/img/delete.svg" alt="Delete" className="mx-1" />
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectRequestModal;
