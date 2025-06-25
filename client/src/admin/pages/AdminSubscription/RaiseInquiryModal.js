import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

function RaiseInquiryModal({ show, handleClose, subscriptionName }) {
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);
    const [purpose, setPurpose] = useState("");

    // Reset whenever you open/close
    useEffect(() => {
        if (!show) setMessage("");
        setPurpose("Against Blocked Subscription: " + subscriptionName);
    }, [show]);

    const submitInquiry = async () => {
        if (!message.trim()) return;
        setSaving(true);
        try {
            await axios.post(
                `${process.env.REACT_APP_ADMIN_API}/customerquery/addquery`,
                { message, purpose },
                { withCredentials: true }
            );
            // you might want to show a toast here
            handleClose();
        } catch (err) {
            console.error("Error raising inquiry:", err);
            alert("Failed to send inquiry. Try again.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Raise Inquiry</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="inquiryMessage">
                        <Form.Label>Your message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Describe your issue…"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} disabled={saving}>
                    Cancel
                </Button>
                <Button
                    variant="dark"
                    onClick={submitInquiry}
                    disabled={saving || !message.trim()}
                >
                    {saving ? "Sending…" : "Send Inquiry"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RaiseInquiryModal;
