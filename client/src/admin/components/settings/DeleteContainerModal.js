import axios from "axios";
import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteContainerModal({
  show,
  handleClose,
  data,
  resetdata,
  fetchUserData,
  setContainerCharges,
  containerCharges,
}) {
  const deleteContainer = async (index) => {
    console.log("Deleting container charge with index:", index);
    try {
      await axios.delete(
        `${process.env.REACT_APP_ADMIN_API}/charge/delete-container-charge`,
        { data: { index }, withCredentials: true }
      );
      setContainerCharges(containerCharges.filter((_, i) => i !== index));
      fetchUserData();
      resetdata();
      handleClose();
    } catch (error) {
      console.log("Error deleting container charge:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="deleteContainerModalLabel">
          Delete Continer
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>
          Are you sure you want to delete <strong>{data.name} - {data.size}</strong>{" "}
          Container?
        </h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          <img src="../../dist/img/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Button variant="dark" onClick={() => deleteContainer(data.index)}>
          <img src="../../dist/img/delete.svg" alt="Delete" /> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteContainerModal;
