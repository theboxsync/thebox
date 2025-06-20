import { useState, useEffect } from "react";
import axios from "axios";

import "../../../style.css";
import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

export default function ManageWebsite() {
  const [formData, setFormData] = useState({
    restaurant_name: "",
    restaurant_address: "",
    contact_email: "",
    contact_phone: "",
    open_days: "Monday-Saturday",
    open_time_from: "11:00",
    open_time_to: "23:00",
    featured_dish_ids: [],
  });

  const [allDishes, setAllDishes] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/website/settings`, {
        withCredentials: true,
      })
      .then((res) => {
        setFormData(res.data || formData);
      });

    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/website/dishes`, {
        withCredentials: true,
      })
      .then((res) => setAllDishes(res.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDishSelect = (id) => {
    setFormData((prev) => {
      const ids = prev.featured_dish_ids.includes(id)
        ? prev.featured_dish_ids.filter((d) => d !== id)
        : [...prev.featured_dish_ids, id];
      return { ...prev, featured_dish_ids: ids };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    payload.featured_dish_ids = JSON.stringify(payload.featured_dish_ids);
    console.log("Submitting website settings:", formData);
    try {
      await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/website/settings`,
        payload,
        { withCredentials: true }
      );
      alert("Website settings updated successfully.");
    } catch (err) {
      console.error("Failed to update:", err);
      alert("Update failed.");
    }
  };

  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid"></div>
        </div>

        <section className="content" id="viewInventory">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Manage Website Details</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Restaurant Name</label>
                    <input
                      className="form-control"
                      name="restaurant_name"
                      value={formData.restaurant_name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Restaurant Address</label>
                    <input
                      className="form-control"
                      name="restaurant_address"
                      value={formData.restaurant_address}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Open Days</label>
                    <input
                      className="form-control"
                      name="open_days"
                      value={formData.open_days}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3 row">
                    <div className="col-md-6">
                      <label>Opening Time</label>
                      <input
                        type="time"
                        className="form-control"
                        name="open_time_from"
                        value={formData.open_time_from}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Closing Time</label>
                      <input
                        type="time"
                        className="form-control"
                        name="open_time_to"
                        value={formData.open_time_to}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      className="form-control"
                      name="contact_email"
                      value={formData.contact_email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      className="form-control"
                      name="contact_phone"
                      value={formData.contact_phone}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Select Featured Menu Items</label>
                    <div
                      className="border p-2"
                      style={{ maxHeight: 200, overflowY: "scroll" }}
                    >
                      {allDishes.map((menu) => (
                        <div key={menu.category} className="mb-2">
                          <strong>
                            {menu.category} ({menu.meal_type})
                          </strong>
                          <div className="ms-3 mt-2">
                            {menu.dishes.map((dish) => (
                              <div key={dish._id}>
                                <input
                                  type="checkbox"
                                  checked={formData.featured_dish_ids.includes(
                                    dish._id
                                  )}
                                  onChange={() => handleDishSelect(dish._id)}
                                  className="ml-5"
                                />
                                <span className="ms-2 mx-2">{dish.dish_name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="btn btn-dark">Update Settings</button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
