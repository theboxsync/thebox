import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function DeleteInventoryModal({ show, handleClose, id, fetchInventoryData }) {
  const deleteInventory = (id) => {
    axios
      .delete(`${process.env.REACT_APP_ADMIN_API}/deleteinventory/${id}`)
      .then((res) => {
        console.log(res.data);
        handleClose();
        fetchInventoryData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this inventory?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => deleteInventory(id)}>
            <img src="../../dist/img/delete.svg" />
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteInventoryModal;
