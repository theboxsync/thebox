import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { addInventory } from "../../../schemas";

function AddInventory({ setSection }) {
  const navigate = useNavigate();

  // Initial values for the form
  const initialValues = {
    request_date: "",
    bill_date: "",
    bill_number: "",
    vendor_name: "",
    category: "",
    bill_files: "",
    total_amount: 0,
    paid_amount: 0,
    unpaid_amount: 0,
    items: [
      {
        item_name: "",
        item_quantity: 0,
        unit: "",
        item_price: 0,
      },
    ],
    status: "Completed",
  };

  const uploadFiles = async (files) => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("bill_files", file);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_ADMIN_API}/upload/uploadbillfiles`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.fileNames;
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Failed to upload files. Please try again.");
      throw error;
    }
  };

  // Calculate unpaid amount dynamically
  const calculateUnpaidAmount = (totalAmount, paidAmount) =>
    totalAmount - paidAmount;

  // Setup Formik
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: addInventory,
    onSubmit: async (values) => {
      try {
        console.log("Submitted", values);
        // Step 1: Upload the files
        let fileNames = [];
        if (values.bill_files) {
          fileNames = await uploadFiles(values.bill_files);
        }

        const requestData = {
          ...values,
          bill_files: fileNames, 
        };
        await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/inventory/addinventory`,
          requestData,
          { withCredentials: true }
        );
        alert("Inventory updated successfully!");
        setSection("ViewInventory");
      } catch (error) {
        console.error("Error updating inventory:", error);
        alert("Failed to update inventory. Please try again.");
      }
    },
  });

  const [filePreviews, setFilePreviews] = useState([]); // Store preview data

  const previewFiles = (files) => {
    const previews = Array.from(files)
      .map((file) => {
        if (file.type.startsWith("image/")) {
          // Preview for images
          return {
            type: "image",
            src: URL.createObjectURL(file),
            name: file.name,
          };
        } else if (file.type === "application/pdf") {
          // Preview for PDFs
          return {
            type: "pdf",
            src: URL.createObjectURL(file),
            name: file.name,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);

    setFilePreviews(previews); // Update previews state
  };

  // Handle adding a new item to the items list
  const addItem = () => {
    const newItem = {
      item_name: "",
      item_quantity: 0,
      unit: "",
      item_price: 0,
    };
    setFieldValue("items", [...values.items, newItem]);
  };

  // Handle removing an item from the items list
  const removeItem = (index) => {
    const updatedItems = values.items.filter((_, i) => i !== index);
    setFieldValue("items", updatedItems);
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Complete Inventory Request</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtn"
                    onClick={() => setSection("ViewInventory")}
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
      <div className="container-fluid">
        <form
          method="POST"
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h4>Purchase Details</h4>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label>Bill Date</label>
                    <input
                      type="date"
                      name="bill_date"
                      value={values.bill_date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.bill_date && errors.bill_date && (
                      <div className="text-danger">{errors.bill_date}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Bill Number</label>
                    <input
                      type="text"
                      name="bill_number"
                      value={values.bill_number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.bill_number && errors.bill_number && (
                      <div className="text-danger">* {errors.bill_number}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Vendor Name</label>
                    <input
                      type="text"
                      name="vendor_name"
                      value={values.vendor_name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.vendor_name && errors.vendor_name && (
                      <div className="text-danger">{errors.vendor_name}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.category && errors.category && (
                      <div className="text-danger">{errors.category}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Bill images</label>
                    <input
                      type="file"
                      name="bill_files"
                      accept="image/*,application/pdf"
                      multiple
                      onChange={(event) => {
                        const files = event.target.files;
                        setFieldValue("bill_files", files);
                        previewFiles(files); // Generate previews
                      }}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.bill_files && errors.bill_files && (
                      <div className="text-danger">{errors.bill_files}</div>
                    )}
                    <div className="file-previews d-flex">
                      {filePreviews.map((file, index) => (
                        <div key={index} className="file-preview">
                          {file.type === "image" ? (
                            <img
                              src={file.src}
                              alt={file.name}
                              style={{
                                width: "100px",
                                height: "100px",
                                margin: "5px",
                              }}
                            />
                          ) : (
                            <iframe
                              src={file.src}
                              title={file.name}
                              style={{
                                width: "100px",
                                height: "100px",
                                margin: "5px",
                              }}
                            />
                          )}
                          <p style={{ fontSize: "12px" }}>{file.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Total Amount</label>
                    <input
                      type="number"
                      name="total_amount"
                      value={values.total_amount}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue(
                          "unpaid_amount",
                          calculateUnpaidAmount(
                            e.target.value,
                            values.paid_amount
                          )
                        );
                      }}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.total_amount && errors.total_amount && (
                      <div className="text-danger">{errors.total_amount}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Paid Amount</label>
                    <input
                      type="number"
                      name="paid_amount"
                      value={values.paid_amount}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue(
                          "unpaid_amount",
                          calculateUnpaidAmount(
                            values.total_amount,
                            e.target.value
                          )
                        );
                      }}
                      onBlur={handleBlur}
                      className="form-control"
                    />
                    {touched.paid_amount && errors.paid_amount && (
                      <div className="text-danger">{errors.paid_amount}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Unpaid Amount</label>
                    <input
                      type="number"
                      name="unpaid_amount"
                      value={values.unpaid_amount}
                      readOnly
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card card-secondary">
                <div className="card-header">
                  <h4>Item Details</h4>
                </div>
                <div className="card-body">
                  {values.items.map((item, index) => (
                    <div key={index} className="mb-3">
                      <div className="form-group row">
                        <div className="col-md-10">
                          <label>Item Name</label>
                          <input
                            type="text"
                            name={`items.${index}.item_name`}
                            value={item.item_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          />
                          {touched.items?.[index]?.item_name &&
                            errors.items?.[index]?.item_name && (
                              <div className="text-danger">
                                {errors.items[index].item_name}
                              </div>
                            )}
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-danger float-right"
                            onClick={() => removeItem(index)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-6">
                          <label>Quantity</label>
                          <input
                            type="text"
                            name={`items.${index}.item_quantity`}
                            value={item.item_quantity}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="form-control"
                          />
                          {touched.items?.[index]?.item_quantity &&
                            errors.items?.[index]?.item_quantity && (
                              <div className="text-danger">
                                {errors.items[index].item_quantity}
                              </div>
                            )}
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="unit">Weight Type</label>
                          <select
                            name={`items.${index}.unit`}
                            className="form-control custom-select"
                            value={item.unit}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value={""} defaultValue={""} disabled>
                              Select Option
                            </option>
                            <option value="Kilogram">Kilogram(kg)</option>
                            <option value="Grams">Grams(g)</option>
                            <option value="Liter">Liter(L)</option>
                            <option value="ml">Milligram Liter</option>
                            <option value="nos">Nos</option>
                            <option value="Pieces">Pieces</option>
                          </select>
                          {touched.items?.[index]?.unit &&
                            errors.items?.[index]?.unit && (
                              <div className="text-danger">
                                {errors.items[index].unit}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Item Price</label>
                        <input
                          type="number"
                          name={`items.${index}.item_price`}
                          value={item.item_price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form-control"
                        />
                        {touched.items?.[index]?.item_price &&
                          errors.items?.[index]?.item_price && (
                            <div className="text-danger">
                              {errors.items[index].item_price}
                            </div>
                          )}
                      </div>
                      <hr style={{ border: "1px solid #ccc" }} />
                    </div>
                  ))}
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={addItem}
                    >
                      + Add More Item
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-dark mt-4"
                      
                    >
                      <img
                        src="../../dist/img/add.svg"
                        alt="Add"
                        className="mx-1"
                      />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddInventory;
