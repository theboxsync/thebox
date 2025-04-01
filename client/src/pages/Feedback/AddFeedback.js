import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import axios from "axios";
import ThankYouModal from "./ThankYouModal";

const AddFeedback = () => {
  const { token } = useParams(); // Extract the token from the URL

  const [feedbackData, setFeedbackData] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    rating: "",
    feedback: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/feedback/addfeedback`,
        { ...feedbackData, feedbackToken: token }, // Include feedbackToken
        { withCredentials: true }
      );
      console.log("Feedback data:", token); 

      if (response.data.success) {
        console.log("Feedback submitted successfully");
        setShowModal(true);
        setFeedbackData({
          customer_name: "",
          customer_email: "",
          customer_phone: "",
          rating: "",
          feedback: "",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="customer_name"
            value={feedbackData.customer_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="customer_email"
            value={feedbackData.customer_email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="customer_phone"
            value={feedbackData.customer_phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating (1-5)</label>
          <select
            className="form-control"
            name="rating"
            value={feedbackData.rating}
            onChange={handleChange}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Feedback</label>
          <textarea
            className="form-control"
            name="feedback"
            rows="4"
            value={feedbackData.feedback}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Feedback
        </button>
      </form>

      {/* Thank You Modal */}
      <ThankYouModal show={showModal} handleClose={() => setShowModal(false)} />
    </div>
  );
};

export default AddFeedback;
