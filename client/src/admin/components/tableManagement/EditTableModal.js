import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function EditTableModal({ show, handleClose, data, fetchTableData }) {
  const [formData, setFormData] = useState({ table_no: "", max_person: "" });
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (data) {
      setFormData({
        _id: data._id,
        table_no: data.table_no || "",
        max_person: data.max_person || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateTable = async () => {
    if (errors) return;
    console.log(formData);
    try {
      await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/table/updatetable`,
        formData,
        { withCredentials: true }
      );
      handleClose();
      fetchTableData();
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  const checkTableExists = async (area, table_no) => {
    console.log(area, table_no);
    if (!area || !table_no) return;

    if (table_no === data.table_no) {
      setErrors("");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/table/checktable`,
        {
          params: { area, table_no },
          withCredentials: true,
        }
      );

      if (response.data.exists) {
        setErrors("Table number already exists in this area.");
      } else {
        setErrors("");
      }
    } catch (error) {
      console.error("Error checking table existence:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header>
        <Modal.Title>Edit Table</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >
          x
        </button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Table Number</Form.Label>
            <Form.Control
              type="text"
              name="table_no"
              value={formData.table_no}
              onChange={handleChange}
              onBlur={() => checkTableExists(data.area, formData.table_no)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Max Person</Form.Label>
            <Form.Control
              type="number"
              name="max_person"
              value={formData.max_person}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
        {errors && (
          <p className="text-danger mt-2 font-weight-bold">{errors}</p>
        )}
        <div className="mt-4 text-right">
          <Button variant="secondary" onClick={handleClose} className="m-2">
            Cancel
          </Button>
          <Button variant="dark" onClick={updateTable}>
            Save Changes
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditTableModal;
