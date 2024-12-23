import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function PaymentModal({ show, handleClose, paymentData, setPaymentData, orderController }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (!paymentData.paidAmount || paymentData.paidAmount <= 0) {
      setErrorMessage("Paid amount is required and must be greater than 0.");
      return;
    }

    setErrorMessage(""); // Clear any previous error messages
    orderController("Paid");
    handleClose(); // Close the modal after successful submission
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Paid Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter paid amount"
              value={paymentData.paidAmount}
              onChange={(e) =>
                setPaymentData({ ...paymentData, paidAmount: e.target.value })
              }
            />
            {errorMessage && (
              <Form.Text className="text-danger">{errorMessage}</Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Payment Type</Form.Label>
            <div>
              <Form.Check
                inline
                type="radio"
                label="Cash"
                name="paymentType"
                value="Cash"
                checked={paymentData.paymentType === "Cash"}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, paymentType: e.target.value })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="UPI"
                name="paymentType"
                value="UPI"
                checked={paymentData.paymentType === "UPI"}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, paymentType: e.target.value })
                }
              />
              <Form.Check
                inline
                type="radio"
                label="Card"
                name="paymentType"
                value="Card"
                checked={paymentData.paymentType === "Card"}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, paymentType: e.target.value })
                }
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit Payment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PaymentModal;
