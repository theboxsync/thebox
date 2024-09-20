import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { addTable } from "../../../schemas";

function AddTable({ setSection }) {
  const formik = useFormik({
    initialValues: {
      area: "",
      tables: [{ table_no: "", max_person: "" }],
    },
    validationSchema: addTable,
    onSubmit: (values) => {
      console.log(values);
      axios
        .post("http://admin.localhost:3001/api/addtable", values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setSection("ViewTables");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const addMoreTable = () => {
    formik.setFieldValue("tables", [
      ...formik.values.tables,
      { table_no: "", max_person: "" },
    ]);
  };

  return (
    <section className="content" id="addTable">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add Table</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtn"
                    onClick={() => setSection("ViewTables")}
                  >
                    <img src="../../dist/img/icon/view.svg" /> View Table
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <form
          autoComplete="off"
          encType="multipart/form-data"
          method="POST"
          onSubmit={formik.handleSubmit}
        >
          <div className="row">
            <div className="col-md-12">
              <div className="card card-secondary">
                <div className="card-header">
                  <h3 className="card-title">Manage Table</h3>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                      title="Collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label htmlFor="dtype">Dining Type</label>
                        <select
                          name="area"
                          className="form-select custom-select"
                          value={formik.values.area}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option disabled value={""}>
                            Select Option
                          </option>
                          <option value="A.C.">A.C.</option>
                          <option value="Non A.C.">Non A.C.</option>
                        </select>
                        <label className="text-danger">
                          {formik.errors.area && formik.touched.area
                            ? formik.errors.area
                            : null}
                        </label>
                      </div>
                    </div>
                  </div>
                  {formik.values.tables.map((table, index) => (
                    <div className="row" key={index}>
                      <div className="form-group col-md-4">
                        <label htmlFor="table_no">Table No</label>
                        <input
                          type="text"
                          name={`tables.${index}.table_no`}
                          className="form-control"
                          value={table.table_no}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <label className="text-danger">
                          {formik.errors.tables?.[index]?.table_no &&
                          formik.touched.tables?.[index]?.table_no
                            ? formik.errors.tables[index].table_no
                            : null}
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
                    </div>
                  ))}
                  <div id="newElementId" className="form-group" />

                  <button
                    type="button"
                    className="btn btn-dark mx-2"
                    onClick={addMoreTable}
                  >
                    <img src="../../dist/img/icon/add.svg" className="mx-1" />
                    Add More Tables
                  </button>
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-dark mx-2"
                  >
                    <img src="../../dist/img/icon/add.svg" className="mx-1" />
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
}

export default AddTable;
