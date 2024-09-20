import React from "react";

import Header from "../../components/Header";
import MenuBar from "../../components/MenuBar";
import Navbar from "../../components/NavBar";
import "./restaurant-feedback.css";
import Footer from "../../components/Footer";

export default function RestaurantFeedback() {
  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>
        <Header />
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Manage Feedback</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="container-fluid table-responsive">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Feedback</th>
                        <th>Reply</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Rushi</td>
                        <td>rushi01234@gmail.com</td>
                        <td>Delicious Food</td>
                        <td>Thank you</td>
                        <td>
                          <i
                            className="fas fa-star"
                            style={{ color: "gold" }}
                          ></i>
                          <i
                            className="fas fa-star"
                            style={{ color: "gold" }}
                          ></i>
                          <i
                            className="fas fa-star"
                            style={{ color: "gold" }}
                          ></i>
                          <i
                            className="fas fa-star"
                            style={{ color: "gold" }}
                          ></i>
                          <i
                            className="fas fa-star"
                            style={{ color: "gold" }}
                          ></i>
                        </td>
                        <td>
                          <button
                            className="btn bg-transparent reply_feedback_btn"
                            data-toggle="modal"
                            data-target="#replyFeedbackModal"
                            title="Reply"
                          >
                            <img src="../dist/img/reply-b.svg" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="replyFeedbackModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="replyFeedbackModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="replyFeedbackModalLabel">
                    Restaurant Feedback Reply
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form
                    className="needs-validation"
                    id="feedback-reply-form"
                    autocomplete="off"
                    novalidate
                  >
                    <input
                      type="hidden"
                      name="email"
                      id="reply_feedback_email"
                    />
                    <div className="form-group">
                      <label className="form-label" htmlFor="address">
                        Enter Reply here
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="3"
                        required
                      ></textarea>
                      <label className="invalid-feedback">
                        Please enter a valid Message
                      </label>
                    </div>
                    <button
                      type="button"
                      id="reply_send"
                      className="btn btn-dark"
                    >
                      <i className="fab fa-telegram-plane"></i> Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
