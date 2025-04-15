import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

import { editStaff } from "../../../schemas";
import { AuthContext } from "../../context/AuthContext";

import Loading from "../../components/Loading";

function EditStaff() {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [staffData, setStaffData] = useState(null);
  const { userSubscriptions, activePlans } = useContext(AuthContext);

  const [photoPreview, setPhotoPreview] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (userSubscriptions.length > 0) {
      const hasStaffPlan = userSubscriptions.some(
        (subscription) =>
          subscription.plan_name === "Staff Management" &&
          activePlans.includes("Staff Management")
      );

      if (!hasStaffPlan) {
        alert(
          "You need to buy or renew to Staff Management plan to access this page."
        );
        navigate("/subscription");
        return;
      }
    }
  }, [activePlans, userSubscriptions]);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_API}/staff/staffdata/${id}`,
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

        // Populate states and cities based on existing data
        if (data.country) {
          const availableStates = State.getStatesOfCountry(data.country);
          setStates(availableStates);

          if (data.state) {
            const availableCities = City.getCitiesOfState(
              data.country,
              data.state
            );
            setCities(availableCities);
          }
        }
      } catch (err) {
        console.error("Error fetching staff data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, [id]);

  useEffect(() => {
    setCountries(Country.getAllCountries());
    const fetchPositions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_API}/staff/getstaffpositions`,
          { withCredentials: true }
        );
        setPositions(response.data); // Update positions state
      } catch (error) {
        console.error("Error fetching positions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, []);

  const handleCountryChange = (event) => {
    const countryIsoCode = event.target.value;
    formik.setFieldValue("country", countryIsoCode);
    setStates(State.getStatesOfCountry(countryIsoCode));
    setCities([]);
    formik.setFieldValue("state", "");
    formik.setFieldValue("city", "");
  };

  const handleStateChange = (event) => {
    const stateIsoCode = event.target.value;
    formik.setFieldValue("state", stateIsoCode);
    setCities(City.getCitiesOfState(formik.values.country, stateIsoCode));
    formik.setFieldValue("city", "");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: staffData || {
      staff_id: "",
      f_name: "",
      l_name: "",
      birth_date: "",
      joining_date: "",
      address: "",
      country: "",
      state: "",
      city: "",
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
        setLoading(true);
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
          `${process.env.REACT_APP_ADMIN_API}/staff/updatestaff/${id}`,
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
      } finally {
        setLoading(false);
      }
    },
  });

  if (!staffData || loading) {
    return <Loading />;
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
                        <div className="form-group row">
                          <div className="col-md-4">
                            <label htmlFor="country">Country</label>
                            <select
                              className="form-select custom-select"
                              id="country"
                              name="country"
                              value={formik.values.country}
                              onChange={handleCountryChange}
                              onBlur={formik.handleBlur}
                              required
                            >
                              <option defaultValue disabled value="">
                                Select one
                              </option>
                              {countries.map((country) => (
                                <option
                                  key={country.isoCode}
                                  value={country.isoCode}
                                >
                                  {country.name}
                                </option>
                              ))}
                            </select>
                            <label className="text-danger">
                              {formik.errors.country && formik.touched.country
                                ? formik.errors.country
                                : null}
                            </label>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="state">State</label>
                            <select
                              className="form-select custom-select"
                              id="state"
                              name="state"
                              value={formik.values.state}
                              onChange={handleStateChange}
                              onBlur={formik.handleBlur}
                              required
                              disabled={!formik.values.country}
                            >
                              <option defaultValue disabled value="">
                                Select one
                              </option>
                              {states.map((state) => (
                                <option
                                  key={state.isoCode}
                                  value={state.isoCode}
                                >
                                  {state.name}
                                </option>
                              ))}
                            </select>
                            <label className="text-danger">
                              {formik.errors.state && formik.touched.state
                                ? formik.errors.state
                                : null}
                            </label>
                          </div>
                          <div className="col-md-4">
                            <label htmlFor="city">City</label>
                            <select
                              id="city"
                              name="city"
                              className="form-select custom-select"
                              value={formik.values.city}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                              disabled={!formik.values.state}
                            >
                              <option defaultValue disabled value="">
                                Select one
                              </option>
                              {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                  {city.name}
                                </option>
                              ))}
                            </select>
                            <label className="text-danger">
                              {formik.errors.city && formik.touched.city
                                ? formik.errors.city
                                : null}
                            </label>
                          </div>
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
                          <div className="form-group col-6">
                            <label htmlFor="position">Position</label>
                            <input
                              list="positions"
                              id="position"
                              name="position"
                              className="form-control"
                              value={formik.values.position}
                              onChange={formik.handleChange}
                            />
                            <datalist id="positions">
                              {positions.map((pos, index) => (
                                <option key={index} value={pos}></option>
                              ))}
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
