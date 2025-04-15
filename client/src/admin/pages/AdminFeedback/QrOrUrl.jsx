import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { QRCodeSVG } from "qrcode.react";

const QrOrUrl = () => {
  const [feedbackToken, setFeedbackToken] = useState("");
  const qrCodeRef = useRef(null);

  const { user, userSubscriptions, activePlans } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
        setFeedbackToken(user.feedbackToken);
    }
  }, []);
  const generateFeedbackQR = async () => {
    if (!activePlans.includes("Feedback")) {
      return alert(
        "You need to buy or renew to Feedback plan to access this page."
      );
    }
    console.log("Generating feedback token...");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/feedback/generate-feedback-token`,
        {},
        { withCredentials: true }
      );
      setFeedbackToken(response.data.feedbackToken);
      console.log("Feedback token:", response.data.feedbackToken);
    } catch (error) {
      console.error("Error generating feedback token:", error);
      console.log(error);
    }
  };

  const printQRCode = () => {
    const printContent = qrCodeRef.current.innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
          <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { text-align: center; font-family: Arial, sans-serif; }
              .qr-container { padding: 20px; }
              .qr-container h2 { font-size: 18px; margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h2 style="margin-bottom: 25px;">Scan the QR Code to Give Feedback</h2>
              ${printContent}
            </div>
          </body>
          </html>
        `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };
  return (
    <div>
      {activePlans.includes("Feedback") && (
        <div className="d-flex flex-column align-items-center">
          <h3 className="mb-3" style={{ fontWeight: "bold" }}>
            Feedback QR Code
          </h3>
          <button className="btn btn-primary" onClick={generateFeedbackQR}>
            Create New Feedback QR
          </button>

          {feedbackToken && (
            <div className="mt-5">
              <p className="text-center">Scan the QR code to give feedback:</p>
              <div ref={qrCodeRef}>
                <QRCodeSVG
                  size={300}
                  value={`${process.env.REACT_APP_URL}/feedback/${feedbackToken}`}
                />
              </div>
            </div>
          )}

          {feedbackToken && (
            <button className="btn btn-secondary mt-5" onClick={printQRCode}>
              Print QR Code
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QrOrUrl;
