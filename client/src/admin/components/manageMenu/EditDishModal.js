// EditDishModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";

function EditDishModal({ show, handleClose, data, fetchMenuData }) {
  const [previewImg, setPreviewImg] = useState(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const formik = useFormik({
    initialValues: {
      dish_name: data.dish_name || "",
      dish_price: data.dish_price || "",
      description: data.description || "",
      quantity: data.quantity || "",
      unit: data.unit || "",
      dish_img: null,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        let dish_img = data.dish_img;

        if (values.dish_img) {
          const formData = new FormData();
          formData.append("dish_imgs", values.dish_img);

          const uploadRes = await axios.post(
            `${process.env.REACT_APP_ADMIN_API}/upload/uploadmenuimages`,
            formData,
            {
              withCredentials: true,
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          console.log("Upload response:", uploadRes);
          dish_img = uploadRes.data.filenames[0];
        }

        const payload = { ...values, dish_img };

        await axios.put(
          `${process.env.REACT_APP_ADMIN_API}/menu/updatemenu/${data._id}`,
          payload,
          { withCredentials: true }
        );

        fetchMenuData();
        handleClose();
      } catch (err) {
        console.error("Error updating dish:", err);
      }
    },
  });

  const handleCheckboxChange = (index) => {
    setShowAdvancedOptions((prev) => !prev);
    formik.setFieldValue("quantity", "");
    formik.setFieldValue("unit", "");
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Dish</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="edit_Dish_form" onSubmit={formik.handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Dish Name</Form.Label>
            <Form.Control
              type="text"
              name="dish_name"
              value={formik.values.dish_name}
              onChange={formik.handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dish Price</Form.Label>
            <Form.Control
              type="text"
              name="dish_price"
              value={formik.values.dish_price}
              onChange={formik.handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dish Image</Form.Label>
            <img
              src={`${process.env.REACT_APP_ADMIN_API}/uploads/${formik.values.dish_img}`}
              alt="Current"
              className="img-thumbnail mt-2"
              style={{ maxWidth: "100px" }}
            />
            <Form.Control
              type="file"
              name="dish_img"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                formik.setFieldValue("dish_img", file);
                if (file) setPreviewImg(URL.createObjectURL(file));
              }}
            />
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxWidth: "100px" }}
              />
            )}
          </Form.Group>

          <label htmlFor={`showAdvancedOptions`}>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange()}
              checked={showAdvancedOptions}
              id={`showAdvancedOptions`}
            />{" "}
            Advanced Options
          </label>

          {showAdvancedOptions && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="text"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Unit</Form.Label>
                <Form.Select
                  className="form-control"
                  name="unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Unit</option>
                  <option value="kg">kg</option>
                  <option value="g">g</option>
                  <option value="litre">litre</option>
                  <option value="ml">ml</option>
                </Form.Select>
              </Form.Group>
            </>
          )}

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="dark" type="submit" className="ml-2">
              Update Dish
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditDishModal;
