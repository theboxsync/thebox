import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export default function Contact({ websiteSettings }) {
  return (
    <div>
      <section id="contact" className="contact section">
        {/* Section Title */}
        <div
          className="container section-title aos-init aos-animate"
          data-aos="fade-up"
        >
          <h1>Contact Us </h1>
        </div>
        {/* End Section Title */}
        <div
          className="container aos-init aos-animate"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="row gy-4 mt-4">
            <div className="col-lg-4">
              <div
                className="info-item d-flex aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <div>
                  <h3>Location</h3>
                  <p>{websiteSettings.restaurant_address}</p>
                </div>
              </div>
              {/* End Info Item */}
              <div
                className="info-item d-flex aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <FontAwesomeIcon icon={faClock} />

                <div>
                  <h3>Open Hours</h3>
                  <p>
                    {websiteSettings.open_days}
                    <br />
                    {websiteSettings.open_time_from} - {websiteSettings.open_time_to}
                  </p>
                </div>
              </div>
              {/* End Info Item */}
              <div
                className="info-item d-flex aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay={400}
              >
                <FontAwesomeIcon icon={faPhone} />
                <div>
                  <h3>Call Us</h3>
                  <p>{websiteSettings.contact_phone}</p>
                </div>
              </div>
              {/* End Info Item */}
              <div
                className="info-item d-flex aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay={500}
              >
                <FontAwesomeIcon icon={faEnvelope} />
                <div>
                  <h3>Email Us</h3>
                  <p>{websiteSettings.contact_email}</p>
                </div>
              </div>
              {/* End Info Item */}
            </div>
            <div className="col-lg-8">
              <form
                className="php-email-form aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                <div className="row gy-4">
                  <div className="col-md-6">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="col-md-6 ">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={6}
                      placeholder="Message"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-md-12 text-center">
                    {/* <div class="loading">Loading</div>
                                    <div class="error-message"></div>
                                    <div class="sent-message">Your message has been sent. Thank you!</div> */}
                    <button type="submit">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            {/* End Contact Form */}
          </div>
        </div>
      </section>
      <section className="spicekitchen">
        <hr />
        <div className="text-center" style={{ color: "white" }}>
          <img src="dist/images/restu-logo.png" alt="logo" />
          SPICE KITCHEN
        </div>
        <hr />
      </section>
    </div>
  );
}
