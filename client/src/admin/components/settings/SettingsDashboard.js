import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";

import DeleteContainerModal from "./DeleteContainerModal";

function SettingsDashboard() {
  const [userData, setUserData] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editableProfile, setEditableProfile] = useState({
    name: "",
    logo: "",
  });
  const [gstNo, setGstNo] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [taxInfo, setTaxInfo] = useState({ cgst: 0, sgst: 0 });
  const [isEditingTax, setIsEditingTax] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editableContact, setEditableContact] = useState({});
  const [editableAddress, setEditableAddress] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [containerCharges, setContainerCharges] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); //state to track the current step
  const [newCharge, setNewCharge] = useState({
    name: "",
    sizeValue: "",
    sizeUnit: "ml", // Default unit
    price: "",
  });
  const [editingChargeIndex, setEditingChargeIndex] = useState(null);
  const [editableCharge, setEditableCharge] = useState(null);
  const sizeUnits = ["ml", "L", "g", "kg", "pieces"];

  const [showDeleteContainerModal, setShowDeleteContainerModal] =
    useState(false);
  const [containerToDelete, setContainerToDelete] = useState({
    index: null,
    name: "",
    size: "",
  });

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/user/userdata`,
        {
          withCredentials: true,
        }
      );
      if (response.data === "Null") {
        navigate("/login");
      } else {
        setUserData(response.data);
        setEditableProfile({
          name: response.data.name || "",
          logo: response.data.logo || "",
          gst_no: response.data.gst_no || "",
        });
        setGstNo(response.data.gst_no || "");
        setTaxInfo(response.data.taxInfo || { cgst: 0, sgst: 0 });
        setEditableContact({
          mobile: response.data.mobile,
          email: response.data.email,
        });
        setEditableAddress({
          address: response.data.address,
          city: response.data.city,
          state: response.data.state,
          country: response.data.country,
          pincode: response.data.pincode,
        });
        setCountries(Country.getAllCountries());
        setStates(State.getStatesOfCountry(response.data.country));
        setCities(
          City.getCitiesOfState(response.data.country, response.data.state)
        );
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleLogoChange = (e) => {
    setLogoFile(e.target.files[0]);
  };

  const uploadLogo = async () => {
    if (!logoFile) return null;
    const formData = new FormData();
    formData.append("logo", logoFile);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/upload/uploadlogo`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("Logo uploaded successfully:", res.data);
      return res.data.logo; // adjust based on your backend response
    } catch (error) {
      console.error("Logo upload failed:", error);
      alert("Failed to upload logo.");
      return null;
    }
  };

  const saveProfileInfo = async () => {
    let uploadedLogoUrl = userData.logo;

    if (logoFile) {
      const url = await uploadLogo();
      if (!url) return; // cancel if upload fails
      uploadedLogoUrl = url;
    }

    updateUserInfo({
      name: editableProfile.name,
      logo: uploadedLogoUrl,
      email: editableContact.email,
      mobile: editableContact.mobile,
    });
    
    setIsEditingProfile(false);
    window.location.reload();
  };

  const updateTaxInfo = async () => {
    try {
      updateUserInfo({ gst_no: gstNo });
      const response = await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/user/update-tax`,
        { taxInfo },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Tax information updated successfully!");
        setIsEditingTax(false);
      }
    } catch (error) {
      console.log("Error updating tax info:", error);
      alert("Failed to update tax information.");
    }
  };

  const updateUserInfo = async (updatedFields) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/user/updateuser`,
        { userId: userData._id, ...updatedFields },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("User information updated successfully!");
        setUserData({ ...userData, ...updatedFields });
        setIsEditingAddress(false);
      }
    } catch (error) {
      console.log("Error updating user information:", error);
      alert("Failed to update user information.");
    }
  };

  // Update Contact Info
  const saveContactInfo = () => {
    updateUserInfo(editableContact);
  };

  // Update Address Info
  const saveAddressInfo = () => {
    updateUserInfo(editableAddress);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setEditableContact({ ...editableContact, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setEditableAddress({ ...editableAddress, [name]: value });
  };
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setEditableAddress({
      ...editableAddress,
      country: countryCode,
      state: "",
      city: "",
    });
    setStates(State.getStatesOfCountry(countryCode));
    setCities([]);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    setEditableAddress({ ...editableAddress, state: stateCode, city: "" });
    setCities(City.getCitiesOfState(editableAddress.country, stateCode));
  };

  const handleCityChange = (e) => {
    setEditableAddress({ ...editableAddress, city: e.target.value });
  };

  const fetchContainerCharges = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/charge/get-container-charges`,
        { withCredentials: true }
      );
      setContainerCharges(response.data);
    } catch (error) {
      console.log("Error fetching container charges:", error);
    }
  };

  const addContainerCharge = async () => {
    const formattedCharge = {
      name: newCharge.name,
      size: `${newCharge.sizeValue} ${newCharge.sizeUnit}`, // Example: "500 ml"
      price: newCharge.price,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/charge/add-container-charge`,
        formattedCharge,
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Container charge added successfully!");
        setContainerCharges([...containerCharges, formattedCharge]);
        setNewCharge({ name: "", sizeValue: "", sizeUnit: "ml", price: "" });
      }
    } catch (error) {
      console.log("Error adding container charge:", error);
      alert("Failed to add container charge.");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchContainerCharges();
    setCountries(Country.getAllCountries());
  }, []);

  const handleEditCharge = (index) => {
    setEditingChargeIndex(index);
    setEditableCharge({
      name: containerCharges[index].name,
      sizeValue: containerCharges[index].size.split(" ")[0],
      sizeUnit: containerCharges[index].size.split(" ")[1],
      price: containerCharges[index].price,
    });
  };

  const handleSaveCharge = async () => {
    const updatedCharge = {
      name: editableCharge.name,
      size: `${editableCharge.sizeValue} ${editableCharge.sizeUnit}`,
      price: editableCharge.price,
    };

    try {
      await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/charge/update-container-charge`,
        { index: editingChargeIndex, updatedCharge },
        { withCredentials: true }
      );
      const updatedCharges = [...containerCharges];
      updatedCharges[editingChargeIndex] = updatedCharge;
      setContainerCharges(updatedCharges);
      setEditingChargeIndex(null);
      setEditableCharge(null);
    } catch (error) {
      console.log("Error updating container charge:", error);
      alert("Failed to update container charge.");
    }
  };

  const handleDeleteCharge = async (index, name, size) => {
    setContainerToDelete({ index, name, size });
    setShowDeleteContainerModal(true);
  };

  return (
    <>
      <section className="content" id="viewInventory">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-8 col-sm-12 col-12">
              <div className="card card-outline p-md-5">
                <div className="card-body p-md-5">
                  <div className="containers my-4">
                    <div className="steps">
                      <span
                        className={`circle ${currentStep >= 1 ? "active" : ""}`}
                      ></span>
                      <span
                        className={`circle ${currentStep >= 2 ? "active" : ""}`}
                      ></span>
                      <span
                        className={`circle ${currentStep >= 3 ? "active" : ""}`}
                      ></span>
                      <span
                        className={`circle ${currentStep >= 4 ? "active" : ""}`}
                      ></span>
                      <div className="progress-bar position-absolute w-100">
                        <span
                          className="indicator bg-dark d-block"
                          style={{
                            height: "4px",
                            width: `${(currentStep - 1) * 50}%`,
                            transition: "width 0.3s ease",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                  {/* Step 1: Profile Info */}
                  {currentStep === 1 && (
                    <>
                      <div className="container my-5">
                        <h4>Profile Info</h4>
                        <p>You can edit your Profile details here</p>
                      </div>
                      <div className="edit-profile">
                        <form className="mx-3">
                          <div className="row">
                            <div className="form-group col-md-12">
                              <h5>Name:</h5>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="name"
                                  value={editableProfile.name}
                                  onChange={handleProfileChange}
                                  className="form-control"
                                />
                              ) : (
                                <input
                                  type="text"
                                  name="name"
                                  value={userData.name}
                                  className="form-control"
                                  disabled
                                />
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <h5>Logo:</h5>
                              {isEditingProfile ? (
                                <>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="form-control"
                                  />
                                  {logoFile && (
                                    <img
                                      className="rounded"
                                      src={URL.createObjectURL(logoFile)}
                                      alt="Preview"
                                      style={{
                                        height: "75px",
                                        marginTop: "10px",
                                      }}
                                    />
                                  )}
                                </>
                              ) : userData.logo ? (
                                <img
                                  className="rounded"
                                  src={`${process.env.REACT_APP_ADMIN_API}/uploads/${userData.logo}`}
                                  alt="Logo"
                                  style={{ maxHeight: 75 }}
                                />
                              ) : (
                                <p>No logo available</p>
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <h5>Email ID:</h5>
                              {isEditingProfile ? (
                                <input
                                  type="email"
                                  name="email"
                                  value={editableContact.email}
                                  onChange={handleContactChange}
                                  className="form-control"
                                />
                              ) : (
                                <input
                                  type="email"
                                  name="email"
                                  value={userData.email}
                                  className="form-control"
                                  disabled
                                />
                              )}
                            </div>
                            <div className="form-group col-md-12">
                              <h5>Phone Number:</h5>
                              {isEditingProfile ? (
                                <input
                                  type="text"
                                  name="mobile"
                                  value={editableContact.mobile}
                                  onChange={handleContactChange}
                                  className="form-control"
                                />
                              ) : (
                                <input
                                  type="text"
                                  name="mobile"
                                  value={userData.mobile}
                                  className="form-control"
                                  disabled
                                />
                              )}
                            </div>
                          </div>

                          {!isEditingProfile ? (
                            <button
                              type="button"
                              className="btn btn-dark mx-2"
                              onClick={() => setIsEditingProfile(true)}
                            >
                              <img
                                src="../../dist/img/icon/edit.svg"
                                alt="Edit profile Info"
                              />{" "}
                              Edit
                            </button>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="btn btn-dark mx-2"
                                onClick={saveProfileInfo}
                              >
                                Save
                              </button>
                              <button
                                type="button"
                                className="btn btn-dark mx-2"
                                onClick={() => setIsEditingProfile(false)}
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </form>
                      </div>
                    </>
                  )}

                  {/* Step 2: Contact Info */}
                  {currentStep === 2 && (
                    <div className="edit-contact">
                      <form className="mx-3">
                        <div className="row">
                          <div className="form-group col-md-12">
                            <h5>Address:</h5>
                            {isEditingAddress ? (
                              <input
                                type="text"
                                name="address"
                                value={editableAddress.address}
                                onChange={handleAddressChange}
                                className="form-control"
                              />
                            ) : (
                              <input
                                type="text"
                                name="address"
                                value={userData.address}
                                className="form-control"
                                disabled
                              />
                            )}
                          </div>

                          <div className="form-group col-md-12">
                            <h5>Country:</h5>
                            {isEditingAddress ? (
                              <select
                                name="country"
                                value={editableAddress.country}
                                onChange={handleCountryChange}
                                className="form-control"
                              >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                  <option
                                    key={country.isoCode}
                                    value={country.isoCode}
                                  >
                                    {country.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                className="form-control"
                                value={
                                  Country.getCountryByCode(userData.country)
                                    ?.name || userData.country
                                }
                                disabled
                              />
                            )}
                          </div>

                          <div className="form-group col-md-12">
                            <h5>State:</h5>
                            {isEditingAddress ? (
                              <select
                                name="state"
                                value={editableAddress.state}
                                onChange={handleStateChange}
                                className="form-control"
                              >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                  <option
                                    key={state.isoCode}
                                    value={state.isoCode}
                                  >
                                    {state.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                className="form-control"
                                value={
                                  State.getStateByCodeAndCountry(
                                    userData.state,
                                    userData.country
                                  )?.name || userData.state
                                }
                                disabled
                              />
                            )}
                          </div>

                          <div className="form-group col-md-12">
                            <h5>City:</h5>
                            {isEditingAddress ? (
                              <select
                                name="city"
                                value={editableAddress.city}
                                onChange={handleCityChange}
                                className="form-control"
                              >
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                  <option key={city.name} value={city.name}>
                                    {city.name}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <input
                                className="form-control"
                                value={userData.city}
                                disabled
                              />
                            )}
                          </div>

                          <div className="form-group col-md-12">
                            <h5>Zip Code:</h5>
                            {isEditingAddress ? (
                              <input
                                type="text"
                                name="pincode"
                                value={editableAddress.pincode}
                                onChange={handleAddressChange}
                                className="form-control"
                              />
                            ) : (
                              <input
                                className="form-control"
                                value={userData.pincode}
                                disabled
                              />
                            )}
                          </div>
                        </div>

                        {!isEditingAddress ? (
                          <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => setIsEditingAddress(true)}
                          >
                            <img
                              src="../../dist/img/icon/edit.svg"
                              alt="Edit profile Info"
                            />{" "}
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-success mx-2"
                              onClick={saveAddressInfo}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary mx-2"
                              onClick={() => setIsEditingAddress(false)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </form>
                    </div>
                  )}

                  {/* tax info */}
                  {/* Step 3: Tax Info */}
                  {currentStep === 3 && (
                    <div className="edit-tax">
                      <form className="mx-3">
                        <div className="row mt-4">
                          <div className="form-group col-md-12">
                            <h5>GST Number:</h5>
                            {isEditingTax ? (
                              <input
                                type="text"
                                name="gst_no"
                                value={gstNo}
                                onChange={(e) => setGstNo(e.target.value)}
                                className="form-control"
                              />
                            ) : (
                              <input
                                type="text"
                                name="gst_no"
                                value={userData.gst_no || "N/A"}
                                className="form-control"
                                disabled
                              />
                            )}
                          </div>
                          <div className="form-group col-md-12">
                            <label>CGST (%)</label>
                            <input
                              type="number"
                              name="cgst"
                              value={taxInfo.cgst}
                              onChange={(e) =>
                                setTaxInfo({ ...taxInfo, cgst: e.target.value })
                              }
                              className="form-control"
                              disabled={!isEditingTax}
                            />
                          </div>
                          <div className="form-group col-md-12">
                            <label>SGST (%)</label>
                            <input
                              type="number"
                              name="sgst"
                              value={taxInfo.sgst}
                              onChange={(e) =>
                                setTaxInfo({ ...taxInfo, sgst: e.target.value })
                              }
                              className="form-control"
                              disabled={!isEditingTax}
                            />
                          </div>
                        </div>

                        {!isEditingTax ? (
                          <button
                            type="button"
                            className="btn btn-primary mx-2"
                            onClick={() => setIsEditingTax(true)}
                          >
                            <img
                              src="../../dist/img/icon/edit.svg"
                              alt="Edit profile Info"
                            />{" "}
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn btn-success mx-2"
                              onClick={updateTaxInfo}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="btn btn-secondary mx-2"
                              onClick={() => setIsEditingTax(false)}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </form>
                    </div>
                  )}
                  {/* container charge */}
                  {/* Step 4: container charges */}
                  {currentStep === 4 && (
                    <div className="edit-tax">
                      <div className="card-body">
                        <h5>Container Charges</h5>
                        <ul className="list-group row">
                          {containerCharges.map((charge, index) => (
                            <li
                              key={index}
                              className="row list-group-item d-flex justify-content-between align-items-center"
                            >
                              {editingChargeIndex === index ? (
                                <>
                                  <div className="col-md-6">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={editableCharge.name}
                                      onChange={(e) =>
                                        setEditableCharge({
                                          ...editableCharge,
                                          name: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="row col-md-6">
                                    <div className="col-md-6">
                                      <input
                                        type="number"
                                        className="form-control"
                                        value={editableCharge.sizeValue}
                                        onChange={(e) =>
                                          setEditableCharge({
                                            ...editableCharge,
                                            sizeValue: e.target.value,
                                          })
                                        }
                                      />
                                    </div>
                                    <div className="col-md-6">
                                      <select
                                        value={editableCharge.sizeUnit}
                                        className="form-control"
                                        onChange={(e) =>
                                          setEditableCharge({
                                            ...editableCharge,
                                            sizeUnit: e.target.value,
                                          })
                                        }
                                      >
                                        {sizeUnits.map((unit) => (
                                          <option key={unit} value={unit}>
                                            {unit}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-6 mt-2">
                                    <input
                                      type="number"
                                      className="form-control"
                                      value={editableCharge.price}
                                      onChange={(e) =>
                                        setEditableCharge({
                                          ...editableCharge,
                                          price: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </>
                              ) : (
                                `${charge.name} - ${charge.size} - ₹${charge.price}`
                              )}
                              <div>
                                {editingChargeIndex === index ? (
                                  <>
                                    <button
                                      className="btn btn-success mx-2"
                                      onClick={handleSaveCharge}
                                    >
                                      Save
                                    </button>
                                    <button
                                      className="btn btn-secondary mx-2"
                                      onClick={() =>
                                        setEditingChargeIndex(null)
                                      }
                                    >
                                      Cancel
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-primary mx-2"
                                    onClick={() => handleEditCharge(index)}
                                  >
                                    Edit
                                  </button>
                                )}
                                <button
                                  className="btn btn-danger mx-2"
                                  onClick={() =>
                                    handleDeleteCharge(
                                      index,
                                      charge.name,
                                      charge.size
                                    )
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <hr />
                        <form>
                          <div className="row">
                            <div className="form-group col-md-6">
                              <label>Container Name</label>
                              <input
                                type="text"
                                className="form-control"
                                value={newCharge.name}
                                onChange={(e) =>
                                  setNewCharge({
                                    ...newCharge,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="form-group col-md-6">
                              <label>Size</label>
                              <div className="d-flex">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={newCharge.sizeValue}
                                  onChange={(e) =>
                                    setNewCharge({
                                      ...newCharge,
                                      sizeValue: e.target.value,
                                    })
                                  }
                                  placeholder="Enter size"
                                />
                                <select
                                  className="form-control mx-2"
                                  value={newCharge.sizeUnit}
                                  onChange={(e) =>
                                    setNewCharge({
                                      ...newCharge,
                                      sizeUnit: e.target.value,
                                    })
                                  }
                                >
                                  {sizeUnits.map((unit, index) => (
                                    <option key={index} value={unit}>
                                      {unit}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="form-group col-md-6">
                              <label>Price</label>
                              <input
                                type="number"
                                className="form-control"
                                value={newCharge.price}
                                onChange={(e) =>
                                  setNewCharge({
                                    ...newCharge,
                                    price: e.target.value,
                                  })
                                }
                              />
                            </div>

                            <div className="form-group col-md-3 d-flex align-items-end">
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={addContainerCharge}
                              >
                                Add Charge
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  {/* Step Buttons */}
                  <div className="buttons pt-4 float-right">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="btn btn-dark next"
                        onClick={() => setCurrentStep((prev) => prev - 1)}
                      >
                        Go Back
                      </button>
                    )}
                    {currentStep < 4 && (
                      <button
                        type="button"
                        className="btn btn-dark next mx-2"
                        onClick={() => setCurrentStep((prev) => prev + 1)}
                      >
                        Go Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeleteContainerModal
        show={showDeleteContainerModal}
        handleClose={() => setShowDeleteContainerModal(false)}
        data={containerToDelete}
        resetdata={() =>
          setContainerToDelete({ index: null, name: "", size: "" })
        }
        fetchUser={fetchUser}
        containerCharges={containerCharges}
        setContainerCharges={setContainerCharges}
      />
    </>
  );
}

export default SettingsDashboard;
