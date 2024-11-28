import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import { editStaff } from "../../../schemas";

function EditStaff() {
  const { id } = useParams();
  const [fileUploadError, setFileUploadError] = useState(null);
  const [staffData, setStaffData] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_API}/staffdata/${id}`,
          { withCredentials: true }
        );
        const data = response.data;

        setPhotoPreview(
          process.env.REACT_APP_ADMIN_API +
            "/uploads/staff/profile/" +
            response.data.photo
        );
        setFrontImagePreview(
          process.env.REACT_APP_ADMIN_API +
            "/uploads/staff/id_cards/" +
            response.data.front_image
        );
        setBackImagePreview(
          process.env.REACT_APP_ADMIN_API +
            "/uploads/staff/id_cards/" +
            response.data.back_image
        );

        data.photo = null;
        data.front_image = null;
        data.back_image = null;
        setStaffData(data);
        console.log("Staff Data : ", staffData);
      } catch (err) {
        console.error("Error fetching staff data:", err);
      }
    };

    fetchStaffData();
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: staffData || {
      staff_id: "",
      f_name: "",
      l_name: "",
      birth_date: "",
      joining_date: "",
      address: "",
      phone_no: "",
      email: "",
      salary: "",
      position: "",
      photo: null,
      document_type: "",
      id_number: "",
      front_image: null,
      back_image: null,
    },
    validationSchema: editStaff,
    onSubmit: async (values) => {
      try {
        // Step 1: Upload files
        const formData = new FormData();
        if (values.photo) formData.append("photo", values.photo);
        if (values.front_image)
          formData.append("front_image", values.front_image);
        if (values.back_image) formData.append("back_image", values.back_image);

        const uploadResponse = await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/uploadstaff`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        const { photo, front_image, back_image } = uploadResponse.data;
        values.photo = photo;
        values.front_image = front_image;
        values.back_image = back_image;

        const updateResponse = await axios.put(
          `${process.env.REACT_APP_ADMIN_API}/updatestaff/${id}`,
          values,
          { withCredentials: true }
        );

        console.log("Staff updated successfully:", updateResponse.data);
        navigate("/staff");
      } catch (err) {
        console.error("Error during file upload or staff update:", err);
        setFileUploadError(
          "File upload or staff update failed. Please try again."
        );
      }
    },
  });

  if (!staffData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="wrapper">
        <Navbar />
        <MenuBar />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2"></div>
            </div>
          </div>

          <section className="content" id="updateStaff">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Manage Staff</h3>
                      <div className="card-tools">
                        <button
                          type="button"
                          className="btn btn-block btn-dark"
                          onClick={() => navigate("/staff")}
                        >
                          <img src="../../dist/img/icon/view.svg" /> View Staff
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <form
                method="POST"
                autoComplete="off"
                encType="multipart/form-data"
                onSubmit={formik.handleSubmit}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="card card-secondary">
                      <div className="card-header">
                        <h3 className="card-title">Personal Details</h3>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="form-group col-md-4">
                            <label htmlFor="staffId">Staff ID</label>
                            <input
                              type="text"
                              name="staff_id"
                              className="form-control"
                              value={formik.values.staff_id}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.staff_id &&
                            formik.errors.staff_id ? (
                              <label className="text-danger">
                                * {formik.errors.staff_id}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="fname">First Name</label>
                            <input
                              type="text"
                              name="f_name"
                              className="form-control"
                              value={formik.values.f_name}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.f_name && formik.errors.f_name ? (
                              <label className="text-danger">
                                * {formik.errors.f_name}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="lname">Last Name</label>
                            <input
                              type="text"
                              name="l_name"
                              className="form-control"
                              value={formik.values.l_name}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.l_name && formik.errors.l_name ? (
                              <label className="text-danger">
                                * {formik.errors.l_name}
                              </label>
                            ) : null}
                          </div>
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="bdate">Birthday</label>
                            <input
                              type="date"
                              name="birth_date"
                              className="form-control"
                              value={formik.values.birth_date}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.birth_date &&
                            formik.errors.birth_date ? (
                              <label className="text-danger">
                                * {formik.errors.birth_date}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-md-6">
                            <label htmlFor="jdate">Joining Date</label>
                            <input
                              type="date"
                              name="joining_date"
                              className="form-control"
                              value={formik.values.joining_date}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.joining_date &&
                            formik.errors.joining_date ? (
                              <label className="text-danger">
                                * {formik.errors.joining_date}
                              </label>
                            ) : null}
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <textarea
                            name="address"
                            className="form-control"
                            rows={3}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.address && formik.errors.address ? (
                            <label className="text-danger">
                              * {formik.errors.address}
                            </label>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="mobile">Contact No.</label>
                          <input
                            type="number"
                            name="phone_no"
                            className="form-control"
                            value={formik.values.phone_no}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.phone_no && formik.errors.phone_no ? (
                            <label className="text-danger">
                              * {formik.errors.phone_no}
                            </label>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="text"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.email && formik.errors.email ? (
                            <label className="text-danger">
                              * {formik.errors.email}
                            </label>
                          ) : null}
                        </div>
                        <div className="row">
                          <div className="form-group col-md-6">
                            <label htmlFor="position">Position</label>
                            <input
                              autoComplete="off"
                              role="combobox"
                              list="positions"
                              id="input"
                              className="form-control"
                              name="position"
                              value={formik.values.position}
                              onChange={formik.handleChange}
                            />
                            <datalist id="positions" role="listbox">
                              <option value="Owner">Owner</option>
                              <option value="Manager">Manager</option>
                            </datalist>
                            {formik.touched.position &&
                            formik.errors.position ? (
                              <label className="text-danger">
                                * {formik.errors.position}
                              </label>
                            ) : null}
                          </div>
                          <div className="form-group col-6">
                            <label htmlFor="salary">Salary</label>
                            <input
                              type="number"
                              step="0.01"
                              id="salary"
                              name="salary"
                              className="form-control"
                              value={formik.values.salary}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.salary && formik.errors.salary ? (
                              <label className="text-danger">
                                * {formik.errors.salary}
                              </label>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card card-secondary">
                      <div className="card-header">
                        <h3 className="card-title">ID Proof</h3>
                      </div>
                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="photo">Photo</label>
                          <input
                            type="file"
                            id="photo"
                            name="photo"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              formik.setFieldValue("photo", file);
                              if (file) {
                                setPhotoPreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {photoPreview && (
                            <img
                              src={photoPreview}
                              alt="Photo Preview"
                              className="img-thumbnail mt-2"
                              style={{ maxWidth: "150px" }}
                            />
                          )}
                          {formik.touched.photo && formik.errors.photo ? (
                            <label className="text-danger">
                              * {formik.errors.photo}
                            </label>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="documentType">Document Type</label>
                          <input
                            type="text"
                            name="document_type"
                            className="form-control"
                            value={formik.values.document_type}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.document_type &&
                          formik.errors.document_type ? (
                            <label className="text-danger">
                              * {formik.errors.document_type}
                            </label>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="idNumber">ID Number</label>
                          <input
                            type="text"
                            name="id_number"
                            className="form-control"
                            value={formik.values.id_number}
                            onChange={formik.handleChange}
                          />
                          {formik.touched.id_number &&
                          formik.errors.id_number ? (
                            <label className="text-danger">
                              * {formik.errors.id_number}
                            </label>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="frontImage">Front Image</label>
                          <input
                            type="file"
                            id="frontImage"
                            name="front_image"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              formik.setFieldValue("front_image", file);
                              if (file) {
                                setFrontImagePreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {frontImagePreview && (
                            <img
                              src={frontImagePreview}
                              alt="Front Image Preview"
                              className="img-thumbnail mt-2"
                              style={{ maxWidth: "150px" }}
                            />
                          )}
                          {formik.touched.front_image &&
                          formik.errors.front_image ? (
                            <label className="text-danger">
                              * {formik.errors.front_image}
                            </label>
                          ) : null}
                        </div>
                        <div className="form-group">
                          <label htmlFor="backImage">Back Image</label>
                          <input
                            type="file"
                            id="backImage"
                            name="back_image"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              formik.setFieldValue("back_image", file);
                              if (file) {
                                setBackImagePreview(URL.createObjectURL(file));
                              }
                            }}
                          />
                          {backImagePreview && (
                            <img
                              src={backImagePreview}
                              alt="Back Image Preview"
                              className="img-thumbnail mt-2"
                              style={{ maxWidth: "150px" }}
                            />
                          )}
                          {formik.touched.back_image &&
                          formik.errors.back_image ? (
                            <label className="text-danger">
                              * {formik.errors.back_image}
                            </label>
                          ) : null}
                        </div>
                        <div className="mx-3">
                          <button
                            type="submit"
                            className="btn btn-primary mt-3"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {fileUploadError && (
                  <div className="alert alert-danger mt-3">
                    {fileUploadError}
                  </div>
                )}
              </form>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default EditStaff;
