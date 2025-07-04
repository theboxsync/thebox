import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";

import Navbar from "../../components/NavBar";
import MenuBar from "../../components/MenuBar";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

import { completeInventory } from "../../../schemas";

function CompleteInventory() {
  const { state } = useLocation(); // Receives prefilled data from ViewInventory
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  // Initial values for the form
  const [initialValues, setInitialValues] = useState({
    request_date: "",
    bill_date: "",
    bill_number: null,
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
  });

  const fetchInventoryData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/inventory/getinventorydata/${state.id}`,
        { withCredentials: true }
      );
      setInitialValues({ ...initialValues, ...response.data });
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const uploadFiles = async (files) => {
    setLoading(true);
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
      return response.data.fileNames; // Return an array of file paths
    } catch (error) {
      console.error("File upload failed:", error);
      alert("Failed to upload files. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Prefill form data if inventory data is passed
  useEffect(() => {
    fetchInventoryData();
    console.log("Intial Values : ", initialValues);
  }, [state]);

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
    enableReinitialize: true,
    validationSchema: completeInventory,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        let fileNames = [];
        if (values.bill_files) {
          fileNames = await uploadFiles(values.bill_files);
        }

        const completedItems = values.items.filter((item) => item.completed);
        const remainingItems = values.items.filter((item) => !item.completed);

        const requestData = {
          ...values,
          bill_files: fileNames,
          items: completedItems, // Only send completed items
        };

        await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/inventory/completeinventoryrequest`,
          { ...requestData, remainingItems },
          { withCredentials: true }
        );

        alert("Inventory updated successfully!");
        navigate("/inventory");
      } catch (error) {
        console.error("Error updating inventory:", error);
        alert("Failed to update inventory. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const unpaid = values.total_amount - values.paid_amount;
    setFieldValue("unpaid_amount", isNaN(unpaid) ? 0 : unpaid);
  }, [values.total_amount, values.paid_amount]);

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

  if(Loading){
    return <Loading />
  }

  return (
    <div className="wrapper">
      <Navbar />
      <MenuBar />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>
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
                        onClick={() => navigate("/inventory/")}
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
                          <div className="text-danger">
                            * {errors.bill_number}
                          </div>
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
                          <div className="text-danger">
                            {errors.vendor_name}
                          </div>
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
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Total Amount</label>
                        <input
                          type="number"
                          name="total_amount"
                          value={values.total_amount ?? ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onWheel={(e) => e.target.blur()}
                          className="form-control"
                        />

                        {touched.total_amount && errors.total_amount && (
                          <div className="text-danger">
                            {errors.total_amount}
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Paid Amount</label>
                        <input
                          type="number"
                          name="paid_amount"
                          value={values.paid_amount ?? ""}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onWheel={(e) => e.target.blur()}
                          className="form-control"
                        />
                        {touched.paid_amount && errors.paid_amount && (
                          <div className="text-danger">
                            {errors.paid_amount}
                          </div>
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
                          <div className="form-group">
                            <label>
                              <input
                                type="checkbox"
                                name={`items.${index}.completed`}
                                className="mx-2"
                                checked={item.completed}
                                onChange={(e) => {
                                  console.log("ohhho");
                                  setFieldValue(
                                    `items.${index}.completed`,
                                    e.target.checked
                                  );
                                  if (!e.target.checked) {
                                    setFieldValue(
                                      `items.${index}.item_price`,
                                      0
                                    );
                                  }
                                }}
                              />
                              Mark as Completed
                            </label>
                          </div>
                          <div className="form-group">
                            <label>Item Name</label>
                            <input
                              type="text"
                              name={`items.${index}.item_name`}
                              value={item.item_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-control"
                              readOnly
                            />
                            {touched.items?.[index]?.item_name &&
                              errors.items?.[index]?.item_name && (
                                <div className="text-danger">
                                  {errors.items[index].item_name}
                                </div>
                              )}
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
                                readOnly
                              />
                              {touched.items?.[index]?.item_quantity &&
                                errors.items?.[index]?.item_quantity && (
                                  <div className="text-danger">
                                    {errors.items[index].item_quantity}
                                  </div>
                                )}
                            </div>
                            <div className="col-md-6">
                              <label>Unit</label>
                              <input
                                type="text"
                                name={`items.${index}.unit`}
                                value={item.unit}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="form-control"
                                readOnly
                              />
                              {touched.items?.[index]?.unit &&
                                errors.items?.[index]?.unit && (
                                  <div className="text-danger">
                                    {errors.items[index].unit}
                                  </div>
                                )}
                            </div>
                          </div>
                          <p>
                            <div className="form-group">
                              <label>Item Price</label>
                              <input
                                type="number"
                                name={`items.${index}.item_price`}
                                value={item.item_price ?? ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                onWheel={(e) => e.target.blur()}
                                className="form-control"
                              />
                              {touched.items?.[index]?.item_price &&
                                errors.items?.[index]?.item_price && (
                                  <div className="text-danger">
                                    {typeof errors.items[index].item_price ===
                                    "string"
                                      ? errors.items[index].item_price
                                      : JSON.stringify(
                                          errors.items[index].item_price
                                        )}
                                  </div>
                                )}
                            </div>
                          </p>
                          <hr style={{ border: "1px solid #ccc" }} />
                        </div>
                      ))}

                      {touched.items && errors.items && (
                        <>
                          {/* Show array-level error if errors.items is a string */}
                          {typeof errors.items === "string" && (
                            <div className="text-danger">{errors.items}</div>
                          )}

                          {/* Show per-item errors if errors.items is an array */}
                          {Array.isArray(errors.items) &&
                            errors.items.map(
                              (itemError, index) =>
                                itemError && (
                                  <div key={index} className="text-danger">
                                    {Object.entries(itemError).map(
                                      ([field, errorMsg]) => (
                                        <div key={field}>{`Item ${
                                          index + 1
                                        } (${field}): ${errorMsg}`}</div>
                                      )
                                    )}
                                  </div>
                                )
                            )}
                        </>
                      )}

                      <button
                        type="submit"
                        className="btn btn-success mt-4"
                        onClick={handleSubmit}
                      >
                        Complete Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default CompleteInventory;
