import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { requestInventory } from "../../../schemas";


function AddInventory({ setSection }) {
  const [items, setItems] = useState([{ item_name: "", unit: "", item_quantity: "" }]);

  const addItemField = () => {
    setItems([...items, { item_name: "", unit: "", item_quantity: "" }]);
  };

  const removeItemField = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    formik.setFieldValue("items", updatedItems);
  };

  const formik = useFormik({
    initialValues: {items, status: "Requested"},
    validationSchema: requestInventory,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`${process.env.REACT_APP_MANAGER_API}/inventory/addinventory`, values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setSection("ViewInventory");
        })
        .catch((err) => {
          console.log(err);
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
    <section className="content" id="addInventory">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Manage Inventory</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtn"
                    onClick={() => setSection("ViewInventory")}
                  >
                    <img src="../../dist/img/view.svg" alt="view" /> View Inventory
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" id="addInventoryForm">
        <form
          method="POST"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
        >
          <div className="row">
            {items.map((item, index) => (
              <div className="col-md-12" key={index}>
                <div className="card card-secondary">
                  <div className="card-header">
                    <h3 className="card-title">Item {index + 1}</h3>
                    <button
                      type="button"
                      className="btn btn-dark btn-sm float-right"
                      onClick={() => removeItemField(index)}
                    >
                      <img src="../../dist/img/icon/delete.svg"/>delete
                    </button>
                  </div>
                  <div className="card-body row">
                    <div className="form-group col-md-4">
                      <label htmlFor={`item_name_${index}`}>Item</label>
                      <input
                        type="text"
                        name="item_name"
                        className="form-control"
                        value={item.item_name}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                      {formik.errors.items?.[index]?.item_name && formik.touched.items?.[index]?.item_name && (
                        <label className="text-danger">{formik.errors.items[index].item_name}</label>
                      )}
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor={`unit_${index}`}>Weight Type</label>
                      <select
                        name="unit"
                        className="form-control custom-select"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, e)}
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
                      {formik.errors.items?.[index]?.unit && formik.touched.items?.[index]?.unit && (
                        <label className="text-danger">{formik.errors.items[index].unit}</label>
                      )}
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor={`item_quantity_${index}`}>Quantity</label>
                      <input
                        type="number"
                        name="item_quantity"
                        className="form-control"
                        value={item.item_quantity}
                        onChange={(e) => handleItemChange(index, e)}
                      />
                      {formik.errors.items?.[index]?.item_quantity && formik.touched.items?.[index]?.item_quantity && (
                        <label className="text-danger">{formik.errors.items[index].item_quantity}</label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="form-group col-md-12">
              {/* <input
                type="button"
                className="btn btn-dark"
                value="+ Add More"
                onClick={addItemField}
              /> */}
              <button type="button" className="btn btn-dark" onClick={addItemField}> <img
                src="../../dist/img/add.svg"
                alt="Add"
                className="mx-1"
              /> Add More</button>
             
            </div>
            <div className="form-group col-md-12">
              <button
                type="submit"
                name="submit"
                className="btn btn-dark"
              >
                Send Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddInventory;
