import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { addManager } from "../../../../schemas";

function AddManagerModal({ show, handleClose, fetchManagerData }) {

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: addManager,
    onSubmit: (values) => {
      console.log("Submitted", values);
      axios
        .post(`${process.env.REACT_APP_ADMIN_API}/manager/addmanager`, values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log("Manager Added:", res.data);
          formik.resetForm();
          fetchManagerData();
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header >
        <Modal.Title>Add New Manager</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
            </Button>
            <Button variant="dark" type="submit" className="ml-2">
              <img src="../../dist/img/add.svg" alt="Add" /> Add Manager
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddManagerModal;
