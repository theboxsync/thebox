import React from "react";
import { Button, Modal } from "react-bootstrap";

function TableAddedModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Body>
        <div className="mb-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-success"
            width={75}
            height={75}
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </div>
        <h5 style={{ color: "black" }}>Table added</h5>
        <div className="text-center">
          <Button variant="dark" onClick={handleClose} id="done">
            Done
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default TableAddedModal;
