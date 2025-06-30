import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import { addQSR } from "../../../../schemas"; // Reuse your Yup validation schema

function AddAttendanceModal({ show, handleClose, fetchAttendanceData }) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: addQSR,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/attendance/addattendance`,
          values,
          { withCredentials: true }
        );
        console.log("Attendance Panel Added:", res.data);
        fetchAttendanceData();
        handleClose();
      } catch (err) {
        console.error("Error adding attendance panel:", err);
        alert("Failed to add attendance panel.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Attendance Panel</Modal.Title>
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
              Cancel
            </Button>
            <Button variant="dark" type="submit" className="ml-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-1"
                  />
                  Adding...
                </>
              ) : (
                <>
                  <img
                    src="../../dist/img/add.svg"
                    alt="Add"
                    style={{ marginRight: 6 }}
                  />
                  Add Attendance Panel
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddAttendanceModal;
