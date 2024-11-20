import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteManagerModal({ show, handleClose, data, fetchManagerData }) {
  const deleteManager = (id) => {
    axios
      .delete(`${process.env.REACT_APP_ADMIN_API}/deletemanager/${id}`)
      .then((res) => {
        handleClose();
        fetchManagerData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="deleteManagerModalLabel">Delete Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete Manager?</h5>
        <input type="hidden" name="delete_manager_id" value={data.id} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" onClick={() => deleteManager(data.id)}>
          <img src="../../dist/img/delete.svg" alt="Delete" /> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteManagerModal;
