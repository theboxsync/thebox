import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { requestInventory } from "../../../schemas";
import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";

function UpdateInventory() {
  const { id } = useParams(); // Extract the inventory ID from URL
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("Requested");

  // Fetch the inventory item details by ID to populate the form initially
  useEffect(() => {
    const fetchInventoryItem = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_MANAGER_API}/getinventorydata/${id}`,
          { withCredentials: true }
        );
        setItems(response.data.items || []);
        setStatus(response.data.status || "Requested");
      } catch (error) {
        console.error("Error fetching inventory item details:", error);
      }
    };
    fetchInventoryItem();
  }, [id]);

  const addItemField = () => {
    setItems([...items, { item_name: "", unit: "", item_quantity: "" }]);
  };

  const removeItemField = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    formik.setFieldValue("items", updatedItems);
  };

  const formik = useFormik({
    initialValues: { items, status },
    enableReinitialize: true, // Reinitialize form values when items or status change
    validationSchema: requestInventory,
    onSubmit: (values) => {
      axios
        .put(
          `${process.env.REACT_APP_MANAGER_API}/updateinventory/${id}`,
          values,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("Inventory updated:", res.data);
          navigate("/inventory");
        })
        .catch((err) => {
          console.error("Error updating inventory:", err);
        });
    },
  });

  const handleItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...items];
    updatedItems[index][name] = value;
    setItems(updatedItems);
    formik.setFieldValue("items", updatedItems);
  };

  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper p-3">
        <section className="content" id="updateInventory">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Update Inventory</h3>
                    <div className="card-tools">
                      <button
                        type="button"
                        className="btn btn-block btn-dark"
                        onClick={() => navigate("/inventory")}
                      >
                        <img src="../../dist/img/view.svg" alt="view" /> View
                        Inventory
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid" id="updateInventoryForm">
            <form
              method="POST"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <div className="row m-5">
                {items.map((item, index) => (
                  <div className="col-md-6" key={index}>
                    <div className="card card-secondary">
                      <div className="card-header">
                        <h3 className="card-title">Item {index + 1}</h3>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm float-right"
                          onClick={() => removeItemField(index)}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="card-body row">
                        <div className="form-group col-md-4">
                          <label>Item</label>
                          <input
                            type="text"
                            name="item_name"
                            className="form-control"
                            value={item.item_name}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label>Weight Type</label>
                          <select
                            name="unit"
                            className="form-control custom-select"
                            value={item.unit}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                          >
                            <option value="" disabled>
                              Select Option
                            </option>
                            <option value="Kilogram">Kilogram(kg)</option>
                            <option value="Grams">Grams(g)</option>
                            <option value="Liter">Liter(L)</option>
                            <option value="ml">Milligram Liter</option>
                            <option value="nos">Nos</option>
                            <option value="Pieces">Pieces</option>
                          </select>
                        </div>
                        <div className="form-group col-md-4">
                          <label>Quantity</label>
                          <input
                            type="text"
                            name="item_quantity"
                            className="form-control"
                            value={item.item_quantity}
                            onChange={(e) => handleItemChange(index, e)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="form-group col-md-12">
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={addItemField}
                  >
                    + Add More
                  </button>
                </div>
                <div className="form-group col-md-12">
                  <button type="submit" className="btn btn-dark">
                    Update Inventory
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UpdateInventory;
