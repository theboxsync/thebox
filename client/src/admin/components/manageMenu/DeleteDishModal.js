import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteDishModal({ show, handleClose, data, fetchMenuData }) {
  const deleteDish = (id) => {
    axios
      .delete(`${process.env.REACT_APP_ADMIN_API}/deletemenu/${id}`)
      .then((res) => {
        console.log(res.data);
        handleClose();
        fetchMenuData();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="deleteDishModalLabel">Delete Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete <strong>{data.dish_name}</strong> Dish?</h5>
        <input type="hidden" name="delete_dish_id" value={data.id} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" onClick={() => deleteDish(data.id)}>
          <img src="../../dist/img/delete.svg" alt="Delete" /> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteDishModal;