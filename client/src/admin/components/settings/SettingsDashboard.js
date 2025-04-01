import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import DeleteContainerModal from "./DeleteContainerModal";

function SettingsDashboard() {
  const [userData, setUserData] = useState("");
  const [taxInfo, setTaxInfo] = useState({ cgst: 0, sgst: 0 });
  const [isEditingTax, setIsEditingTax] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editableContact, setEditableContact] = useState({});
  const [editableAddress, setEditableAddress] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [containerCharges, setContainerCharges] = useState([]);
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

  const fetchUserData = async () => {
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

  const updateTaxInfo = async () => {
    try {
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
        setIsEditingContact(false);
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
    fetchUserData();
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
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Contact and Address Info</h3>
            </div>
            <div className="card-body">
              {/* Contact Info */}
              <div className="m-3">
                <h5
                  className="mb-3"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Contact Info
                </h5>
                <form className="mx-3">
                  <div className="row">
                    <div className="form-group col-md-4">
                      <h5>Phone Number:</h5>
                      {isEditingContact ? (
                        <input
                          type="text"
                          name="mobile"
                          value={editableContact.mobile}
                          onChange={handleContactChange}
                          className="form-control"
                        />
                      ) : (
                        <p>{userData.mobile}</p>
                      )}
                    </div>
                    <div className="form-group col-md-4">
                      <h5>Email ID:</h5>
                      {isEditingContact ? (
                        <input
                          type="email"
                          name="email"
                          value={editableContact.email}
                          onChange={handleContactChange}
                          className="form-control"
                        />
                      ) : (
                        <p>{userData.email}</p>
                      )}
                    </div>
                  </div>
                  {!isEditingContact ? (
                    <button
                      type="button"
                      className="btn btn-dark mx-2"
                      onClick={() => setIsEditingContact(true)}
                    >
                      Edit Contact Info
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-success mx-2"
                        onClick={saveContactInfo}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary mx-2"
                        onClick={() => setIsEditingContact(false)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </form>
                <hr />

                {/* Address Info */}
                <h5
                  className="my-3"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Address Info
                </h5>
                <form className="mx-3">
                  <div className="row">
                    <div className="form-group col-md-4">
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
                        <p>{userData.address}</p>
                      )}
                    </div>
                    <div className="form-group col-md-4">
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
                        <p>
                          {Country.getCountryByCode(userData.country)?.name ||
                            userData.country}
                        </p>
                      )}
                    </div>
                    <div className="form-group col-md-4">
                      <h5>State:</h5>
                      {isEditingAddress ? (
                        <select
                          name="state"
                          value={editableAddress.state}
                          onChange={handleStateChange}
                          className="form-control"
                          disabled={!editableAddress.country}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>
                          {State.getStateByCodeAndCountry(
                            userData.state,
                            userData.country
                          )?.name || userData.state}
                        </p>
                      )}
                    </div>
                    <div className="form-group col-md-4">
                      <h5>City:</h5>
                      {isEditingAddress ? (
                        <select
                          name="city"
                          value={editableAddress.city}
                          onChange={handleCityChange}
                          className="form-control"
                          disabled={!editableAddress.state}
                        >
                          <option value="">Select City</option>
                          {cities.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p>{userData.city}</p>
                      )}
                    </div>

                    <div className="form-group col-md-4">
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
                        <p>{userData.pincode}</p>
                      )}
                    </div>
                  </div>
                  {!isEditingAddress ? (
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={() => setIsEditingAddress(true)}
                    >
                      Edit Address Info
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
            </div>
          </div>

          {/* Tax Info */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Tax Info</h3>
            </div>
            <div className="card-body">
              <form className="mx-3">
                <div className="row">
                  <div className="form-group col-md-4">
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
                  <div className="form-group col-md-4">
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
                    Edit Tax Info
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
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Manage Container Charges</h3>
            </div>
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
                        <div className="col-md-3">
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
                        <div className="row col-md-3">
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
                        <div className="col-md-3">
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
                            onClick={() => setEditingChargeIndex(null)}
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
                          handleDeleteCharge(index, charge.name, charge.size)
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
                  {/* Container Name */}
                  <div className="form-group col-md-3">
                    <label>Container Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={newCharge.name}
                      onChange={(e) =>
                        setNewCharge({ ...newCharge, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Size Input (Number) */}
                  <div className="form-group col-md-3">
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

                  {/* Price Input */}
                  <div className="form-group col-md-3">
                    <label>Price</label>
                    <input
                      type="number"
                      className="form-control"
                      value={newCharge.price}
                      onChange={(e) =>
                        setNewCharge({ ...newCharge, price: e.target.value })
                      }
                    />
                  </div>

                  {/* Add Button */}
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
        </div>
      </section>

      <DeleteContainerModal
        show={showDeleteContainerModal}
        handleClose={() => setShowDeleteContainerModal(false)}
        data={containerToDelete}
        resetdata={() =>
          setContainerToDelete({ index: null, name: "", size: "" })
        }
        fetchUserData={fetchUserData}
        containerCharges={containerCharges}
        setContainerCharges={setContainerCharges}
      />
    </>
  );
}

export default SettingsDashboard;
