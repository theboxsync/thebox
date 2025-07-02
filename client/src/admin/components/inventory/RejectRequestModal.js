import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

import Loading from "../Loading";

function RejectRequestModal({ show, handleClose, id, fetchInventoryData }) {
  const [Loading, setLoading] = useState(false);
  const rejectInventory = () => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_ADMIN_API}/inventory/rejectinventoryrequest/${id}`,
        null,
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Inventory rejected:", res.data);
        handleClose(); // Close the modal
        fetchInventoryData(); // Refresh the inventory list
      })
      .catch((err) => {
        console.error("Error rejecting inventory:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  if (Loading) return <Loading />;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Reject Inventory</Modal.Title>
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
        Are you sure you want to reject this inventory request?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={rejectInventory}>
          <img src="../../dist/img/delete.svg" alt="Delete" className="mx-1" />
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RejectRequestModal;
