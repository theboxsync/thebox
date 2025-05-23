import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../style.css";
import Loading from "../../components/Loading";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import QrOrUrl from "./QrOrUrl";
import { Table, Button, Modal, Form } from "react-bootstrap";

const AdminFeedback = () => {
  const [loading, setLoading] = useState(false);
  const [section, setSection] = useState("see");
  const [feedbacks, setFeedbacks] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  // Fetch feedbacks from the backend
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/feedback/getfeedbacks`,
        {
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        setFeedbacks(response.data.feedbacks);
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
    setLoading(false);
  };

  // Delete feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      setLoading(true);
      try {
        await axios.delete(
          `${process.env.REACT_APP_ADMIN_API}/feedback/deletefeedback/${id}`,
          {
            withCredentials: true,
          }
        );
        setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      } catch (error) {
        console.error("Error deleting feedback:", error);
      }
      setLoading(false);
    }
  };

  // Open reply modal
  const handleReply = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyMessage("");
    setShowReplyModal(true);
  };

  // Send reply
  const handleSendReply = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/feedback/replyfeedback/${selectedFeedback._id}`,
        { reply: replyMessage },
        { withCredentials: true }
      );
      setShowReplyModal(false);
      alert("Reply sent successfully!");
    } catch (error) {
      console.error("Error sending reply:", error);
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      {loading && <Loading />}
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <section className="content" id="viewStaff">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3
                          style={{ fontWeight: "bold" }}
                          className="card-title"
                        >
                          Manage Feedbacks
                        </h3>
                        <div className="card-tools">
                          <button
                            type="button"
                            className="btn btn-block btn-dark"
                            id="addStaffBtn"
                            onClick={() => {
                              section === "see"
                                ? setSection("qr")
                                : setSection("see");
                            }}
                          >
                            <img src="../dist/img/icon/add.svg" /> Feedback QR
                          </button>
                        </div>
                      </div>
                      {section === "see" && (
                        <div>
                          <h2 className="text-center mt-3">
                            Feedback Management
                          </h2>
                          <div className="m-3">
                            <Table striped bordered hover className="">
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Customer Name</th>
                                  <th>Email</th>
                                  <th>Phone</th>
                                  <th>Rating</th>
                                  <th>Feedback</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {feedbacks.length > 0 ? (
                                  feedbacks.map((feedback, index) => (
                                    <tr key={feedback._id}>
                                      <td>{index + 1}</td>
                                      <td>{feedback.customer_name}</td>
                                      <td>
                                        {feedback.customer_email || "N/A"}
                                      </td>
                                      <td>
                                        {feedback.customer_phone || "N/A"}
                                      </td>
                                      <td>{feedback.rating}</td>
                                      <td>{feedback.feedback}</td>
                                      <td>
                                        <Button
                                          variant="danger"
                                          size="sm"
                                          onClick={() =>
                                            handleDelete(feedback._id)
                                          }
                                        >
                                          Delete
                                        </Button>{" "}
                                        <Button
                                          variant="primary"
                                          size="sm"
                                          onClick={() => handleReply(feedback)}
                                        >
                                          Reply
                                        </Button>
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="7" className="text-center">
                                      No feedback available.
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </div>
                      )}

                      {section === "qr" && (
                        <div className="d-flex justify-content-center m-5">
                          <QrOrUrl />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Reply Modal */}
        <Modal
          show={showReplyModal}
          onHide={() => setShowReplyModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Reply to Feedback</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Reply Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Write your reply here..."
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowReplyModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSendReply}>
              Send Reply
            </Button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </div>
  );
};

export default AdminFeedback;
