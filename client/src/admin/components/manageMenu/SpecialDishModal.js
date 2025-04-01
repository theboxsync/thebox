import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function SpecialDishModal({ show, handleClose, data, fetchMenuData }) {
  const setSpecialDish = (id) => {
    axios
      .put(`${process.env.REACT_APP_ADMIN_API}/menu/setspecialdish/${id}`)
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
        <Modal.Title>Special Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want set this dish as a Special Dish?</h5>
        <input type="hidden" name="special_dish_id" id="special_dish_id" />
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" onClick={() => setSpecialDish(data._id)}>
          <img src="../../dist/img/approve.svg" alt="Save" /> Set
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SpecialDishModal;
