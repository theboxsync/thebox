import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { signupSchema2 } from "../../schemas";
import { Country, State, City } from "country-state-city";

function Secondform({ inputData, setInputData, handleGoNext }) {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: inputData,
    validationSchema: signupSchema2,
    onSubmit: (values) => {
      setInputData({ ...inputData, ...values });
      handleGoNext();
    },
  });

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleCountryChange = (event) => {
    const countryIsoCode = event.target.value;
    setFieldValue('country', countryIsoCode);
    setStates(State.getStatesOfCountry(countryIsoCode));
    setCities([]);
    setFieldValue('state', '');
    setFieldValue('city', '');
  };

  const handleStateChange = (event) => {
    const stateIsoCode = event.target.value;
    setFieldValue('state', stateIsoCode);
    setCities(City.getCitiesOfState(values.country, stateIsoCode));
    setFieldValue('city', '');
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <div className="row" id="second-form">
        <div className="col-md-12">
          <div className="from-group mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label className="text-danger">
              {errors.address && touched.address ? errors.address : null}
            </label>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="country">Country</label>
            <select
              className="form-select custom-select"
              id="country"
              name="country"
              value={values.country}
              onChange={handleCountryChange}
              onBlur={handleBlur}
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
              {errors.country && touched.country ? errors.country : null}
            </label>
          </div>
          <div className="form-group mb-4">
            <label htmlFor="state">State</label>
            <select
              className="form-select custom-select"
              id="state"
              name="state"
              value={values.state}
              onChange={handleStateChange}
              onBlur={handleBlur}
              required
              disabled={!values.country}
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
              {errors.state && touched.state ? errors.state : null}
            </label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="city">City</label>
            <select
              id="city"
              name="city"
              className="form-select custom-select"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={!values.state}
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
              {errors.city && touched.city ? errors.city : null}
            </label>
          </div>
          <div className="from-group mb-3">
            <label htmlFor="pincode">Zip Code</label>
            <input
              type="number"
              className="form-control"
              id="pincode"
              name="pincode"
              pattern="[0-9]{6}"
              value={values.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <label className="text-danger">
              {errors.pincode && touched.pincode ? errors.pincode : null}
            </label>
          </div>
          <div className="buttons">
            <button
              type="submit"
              id="next"
              name="next"
              className="btn btn-outline-dark next"
            >
              Go Next
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Secondform;
