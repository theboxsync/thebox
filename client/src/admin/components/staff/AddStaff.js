import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { addStaff } from "../../../schemas";
import { Country, State, City } from "country-state-city";

function AddStaff({ setSection }) {
  const [fileUploadError, setFileUploadError] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [frontImagePreview, setFrontImagePreview] = useState(null);
  const [backImagePreview, setBackImagePreview] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [positions, setPositions] = useState([]);

  const formik = useFormik({
    initialValues: {
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
      photo: "",
      document_type: "",
      id_number: "",
      front_image: "",
      back_image: "",
    },
    validationSchema: addStaff,
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

        // Add uploaded file paths to the values
        const { photo, front_image, back_image } = uploadResponse.data;
        values.photo = photo;
        values.front_image = front_image;
        values.back_image = back_image;

        // Step 2: Submit staff data
        const addResponse = await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/staff/addstaff`,
          values,
          { withCredentials: true }
        );

        console.log("Staff added successfully:", addResponse.data);
        setSection("ViewStaff");
      } catch (err) {
        console.error("Error during file upload or staff submission:", err);
        setFileUploadError(
          "File upload or staff submission failed. Please try again."
        );
      }
    },
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_API}/staff/getstaffpositions`,
          { withCredentials: true }
        );
        setPositions(response.data); // Update positions state
      } catch (error) {
        console.error("Error fetching positions:", error);
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

  return (
    <section className="content" id="addStaff">
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
                    id="viewStaffBtn1"
                    onClick={() => setSection("ViewStaff")}
                  >
                    <img src="../dist/img/icon/view.svg" /> View Staff
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
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
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
                      {formik.touched.staff_id && formik.errors.staff_id ? (
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
                      {formik.touched.birth_date && formik.errors.birth_date ? (
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
                          <option key={country.isoCode} value={country.isoCode}>
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
                          <option key={state.isoCode} value={state.isoCode}>
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
                      {formik.touched.position && formik.errors.position ? (
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
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
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
                    <label htmlFor="inputStatus">ID Card Type</label>
                    <select
                      id="inputStatus"
                      name="document_type"
                      className="form-select custom-select"
                      value={formik.values.document_type}
                      onChange={formik.handleChange}
                    >
                      <option value={""}>Select one</option>
                      <option value="National Identity Card">
                        National Identity Card
                      </option>
                      <option value="Pan Card">Pan Card</option>
                      <option value="Voter Card">Voter Card</option>
                    </select>
                    {formik.touched.document_type &&
                    formik.errors.document_type ? (
                      <label className="text-danger">
                        * {formik.errors.document_type}
                      </label>
                    ) : null}
                  </div>
                  <div className="form-group" id="idCardNumberDiv">
                    <label htmlFor="id_card">ID Card Number</label>
                    <input
                      type="text"
                      name="id_number"
                      className="form-control"
                      value={formik.values.id_number}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.id_number && formik.errors.id_number ? (
                      <label className="text-danger">
                        * {formik.errors.id_number}
                      </label>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="id_image_front">ID Card Front Image</label>
                    <input
                      type="file"
                      id="id_image_front"
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
                    {formik.touched.front_image && formik.errors.front_image ? (
                      <label className="text-danger">
                        * {formik.errors.front_image}
                      </label>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="id_image_back">ID Card Back Image</label>
                    <input
                      type="file"
                      id="id_image_back"
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
                    {formik.touched.back_image && formik.errors.back_image ? (
                      <label className="text-danger">
                        * {formik.errors.back_image}
                      </label>
                    ) : null}
                  </div>
                  <button type="submit" name="submit" className="btn btn-dark">
                    <img src="../dist/img/icon/add.svg" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddStaff;
