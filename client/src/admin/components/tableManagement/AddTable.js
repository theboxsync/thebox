import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { addTable } from "../../../schemas";

const AddTable = ({ setSection }) => {
  const [tableErrors, setTableErrors] = useState({});
  const [diningAreas, setDiningAreas] = useState([]);

  useEffect(() => {
    // Fetch dining areas from the backend
    const fetchDiningAreas = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_ADMIN_API}/table/getdiningareas`,
          { withCredentials: true }
        );
        setDiningAreas(response.data); // Update state with fetched areas
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching dining areas:", error);
      }
    };

    fetchDiningAreas();
  }, []);

  const formik = useFormik({
    initialValues: {
      area: "",
      tables: [{ table_no: "", max_person: "" }],
    },
    validationSchema: addTable,
    onSubmit: async (values) => {
      try {
        // Check if there are any unresolved table errors
        const hasErrors = Object.keys(tableErrors).length > 0;

        if (hasErrors) {
          console.error("Fix table errors before submitting:", tableErrors);
          return; // Prevent form submission
        }

        // Proceed with form submission if no errors
        const response = await axios.post(
          `${process.env.REACT_APP_ADMIN_API}/table/addtable`,
          values,
          { withCredentials: true }
        );
        console.log(response.data);
        setSection("ViewTables");
      } catch (error) {
        console.error(error);
      }
    },
  });

  // Check if table number already exists
  const checkTableExists = async (area, table_no, index) => {
    if (!area || !table_no) return;

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/table/checktable`,
        {
          params: { area, table_no },
          withCredentials: true,
        }
      );

      if (response.data.exists) {
        setTableErrors((prev) => ({
          ...prev,
          [index]: "Table number already exists in this area.",
        }));
      } else {
        setTableErrors((prev) => {
          const updatedErrors = { ...prev };
          delete updatedErrors[index];
          return updatedErrors;
        });
      }
    } catch (error) {
      console.error("Error checking table existence:", error);
    }
  };

  // Function to add more tables
  const addMoreTable = () => {
    formik.setFieldValue("tables", [
      ...formik.values.tables,
      { table_no: "", max_person: "" },
    ]);
  };

  // Function to remove a table
  const removeTable = (index) => {
    const updatedTables = [...formik.values.tables];
    updatedTables.splice(index, 1); // Remove the table at the specified index
    formik.setFieldValue("tables", updatedTables);

    setTableErrors((prev) => {
      const updatedErrors = { ...prev };
      delete updatedErrors[index];
      return updatedErrors;
    });
  };

  return (
    <section className="content m-3" id="addTable">
      <div className="container-fluid">
        <form
          autoComplete="off"
          encType="multipart/form-data"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Table </h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtn"
                      onClick={() => setSection("ViewTables")}
                    >
                      <img src="../../dist/img/icon/add.svg" /> View Tables
                    </button>
                  </div>
                </div>
                <div className="card-body m-3">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="dtype">Dining Type</label>
                        <input
                          type="text"
                          name="area"
                          className="form-control"
                          value={formik.values.area}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          list="diningAreaList" // Link to the datalist
                        />
                        <datalist id="diningAreaList">
                          {diningAreas.map((area, index) => (
                            <option key={index} value={area} />
                          ))}
                        </datalist>
                        <label className="text-danger">
                          {formik.errors.area && formik.touched.area
                            ? formik.errors.area
                            : null}
                        </label>
                      </div>
                    </div>
                  </div>
                  <hr style={{ borderTop: "2px solid lightgrey" }} />
                  {formik.values.tables.map((table, index) => (
                    <div key={index}>
                      <div className="row">
                        <div className="form-group col-md-4">
                          <label htmlFor="table_no">Table No</label>
                          <input
                            type="text"
                            name={`tables.${index}.table_no`}
                            className="form-control"
                            value={table.table_no}
                            onChange={formik.handleChange}
                            onBlur={() =>
                              checkTableExists(
                                formik.values.area,
                                table.table_no,
                                index
                              )
                            }
                          />
                          <label className="text-danger">
                            {tableErrors[index] ||
                              (formik.errors.tables?.[index]?.table_no &&
                              formik.touched.tables?.[index]?.table_no
                                ? formik.errors.tables[index].table_no
                                : null)}
                          </label>
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="max_person">Max Person</label>
                          <input
                            type="number"
                            name={`tables.${index}.max_person`}
                            className="form-control"
                            value={table.max_person}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="text-danger">
                            {formik.errors.tables?.[index]?.max_person &&
                            formik.touched.tables?.[index]?.max_person
                              ? formik.errors.tables[index].max_person
                              : null}
                          </label>
                        </div>
                        <div className="form-group col-md-4">
                          <button
                            type="button"
                            className="btn btn-dark mt-4 float-right"
                            onClick={() => removeTable(index)}
                          >
                           <img src="../../dist/img/icon/delete.svg" alt="delete Details" style={{verticalAlign:"text-top"}} />Delete
                          </button>
                        </div>
                      </div>
                      <hr style={{ borderTop: "2px solid lightgrey" }} />
                    </div>
                  ))}
                  <div id="newElementId" className="form-group" />

                  <button
                    type="button"
                    className="btn btn-dark mx-2"
                    onClick={addMoreTable}
                  >
                    <img src="../../dist/img/icon/add.svg" className="mx-1" style={{verticalAlign:"text-top"}}/>
                    Add More Tables
                  </button>
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-dark mx-2"
                  >
                    <img src="../../dist/img/icon/add.svg" className="mx-1"  style={{verticalAlign:"text-top"}}/>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddTable;
