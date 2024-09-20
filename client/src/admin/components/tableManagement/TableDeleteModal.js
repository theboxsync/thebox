import React from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

function TableDeleteModal({ show, handleClose, data, fetchTableData }) {
  const deleteTable = async () => {
    try {
      const response = await axios.delete(
        `http://admin.localhost:3001/api/deletetable/${data.id}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      handleClose();
      fetchTableData();
    } catch (error) {
      console.log("Error deleting table:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Delete Table</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Are you sure you want to delete this Table?</h5>
        <div>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{ marginRight: 20 }}
          >
            <img src="../../dist/img/icon/cancel.svg" alt="Cancel" /> Cancel
          </Button>
          <Button variant="dark" id="delete_c_btn" onClick={deleteTable}>
            <img src="../../dist/img/icon/delete.svg" alt="Delete" /> Delete
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TableDeleteModal;
