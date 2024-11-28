import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";

function StaffProfileModal({ show, handleClose, data, deletestaff }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <img
            src={`${process.env.REACT_APP_ADMIN_API}/uploads/staff/profile/${data.photo}`}
            style={{ width: 128, height: 128 }}
            alt="Staff Image"
          />
          <div
            className="mt-3"
            style={{ color: "black", fontSize: 18, fontWeight: "bold" }}
          >
            {data.f_name + " " + data.l_name}
          </div>
          <div
            className="mb-3"
            style={{ color: "black", fontSize: 14, fontWeight: "bold" }}
          >
            ({data.position})
          </div>
        </div>
        <div className="">
          <Table responsive>
            <tbody>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Staff ID</td>
                <td>{data.staff_id}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Birthdate</td>
                <td>{data.birth_date}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Address</td>
                <td>{data.address}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Phone No</td>
                <td>{data.phone_no}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Email</td>
                <td>{data.email}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Joining Date</td>
                <td>{data.joining_date}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Position</td>
                <td>{data.position}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>Salary</td>
                <td>{data.salary}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>
                  Document Type
                </td>
                <td>{data.document_type}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", width: 200 }}>
                  ID Card Number
                </td>
                <td>{data.id_number}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          <img src="../dist/img/icon/cancel.svg" alt="Cancel" /> Cancel
        </Button>
        <Link to={`/staff/update/${data._id}`}>
          <Button variant="dark">
            <img src="../dist/img/icon/edit.svg" alt="Edit" /> Edit
          </Button>
        </Link>
        <Button
          variant="dark"
          onClick={() => {
            deletestaff();
          }}
        >
          <img src="../dist/img/icon/delete.svg" alt="Delete" /> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StaffProfileModal;
