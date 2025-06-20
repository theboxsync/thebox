import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import * as faceapi from "face-api.js";
import Webcam from "react-webcam";
import { Modal } from "react-bootstrap";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

export default function AttendanceDashboard() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [userData, setUserData] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detectedStaff, setDetectedStaff] = useState(null);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [detecting, setDetecting] = useState(false);

  const getTodayDate = () => {
    const today = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const [day, month, year] = today
      .toLocaleDateString("en-IN", options)
      .split("/");

    return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
  };

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // "HH:MM"
  };

  // Load user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ATTENDANCE_API}/user/userdata`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "Null") navigate("/login");
      else setUserData(response.data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  // Load face-api models
  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    setModelsLoaded(true);
  };

  // Fetch all staff face encodings
  const fetchStaffEncodings = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_ATTENDANCE_API}/staff/face-data`,
        {
          withCredentials: true,
        }
      );
      console.log("Staff Face Data:", res.data);
      setStaffList(res.data); // Each item must have: _id, f_name, l_name, face_encoding
    } catch (error) {
      console.error("Error fetching staff face data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    loadModels();
    fetchStaffEncodings();
  }, []);

  const handleFaceDetection = async () => {
    console.log("Detecting face...");
    try {
      setDetecting(true);
      const screenshot = webcamRef.current.getScreenshot();
      const image = await faceapi.fetchImage(screenshot);

      const detection = await faceapi
        .detectSingleFace(image, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) return alert("No face detected. Please try again.");

      const queryDescriptor = detection.descriptor;

      const labeledDescriptors = staffList.map((staff) => {
        const floatDesc = new Float32Array(staff.face_encoding);
        return new faceapi.LabeledFaceDescriptors(
          `${staff._id}|${staff.f_name} ${staff.l_name}`,
          [floatDesc]
        );
      });

      const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.5);
      const match = faceMatcher.findBestMatch(queryDescriptor);

      if (match.label === "unknown") {
        setDetectedStaff(null);
        alert("No matching staff found.");
      } else {
        console.log("Detected staff:", match.label);
        const [id] = match.label.split("|");
        const matchedStaff = staffList.find((s) => s._id === id);
        console.log("Matched staff:", matchedStaff);
        setDetectedStaff(matchedStaff);
      }
    } catch (err) {
      console.error(err);
      alert("Face detection failed.");
    } finally {
      setDetecting(false);
      setShowCameraModal(false);
    }
  };

  const isCheckedInToday = (attendanceList) => {
    const today = new Date().toISOString().split("T")[0];
    return attendanceList?.some(
      (a) => a.date === today && a.in_time && !a.out_time
    );
  };

  const handleCheckIn = async (staffId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ATTENDANCE_API}/staff/checkin`,
        {
          staff_id: staffId,
          date: getTodayDate(),
          in_time: getCurrentTime(),
        },
        { withCredentials: true }
      );
      alert("Check-in successful!");
      fetchStaffEncodings(); // Refresh state
      setDetectedStaff(null);
    } catch (error) {
      console.error("Check-in failed:", error);
      alert("Check-in failed");
    }
  };

  const handleCheckOut = async (staffId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_ATTENDANCE_API}/staff/checkout`,
        {
          staff_id: staffId,
          date: getTodayDate(),
          out_time: getCurrentTime(),
        },
        { withCredentials: true }
      );
      alert("Check-out successful!");
      fetchStaffEncodings();
      setDetectedStaff(null);
    } catch (error) {
      console.error("Check-out failed:", error);
      alert("Check-out failed");
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper p-2">
        <div className="content-header">
          <div className="container-fluid"></div>
        </div>

        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <h3 className="card-title">Attendance Panel</h3>
          </div>

          <div className="card-body text-center">
            <div className="m-3 fw-bold">Face Attendance</div>

            <button
              className="btn btn-primary"
              onClick={() => setShowCameraModal(true)}
              disabled={!modelsLoaded}
            >
              Open Camera
            </button>

            {detectedStaff && (
              <div className="mt-4 p-3 border rounded bg-light">
                <h5 className="text-success">Staff Identified:</h5>
                <p>
                  <strong>Name:</strong> {detectedStaff.f_name}{" "}
                  {detectedStaff.l_name}
                </p>
                <p>
                  <strong>Email:</strong> {detectedStaff.email}
                </p>
                <p>
                  <strong>Position:</strong> {detectedStaff.position}
                </p>

                {isCheckedInToday(detectedStaff.attandance) ? (
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleCheckOut(detectedStaff._id)}
                  >
                    Check Out
                  </button>
                ) : (
                  <button
                    className="btn btn-success mt-2"
                    onClick={() => handleCheckIn(detectedStaff._id)}
                  >
                    Check In
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>

      {/* 📷 Modal Camera */}
      <Modal
        show={showCameraModal}
        onHide={() => setShowCameraModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Face Capture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="rounded border"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              aspectRatio: "4/3",
            }}
          />
          <button
            className="btn btn-success mt-3"
            disabled={detecting}
            onClick={handleFaceDetection}
          >
            {detecting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Detecting...
              </>
            ) : (
              "Detect Face"
            )}
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
