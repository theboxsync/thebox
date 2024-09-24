import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

import { editDish } from "../../schemas";

function EditDishModal({ show, handleClose, data, fetchMenuData }) {
  const dishInfo = {
    dish_name: data.dish_name,
    dish_price: data.dish_price,
  };

  const { values, handleSubmit, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: dishInfo,
      enableReinitialize: true,
      validationSchema: editDish,
      onSubmit: (values) => {
        console.log(values);
        axios
          .put(
            `${process.env.REACT_APP_ADMIN_API}/updatemenu/${data._id}`,
            values,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log(res.data);
            handleClose();
            fetchMenuData();
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="edit_Dish_form" onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Dish Name</Form.Label>
            <Form.Control
              type="text"
              name="dish_name"
              value={values.dish_name}
              onChange={handleChange}
              required
            />
            <label className="text-danger">
              {errors.dish_name && touched.dish_name ? errors.dish_name : null}
            </label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dish Price</Form.Label>
            <Form.Control
              type="text"
              name="dish_price"
              value={values.dish_price}
              onChange={handleChange}
              required
            />
            <label className="text-danger">
              {errors.dish_price && touched.dish_price
                ? errors.dish_price
                : null}
            </label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
            </Button>
            <Button variant="dark" type="submit" id="update_Dish_btn">
              <img src="../../dist/img/update.svg" alt="Update" /> Update
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditDishModal;
