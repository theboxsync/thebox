import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function RemoveSpecialModal({ show, handleClose, data, fetchMenuData }) {
    const removeSpecialDish = (id) => {
        axios
          .put(`${process.env.REACT_APP_MANAGER_API}/removespecialdish/${id}`)
          .then((res) => {
            console.log(res.data);
            handleClose();
            fetchMenuData();
          })
          .catch((err) => {
            console.log(err);
          });
      }
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Special Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want Remove this dish as a Special Dish?</h5>
        <input type="hidden" name="special_dish_id" id="special_dish_id" />
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" onClick={() => removeSpecialDish(data._id)}>
          <img src="../../dist/img/approve.svg" alt="Remove" /> Yes, Remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveSpecialModal