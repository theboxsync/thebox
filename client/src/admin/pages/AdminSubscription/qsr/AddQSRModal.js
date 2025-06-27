import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { addQSR } from "../../../../schemas"; // Yup validation schema

function AddQSRModal({ show, handleClose, fetchQsrData }) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: addQSR,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/qsr/addqsr`,
          values,
          { withCredentials: true }
        );
        console.log("QSR Added:", response.data);
        formik.resetForm();
        fetchQsrData();
        handleClose();
      } catch (err) {
        console.error("Add QSR Error:", err);
        alert("Failed to add QSR. Try again.");
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add QSR</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>QSR Name</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && !!formik.errors.username}
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
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
            </Button>
            <Button type="submit" variant="dark" className="ml-2">
              <img src="../../dist/img/add.svg" alt="Add" /> Add QSR
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddQSRModal;
