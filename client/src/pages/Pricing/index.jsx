import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Pricing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    restaurant_name: "",
    purpose: "Restaurant Registration",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_API}/inquiry/create`, formData)
      .then((res) => {
        if (res.data.success) {
          alert(res.data.message);
          navigate("/");
        }
      })
      .catch((err) => console.error(err));
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
              <thead className="table-dark">
                <tr>
                  <th scope="col">Key Features</th>
                  <th scope="col">
                    Core Plan
                    <br />
                    10000 ₹ / year
                    <br />
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm my-3 px-3 py-2"
                      onClick={() => ""}
                    >
                      Raise Inquiry
                    </button>
                  </th>
                  <th scope="col">
                    Growth Plan
                    <br />
                    15000 ₹ / year
                    <br />
                    <button
                      className="btn btn-outline-secondary btn-sm my-3 px-3 py-2"
                      onClick={() => ""}
                    >
                      Raise Inquiry
                    </button>
                  </th>
                  <th scope="col">
                    Scale Plan
                    <br />
                    20000 ₹ / year
                    <br />
                    <button
                      className="btn btn-outline-secondary btn-sm my-3 px-3 py-2"
                      onClick={() => ""}
                    >
                      Raise Inquiry
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4">Basic</td>
                </tr>
                <tr>
                  <td>Menu management</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Multi-terminal billing</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Inventory module</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Third-party integrations</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>In-built CRM</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Central kitchen module</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Unlimited cash register</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Unlimited-user rights</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Reports</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>

                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4">Addons</td>
                </tr>
                <tr>
                  <td>QSR</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Captain panel</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Staff management</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Feedback management</td>
                  <td className="text-danger">✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Scan For Menu</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Restaurant website</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Online order reconciliation</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Reservation manager</td>
                  <td>✖</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>

                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4">Advanced Features</td>
                </tr>
                <tr>
                  <td>Payroll By TheBox</td>
                  <td>✖</td>
                  <td>✖</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Dynamic reports</td>
                  <td>✖</td>
                  <td>✖</td>
                  <td>✔</td>
                </tr>

                <tr className="table-primary text-start fw-bold">
                  <td colSpan="4">Support & Training</td>
                </tr>
                <tr>
                  <td>24x7 Support</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
                <tr>
                  <td>Free Training</td>
                  <td>✔</td>
                  <td>✔</td>
                  <td>✔</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-center mb-4">
          <h2 className="fw-bold">Raise Inquiry For Watch Demo & Booking</h2>
          <p className="text-muted">
            Our team will get contact back to you within 24 hours
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Your Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Restaurant Name"
                name="restaurant_name"
                value={formData.restaurant_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Any Message For Us"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pricing;
