import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function EditPresentModal({ show, handleClose, staffId, date, fetchStaff }) {
  const [checkinTime, setCheckinTime] = useState("");
  const [checkoutTime, setCheckoutTime] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/staff/updateattendance`,
        {
          staff_id: staffId,
          date: date,
          in_time: checkinTime,
          out_time: checkoutTime,
        },
        { withCredentials: true }
      );
      fetchStaff();
      handleClose();
    } catch (error) {
      console.error("Failed to update attendance", error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Edit Present</Modal.Title>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        >x</button>
      </Modal.Header>
      <Form id="editPresentForm">
        <Modal.Body>
          <input type="hidden" id="staff_id_modal" name="staff_id" />
          <input type="hidden" id="day_modal" name="day" />
          <Row>
            <Col md={6}>
              <Form.Group controlId="checkin_time_modal">
                <Form.Label>Check-in Time</Form.Label>
                <Form.Control
                  type="time"
                  name="checkin_time"
                  value={checkinTime}
                  onChange={(e) => setCheckinTime(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="checkout_time_modal">
                <Form.Label>Check-out Time</Form.Label>
                <Form.Control
                  type="time"
                  name="checkout_time"
                  value={checkoutTime}
                  onChange={(e) => setCheckoutTime(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <img src="../dist/img/icon/cancel.svg" alt="Close" /> Close
          </Button>
          <Button variant="dark" onClick={handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditPresentModal;
