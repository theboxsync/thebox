import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to store OTP digits
  const [otpSent, setOtpSent] = useState(false); // Flag to track if OTP has been sent
  const [resendTimeout, setResendTimeout] = useState(30); // Countdown for resend OTP

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e, index) => {
    const value = e.target.value;

    // Allow only numbers and update the OTP array
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input if the current one is filled
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsOtpVisible(true); // Show OTP section and hide mobile input
    setOtpSent(true); // Mark OTP as sent
    setResendTimeout(30); // Reset the resend timer to 30 seconds

    // Simulate sending OTP (you can replace this with an API call to send OTP)
    console.log("OTP Sent");
  };

  const handleOtpVerification = () => {
    const otpCode = otp.join(""); // Join the OTP array to a single string
    if (otpCode.length === 4) {
      alert("OTP Verified!");
      // Add actual OTP verification logic here (e.g., API calls)
    } else {
      alert("Invalid OTP");
    }
  };

  const handleResendOtp = () => {
    if (!otpSent) return; // Don't resend OTP if it hasn't been sent yet
    if (resendTimeout > 0) return; // Don't allow resending OTP if time hasn't passed

    // Simulate resending OTP (replace with an actual API call)
    console.log("Resending OTP");
    setOtpSent(false); // Reset OTP sent status
    setOtp(["", "", "", ""]); // Clear OTP fields
    setResendTimeout(30); // Reset the resend timer to 30 seconds
  };

  // Countdown for the Resend OTP timer
  React.useEffect(() => {
    if (resendTimeout === 0) return;
    const timer = setInterval(() => {
      setResendTimeout((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimeout]);

  return (
    <>
      <FontAwesomeIcon
        icon={faUser}
        className="user_link"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{ borderBottom: "none" }}
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="content1" id="quickenquire">
            <h3 style={{ textAlign: "center" }} className="mb-3">
              LOGIN
            </h3>
            <form onSubmit={handleSubmit}>
              {/* Mobile number input */}
              {!isOtpVisible && (
                <div>
                  <h6 htmlFor="name">Mobile Number</h6>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter phone number"
                    maxLength="10"
                  />
                  {/* Only show button when phone number is 10 digits long */}
                  <div>
                    {inputValue.length === 10 && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSubmit}
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* OTP Verification Section */}
              {isOtpVisible && (
                <div className="otp-verified">
                  <h1 className="verification">OTP Verification</h1>
                  <p className="digit">
                    Enter the 4-digit code sent to your device
                  </p>
                  <div className="otp-input-container">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        value={digit}
                        onChange={(e) => handleInputChange(e, index)}
                        maxLength="1"
                        className="otp-block"
                      />
                    ))}
                  </div>
                  <div className="text-center p-2">
                    {" "}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleOtpVerification}
                    >
                      Verify OTP
                    </button>
                    {/* Resend OTP button */}
                    {otpSent && resendTimeout === 0 && (
                      <button
                        type="button"
                        className="btn btn-secondary ms-3"
                        onClick={handleResendOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>

                  {resendTimeout > 0 && (
                    <p>Resend OTP in {resendTimeout} seconds</p>
                  )}
                </div>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
