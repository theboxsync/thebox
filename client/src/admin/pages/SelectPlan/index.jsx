import { useState } from "react";
import axios from "axios";
import { MdOutlineCheckCircleOutline, MdOutlineCancel } from "react-icons/md";


import "../../../style.css";

import Footer from "../../components/Footer";

const SelectPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    console.log(selectedPlan);
    setShowModal(true); // show modal
  };

  const handleConfirm = async () => {
    setShowModal(false);
    const response = await axios.post(
      `${process.env.REACT_APP_ADMIN_API}/subscription/buycompleteplan`,
      { planType: selectedPlan },
      { withCredentials: true }
    );
    if (response.data.success) {
      console.log(response.data.subscriptions);
      window.location.href = `${process.env.REACT_APP_ADMIN_URL}/`;
    } else {
      alert(response.data.message);
    }
  };

  return (
    <>
      <div className="container py-5 w-100">
        <div className="text-center mb-4">
          <h2 className="fw-bold">
            Value-packed featured at Wallet-friendly cost
          </h2>
          <p className="text-muted">
            No hidden costs & no additional charges. Just transparent &
            affordable pricing.
          </p>
        </div>

        <div className="container my-5">
          {/* <h2 className="text-center mb-4">Pricing Plans</h2> */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle text-center">
              <thead className="table-secondary">
                <tr>
                  <th scope="col" style={{ position: "relative" }}>
                    <p style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                      Key Features
                    </p>
                  </th>
                  <th scope="col">
                    Core Plan
                    <br />
                    10000 ₹ / year
                    <br />
                    <button
                      type="button"
                      className="btn btn-primary btn-sm my-3 px-3 py-2"
                      onClick={() => handlePlanSelect("Core")}
                    >
                      Select Plan
                    </button>
                  </th>
                  <th scope="col">
                    Growth Plan
                    <br />
                    15000 ₹ / year
                    <br />
                    <button
                      className="btn btn-primary btn-sm my-3 px-3 py-2"
                      onClick={() => handlePlanSelect("Growth")}
                    >
                      Select Plan
                    </button>
                  </th>
                  <th scope="col">
                    Scale Plan
                    <br />
                    20000 ₹ / year
                    <br />
                    <button
                      className="btn btn-primary btn-sm my-3 px-3 py-2"
                      onClick={() => handlePlanSelect("Scale")}
                    >
                      Select Plan
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4" className="text-center bg-secondary" style={{ fontWeight: "bold" }}>Basic</td>
                </tr>
                <tr>
                  <td>Menu management</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Multi-terminal billing</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Inventory module</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Third-party integrations</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>In-built CRM</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Central kitchen module</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Unlimited cash register</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Unlimited-user rights</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Reports</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>

                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4" className="text-center bg-secondary" style={{ fontWeight: "bold" }}>Add-ons</td>
                </tr>
                <tr>
                  <td>QSR</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Captain panel</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Staff management</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Feedback management</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Scan For Menu</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Restaurant website</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Online order reconciliation</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Reservation manager</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>

                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4" className="text-center bg-secondary" style={{ fontWeight: "bold" }}>Advanced Features</td>
                </tr>
                <tr>
                  <td>Payroll By TheBox</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Dynamic reports</td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCancel style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>

                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4" className="text-center bg-secondary" style={{ fontWeight: "bold" }}>Support & Training</td>
                </tr>
                <tr>
                  <td>24x7 Support</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
                <tr>
                  <td>Free Training</td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                  <td><MdOutlineCheckCircleOutline style={{ fontSize: "25px" }} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* modal for confirmation */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
            tabIndex={-1}
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Plan Selection</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    Are you sure you want to select{" "}
                    <strong>{selectedPlan}</strong>?<br />
                    You will be redirected to the checkout page.
                  </p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleConfirm}>
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div style={{ position: "relative", bottom: "0", width: "100%" }}>
        <footer className="main-footer text-center" style={{ position: "absolute", width: "100%", left: "0", marginLeft: "0" }} >
          <strong>
            Designed By{" "}
            <a href="https://www.digitaltripolystudio.com/">
              Digital Tripoly Studio
            </a>
          </strong>{". "}
          All rights reserved.
          <div className="float-right d-none d-sm-inline-block"></div>
        </footer>
      </div>
    </>
  );
};

export default SelectPlan;
