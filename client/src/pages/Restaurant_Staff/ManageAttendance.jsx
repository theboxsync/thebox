import React from "react";
import "../../style.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/NavBar";

import MenuBar from "../../components/MenuBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import EditPresentModal from "../../components/staff/EditPresentModal";
import EditAbsentModal from "../../components/staff/EditAbsentModal";

export default function ManageAttendance() {
  const [editPresentModalShow, setEditPresentModalShow] = React.useState(false);
  const [editAbsentModalShow, setEditAbsentModalShow] = React.useState(false);

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
        {/* Header */}
        <Header />
        {/* /.content */}

        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Manage Staff</h3>
                    <div className="card-tools mx-2">
                      <Link to={"/staff"}>
                        <button
                          type="button"
                          className="btn btn-block btn-dark"
                        >
                          <img src="../dist/img/icon/view.svg" /> View Staff
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="container-fluid" style={{ overflowX: "scroll" }}>
                <div className="container">
                  <h5>Date : 19-03-2024</h5>
                </div>
                <hr
                  style={{ height: 1, backgroundColor: "grey", border: "none" }}
                />
                <div id="staff_atten_info">
                  <div id="staff_info">
                    <table
                      className="table table-bordered table-striped"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th className="col-md-2">Staff Id</th>
                          <th className="col-md-2">Name</th>
                          <th className="col-md-2">Position</th>
                          <th className="col-md-2">Attendance</th>
                          <th className="col-md-2">View Attendance</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>0 </td>
                          <td>Pranay Gohil </td>
                          <td>Owner </td>
                          <td>
                            <div className="d-flex justify-content-around">
                              <button
                                className="btn btn-dark"
                                type="button"
                                name="checkin_done"
                                onclick="checkin_done()"
                              >
                                Checkin
                              </button>
                              <button
                                className="btn btn-dark"
                                type="button"
                                name="checkout_done"
                                onclick="checkout_done()"
                              >
                                Checkout
                              </button>
                              <button
                                className="btn btn-dark"
                                type="button"
                                name="absent_done"
                                onclick="absent_done()"
                              >
                                Absent
                              </button>
                            </div>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-dark"
                              id="edit_att_btn_0"
                              style={{ width: 150 }}
                            >
                              Edit Attendance
                            </button>
                            <button
                              className="btn btn-secondary"
                              id="hide_att_btn_0"
                              style={{ width: 150, display: "none" }}
                            >
                              Hide Edit{" "}
                            </button>
                          </td>
                        </tr>
                        <tr></tr>
                      </tbody>
                    </table>
                    <table
                      className="table table-bordered table-striped"
                      style={{ width: "100%", paddingTop: 0 }}
                    >
                      <tbody>
                        <tr>
                          <th className="text-center">1 </th>
                          <th className="text-center">2 </th>
                          <th className="text-center">3 </th>
                          <th className="text-center">4 </th>
                          <th className="text-center">5 </th>
                          <th className="text-center">6 </th>
                          <th className="text-center">7 </th>
                          <th className="text-center">8 </th>
                          <th className="text-center">9 </th>
                          <th className="text-center">10 </th>
                          <th className="text-center">11 </th>
                          <th className="text-center">12 </th>
                          <th className="text-center">13 </th>
                          <th className="text-center">14 </th>
                          <th className="text-center">15 </th>
                          <th className="text-center">16 </th>
                          <th className="text-center">17 </th>
                          <th className="text-center">18 </th>
                          <th className="text-center">19 </th>
                          <th className="text-center">20 </th>
                          <th className="text-center">21 </th>
                          <th className="text-center">22 </th>
                          <th className="text-center">23 </th>
                          <th className="text-center">24 </th>
                          <th className="text-center">25 </th>
                          <th className="text-center">26 </th>
                          <th className="text-center">27 </th>
                          <th className="text-center">28 </th>
                          <th className="text-center">29 </th>
                          <th className="text-center">30 </th>
                          <th className="text-center">31 </th>
                        </tr>
                        <tr>
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                          <td className="text-danger text-center" />
                        </tr>
                        <tr
                          id="update_att_present_0"
                          style={{ display: "none" }}
                        >
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={1}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={2}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={3}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={4}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={5}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={6}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={7}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={8}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={9}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={10}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={11}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={12}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={13}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={14}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={15}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={16}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={17}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={18}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={19}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={20}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={21}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={22}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={23}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={24}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={25}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={26}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={27}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={28}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={29}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={30}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editPresent"
                              data-day={31}
                              data-staff_id={0}
                            >
                              P
                            </button>
                          </td>
                        </tr>
                        <tr
                          id="update_att_absent_0"
                          style={{ display: "none" }}
                        >
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={1}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={2}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={3}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={4}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={5}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={6}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={7}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={8}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={9}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={10}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={11}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={12}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={13}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={14}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={15}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={16}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={17}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={18}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={19}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={20}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={21}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={22}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={23}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={24}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={25}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={26}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={27}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={28}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={29}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={30}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-dark btn-sm editAbsent"
                              data-day={31}
                              data-staff_id={0}
                            >
                              A
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <hr
                      style={{
                        height: 1,
                        backgroundColor: "grey",
                        border: "none",
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button className="btn btn-dark">
                    <img src="../dist/img/icon/update.svg" />
                    Genarate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        

        <Footer />
      </div>
      <EditPresentModal show={editPresentModalShow} handleClose={() => setEditPresentModalShow(false)}/>
      <EditAbsentModal show={editAbsentModalShow} handleClose={() => setEditAbsentModalShow(false)}/>
    </div>
  );
}
