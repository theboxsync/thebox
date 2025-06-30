import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function PaymentModal({
  show,
  handleClose,
  paymentData,
  setPaymentData,
  orderController,
  taxRates,
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [discountType, setDiscountType] = useState("amount"); // Default discount type

  const calculateTaxes = () => {
    const subtotal = parseFloat(paymentData.subTotal) || 0;
    const cgstAmount = (subtotal * taxRates.cgst || 0) / 100;
    const sgstAmount = (subtotal * taxRates.sgst || 0) / 100;
    const total = subtotal + cgstAmount + sgstAmount;
    return {
      cgstAmount: cgstAmount.toFixed(2),
      sgstAmount: sgstAmount.toFixed(2),
      total: total.toFixed(2),
    };
  };

  const { cgstAmount, sgstAmount, total } = calculateTaxes();

  const handleDiscountChange = (value) => {
    let updatedPaidAmount = total;
    const discountValue = parseFloat(value) || 0;

    if (discountType === "amount") {
      updatedPaidAmount = total - discountValue;
    } else if (discountType === "percentage") {
      const discountAmount = (total * discountValue) / 100;
      updatedPaidAmount = total - discountAmount;
    }

    setPaymentData({
      ...paymentData,
      discountAmount: value,
      paidAmount: updatedPaidAmount > 0 ? updatedPaidAmount.toFixed(2) : "0.00",
    });
  };

  const handlePaidAmountChange = (value) => {
    const paidAmount = parseFloat(value) || 0;

    if (paidAmount < total) {
      const remainingDiscount = (total - paidAmount).toFixed(2);
      setPaymentData({
        ...paymentData,
        paidAmount: value,
        discountAmount: remainingDiscount,
      });
    } else {
      setPaymentData({
        ...paymentData,
        paidAmount: value,
        discountAmount: "0.00",
      });
    }
  };

  const handleSubmit = () => {
    if (
      (!paymentData.paidAmount || parseFloat(paymentData.paidAmount) <= 0) &&
      total <= 0
    ) {
      setErrorMessage("Paid amount is required and must be greater than 0.");
      return;
    }

    if (!paymentData.paidAmount) {
      paymentData.paidAmount = total;
    }

    const updatedPaymentData = {
      ...paymentData,
      subTotal: parseFloat(paymentData.subTotal).toFixed(2),
      total,
    };

    console.log("Updated Payment Data:", updatedPaymentData);

    setErrorMessage(""); // Clear any previous error messages
    orderController("Paid", updatedPaymentData);
    handleClose(); // Close the modal after successful submission
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Payment</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Subtotal</Form.Label>
            <Form.Control
              type="text"
              readOnly
              value={`₹ ${parseFloat(paymentData.subTotal || 0).toFixed(2)}`}
            />
          </Form.Group>
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>CGST ({taxRates.cgst}%)</Form.Label>
              <Form.Control type="text" readOnly value={`₹ ${cgstAmount}`} />
            </Form.Group>
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>SGST ({taxRates.sgst}%)</Form.Label>
              <Form.Control type="text" readOnly value={`₹ ${sgstAmount}`} />
            </Form.Group>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Total</Form.Label>
            <Form.Control type="text" readOnly value={`₹ ${total}`} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discount</Form.Label>
            <div className="d-flex">
              <Form.Check
                inline
                type="radio"
                label="Amount"
                name="discountType"
                value="amount"
                checked={discountType === "amount"}
                onChange={() => setDiscountType("amount")}
              />
              <Form.Check
                inline
                type="radio"
                label="Percentage"
                name="discountType"
                value="percentage"
                checked={discountType === "percentage"}
                onChange={() => setDiscountType("percentage")}
              />
            </div>
            <Form.Control
              type="number"
              placeholder="Enter discount"
              value={paymentData.discountAmount}
              onChange={(e) => handleDiscountChange(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Paid Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter paid amount"
              value={paymentData.paidAmount || total}
              onChange={(e) => handlePaidAmountChange(e.target.value)}
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
                  setPaymentData({
                    ...paymentData,
                    paymentType: e.target.value,
                  })
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
                  setPaymentData({
                    ...paymentData,
                    paymentType: e.target.value,
                  })
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
                  setPaymentData({
                    ...paymentData,
                    paymentType: e.target.value,
                  })
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
