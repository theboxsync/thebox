import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Country, State, City } from "country-state-city";

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
  const [predefinedCharges, setPredefinedCharges] = useState([
    { name: "Parcel Container Charge", amount: 0, enabled: false },
    { name: "Service Charge", amount: 0, enabled: false },
  ]);

  const [charges, setCharges] = useState([]); // State to manage charges
  const [newCharge, setNewCharge] = useState({ name: "", amount: 0 });

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
        const existingCharges = response.data.charges || [];
        setCharges(existingCharges);

        // Update predefined charges with existing amounts
        const updatedPredefinedCharges = predefinedCharges.map((charge) => {
          const existingCharge = existingCharges.find(
            (c) => c.name === charge.name
          );
          return existingCharge
            ? { ...charge, amount: existingCharge.amount }
            : charge;
        });
        setPredefinedCharges(updatedPredefinedCharges);
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

  const togglePredefinedCharge = (name) => {
    const updatedCharges = [...charges];
    const chargeIndex = updatedCharges.findIndex((c) => c.name === name);

    if (chargeIndex > -1) {
      // Remove the charge if it exists
      updatedCharges.splice(chargeIndex, 1);
    } else {
      // Add the charge with a default amount
      const predefinedCharge = predefinedCharges.find((c) => c.name === name);
      updatedCharges.push({ name, amount: predefinedCharge.amount || 0 });
    }

    setCharges(updatedCharges);
  };

  const handleChargeAmountChange = (name, amount) => {
    const updatedCharges = charges.map((charge) =>
      charge.name === name ? { ...charge, amount: parseFloat(amount) } : charge
    );
    setCharges(updatedCharges);
  };

  // const handlePredefinedChargeChange = (index) => {
  //   const updatedCharges = [...predefinedCharges];
  //   updatedCharges[index].enabled = !updatedCharges[index].enabled;
  //   setPredefinedCharges(updatedCharges);
  // };

  // const handlePredefinedChargeAmountChange = (index, value) => {
  //   const updatedCharges = [...predefinedCharges];
  //   updatedCharges[index].amount = parseFloat(value) || 0;
  //   setPredefinedCharges(updatedCharges);
  // };

  // const savePredefinedCharges = async () => {
  //   const enabledCharges = predefinedCharges
  //     .filter((charge) => charge.enabled)
  //     .map(({ name, amount }) => ({ name, amount }));

  //   try {
  //     const response = await axios.put(
  //       `${process.env.REACT_APP_ADMIN_API}/charge/updatecharges`,
  //       { userId: userData._id, charges: enabledCharges },
  //       { withCredentials: true }
  //     );
  //     if (response.status === 200) {
  //       alert("Charges updated successfully!");
  //       setCharges(enabledCharges);
  //     }
  //   } catch (error) {
  //     console.error("Error updating charges:", error);
  //     alert("Failed to update charges.");
  //   }
  // };

  // const fetchCharges = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_ADMIN_API}/user/userdata`,
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (response.data !== "Null") {
  //       setCharges(response.data.charges || []);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching charges:", error);
  //   }
  // };

  // const addCharge = () => {
  //   if (newCharge.name && newCharge.amount > 0) {
  //     setCharges([...charges, newCharge]);
  //     setNewCharge({ name: "", amount: 0 });
  //   } else {
  //     alert("Please provide valid charge details.");
  //   }
  // };

  // const removeCharge = (index) => {
  //   const updatedCharges = charges.filter((_, i) => i !== index);
  //   setCharges(updatedCharges);
  // };

  const saveCharges = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_ADMIN_API}/charge/updatecharges`,
        { userId: userData._id, charges },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert("Charges updated successfully!");
      }
    } catch (error) {
      console.error("Error updating charges:", error);
      alert("Failed to update charges.");
    }
  };

  useEffect(() => {
    fetchUserData();
    setCountries(Country.getAllCountries());
    // fetchCharges();
  }, []);
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
              <h3 className="card-title">Manage Charges</h3>
            </div>
            <div className="card-body">
              <h5>Predefined Charges</h5>
              <form className="mx-3">
                <div className="row">
                  {predefinedCharges.map((charge) => (
                    <div className="form-group col-md-6" key={charge.name}>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={charge.name}
                          checked={charges.some((c) => c.name === charge.name)}
                          onChange={() => togglePredefinedCharge(charge.name)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={charge.name}
                        >
                          {charge.name}
                        </label>
                      </div>
                      {charges.some((c) => c.name === charge.name) && (
                        <input
                          type="number"
                          className="form-control mt-2"
                          value={
                            charges.find((c) => c.name === charge.name)
                              ?.amount || 0
                          }
                          onChange={(e) =>
                            handleChargeAmountChange(
                              charge.name,
                              e.target.value
                            )
                          }
                          style={{ maxWidth: "200px" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </form>
              <ul className="list-group">
                {charges
                  .filter(
                    (charge) =>
                      !predefinedCharges.some((c) => c.name === charge.name)
                  )
                  .map((charge, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {charge.name} - ₹{charge.amount.toFixed(2)}
                      </span>
                    </li>
                  ))}
              </ul>
              <button className="btn btn-success mt-3" onClick={saveCharges}>
                Save Charges
              </button>
            </div>
          </div>
          {/* <div className="card">
            <div className="card-header">
              <h3 className="card-title">Manage Charges</h3>
            </div>
            <div className="card-body">
              <form className="mx-3">
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Charge Name</label>
                    <input
                      type="text"
                      value={newCharge.name}
                      onChange={(e) =>
                        setNewCharge({ ...newCharge, name: e.target.value })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>Amount</label>
                    <input
                      type="number"
                      value={newCharge.amount}
                      onChange={(e) =>
                        setNewCharge({
                          ...newCharge,
                          amount: parseFloat(e.target.value),
                        })
                      }
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-md-4 align-self-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={addCharge}
                    >
                      Add Charge
                    </button>
                  </div>
                </div>
              </form>
              <hr />
              <h5>Existing Charges</h5>
              <ul className="list-group">
                {charges.map((charge, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      {charge.name} - ₹{charge.amount.toFixed(2)}
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCharge(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <button className="btn btn-success mt-3" onClick={saveCharges}>
                Save Charges
              </button>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}

export default SettingsDashboard;
