import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

import { editQsr } from "../../../../schemas";

function EditQsrModal({ show, handleClose, data, fetchQsrData }) {
  const qsrInfo = {
    username: data?.username || "", // Provide a fallback to avoid undefined
  };

  const { values, handleSubmit, handleChange, touched, errors } = useFormik({
    initialValues: qsrInfo,
    enableReinitialize: true,
    validationSchema: editQsr,
    onSubmit: (values) => {
      console.log(values);
      axios
        .put(
          `${process.env.REACT_APP_ADMIN_API}/qsr/updateqsr/${data._id}`,
          values,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          handleClose();
          fetchQsrData();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const navigateToChangePassword = () => {
    navigate("/change-qsr-password", { state: { qsrId: data._id } });
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Edit Qsr</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
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
            <Button variant="dark" type="submit" id="update_qsrInfo_btn">
              <img src="../../dist/img/update.svg" alt="Update" /> Update
            </Button>
          </Form.Group>
          <Form.Group className="mb-3">
            <div className="mt-3" onClick={navigateToChangePassword} style={{ cursor: "pointer", color: "cornflowerblue" }}>
              Do you want to change qsrInfo password?
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditQsrModal;
