import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function EditTableModal({ show, handleClose, data, fetchTableData }) {
    const [formData, setFormData] = useState({ table_no: "", max_person: "" });

    useEffect(() => {
        if (data) {
            setFormData({
                _id: data._id,
                table_no: data.table_no || "",
                max_person: data.max_person || ""
            });
        }
    }, [data]);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const updateTable = async () => {
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

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Table</Modal.Title>
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
                <div className="mt-4 d-flex justify-content-end">
                    <Button variant="secondary" onClick={handleClose} className="me-2">
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
