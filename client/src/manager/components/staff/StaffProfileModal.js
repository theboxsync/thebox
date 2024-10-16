import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import axios from "axios";


function StaffProfileModal({ show, handleClose, staffId }) {
  const [staffData, setStaffData] = useState({});
  useEffect(() => {
    console.log(staffId);
    // async function fetchStaffData() {
    //   try {
    //     const response = await axios.get(
    //       `${process.env.REACT_APP_MANAGER_API}/staffdata/${staffId}`,
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     setStaffData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching staff data:", error);
    //   }
    // }

    // fetchStaffData();
  }, []);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src="../../Logo/GJ0001.webp"
            style={{ width: 128, height: 128 }}
            alt="User Image"
          />
          <p style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
            Pranay
          </p>
        </div>
        <div className="">
          <Table responsive>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Staff ID</td>
                <td>0001</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Birthdate</td>
                <td>23-05-2002</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Address</td>
                <td>Tavra, Bharuch, Gujarat</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Phone No</td>
                <td>8980117634</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Email</td>
                <td>pranaygohil2@gmail.com</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Joining Date</td>
                <td>01-03-2024</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Position</td>
                <td>Owner</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Salary</td>
                <td>100000</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Document Type</td>
                <td>National Identity Card</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>ID Card Number</td>
                <td>159515951159</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          <img src="../dist/img/icon/cancel.svg" alt="Cancel" /> Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StaffProfileModal;
