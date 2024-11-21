import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

import { editManager } from "../../../schemas";

function EditManagerModal({ show, handleClose, data, fetchManagerData }) {
  const managerInfo = {
    username: data?.username || "", // Provide a fallback to avoid undefined
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: managerInfo,
    enableReinitialize: true,
    validationSchema: editManager,
    onSubmit: (values) => {
      console.log(values);
      axios
        .put(
          `${process.env.REACT_APP_ADMIN_API}/updatemanager/${data._id}`,
          values,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
          fetchManagerData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Manager</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={values.username}
              onChange={handleChange}
              required
            />
            <label className="text-danger">
              {errors.username && touched.username ? errors.username : null}
            </label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button variant="secondary" onClick={handleClose} className="mr-2">
              <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
            </Button>
            <Button variant="dark" type="submit" id="update_manager_btn">
              <img src="../../dist/img/update.svg" alt="Update" /> Update
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <Link to="/change-manager-password" className="mx-2">
              {" "}
              Do you want to change manager password?{" "}
            </Link>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditManagerModal;
