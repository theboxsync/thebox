import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { addMenu } from "../../../schemas";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

function AddMenu({ setSection }) {
  const [mealTypeValue, setMealTypeValue] = useState("veg");
  const [showAdvancedOptions, setShowAdvancedOptions] = useState([false]);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/getmenucategories`, {
        withCredentials: true,
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  };

  const mealTypes = [
    { name: "Veg", value: "veg" },
    { name: "Egg", value: "egg" },
    { name: "Non Veg", value: "non-veg" },
  ];

  const formik = useFormik({
    initialValues: {
      category: "",
      meal_type: "veg",
      dishes: [
        {
          dish_name: "",
          dish_price: "",
          description: "",
          quantity: "",
          unit: "",
        },
      ],
    },
    validationSchema: addMenu,
    onSubmit: (values) => {
      console.log("Submitted", values);
      axios
        .post(`${process.env.REACT_APP_ADMIN_API}/addmenu`, values, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setSection("ViewMenu");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    context: { showAdvancedOptions },
  });

  useEffect(() => {
    fetchCategories();
    setShowAdvancedOptions(formik.values.dishes.map(() => false));
  }, []);

  const addDish = () => {
    formik.setFieldValue("dishes", [
      ...formik.values.dishes,
      {
        dish_name: "",
        dish_price: "",
        description: "",
        quantity: "",
        unit: "",
      },
    ]);
    setShowAdvancedOptions([...showAdvancedOptions, false]);
  };

  const removeDish = (index) => {
    const updatedDishes = [...formik.values.dishes];
    const updatedShowAdvancedOptions = [...showAdvancedOptions];

    // Remove the dish at the specified index
    updatedDishes.splice(index, 1);
    updatedShowAdvancedOptions.splice(index, 1);

    // Update formik and advanced options state
    formik.setFieldValue("dishes", updatedDishes);
    setShowAdvancedOptions(updatedShowAdvancedOptions);
  };

  const radioButtonHandler = (event) => {
    setMealTypeValue(event.currentTarget.value);
    formik.setFieldValue("meal_type", event.currentTarget.value);
  };

  const handleCheckboxChange = (index) => {
    const updatedShowAdvancedOptions = showAdvancedOptions.map((value, i) =>
      i === index ? !value : value
    );
    setShowAdvancedOptions(updatedShowAdvancedOptions);
    formik.setFieldValue(
      `dishes.${index}.showAdvancedOptions`,
      updatedShowAdvancedOptions[index]
    );
    formik.setFieldValue(`dishes.${index}.quantity`, "");
    formik.setFieldValue(`dishes.${index}.unit`, "");
  };

  return (
    <section className="content" id="addMenu">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Add Menu</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    id="viewBtn"
                    onClick={() => setSection("ViewMenu")}
                  >
                    <img src="../../dist/img/view.svg" alt="View Menu" /> View
                    Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card card-secondary m-3">
              
              {/* form start  */}
              <form
                autoComplete="off"
                method="POST"
                encType="multipart/form-data"
                onSubmit={formik.handleSubmit}
                className="m-3"
              >
                <div className="card-body">
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label htmlFor="category">Dish Category</label>
                      <input
                        role="combobox"
                        className="form-control"
                        name="category"
                        id="category"
                        list="categoryOptions" // Link input to datalist by its id
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                      />
                      <datalist id="categoryOptions" role="listbox">
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </datalist>
                      <label className="text-danger">
                        {formik.errors.category && formik.touched.category
                          ? formik.errors.category
                          : null}
                      </label>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="w-100">Meal Type</label>
                      <ButtonGroup>
                        {mealTypes.map((radio, index) => (
                          <ToggleButton
                            className="mx-2"
                            key={index}
                            id={`meal_type-${index}`}
                            type="radio"
                            variant={
                              index === 0
                                ? "outline-success"
                                : index === 1
                                ? "outline-warning"
                                : index === 2
                                ? "outline-danger"
                                : null
                            }
                            name="meal_type"
                            value={radio.value}
                            checked={mealTypeValue === radio.value}
                            onChange={(e) => radioButtonHandler(e, radio.value)}
                          >
                            {radio.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </div>
                  </div>
                  <hr style={{ borderTop: "2px solid lightgrey" }}/>
                  {formik.values.dishes.map((dish, index) => (
                    <div key={index} className="px-3 ">
                      <div className="row">
                        <div className="form-group col-md-4 mb-0">
                          <label htmlFor={`dishes.${index}.dish_name`}>
                            Dish Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name={`dishes.${index}.dish_name`}
                            value={dish.dish_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="text-danger">
                            {formik.errors.dishes?.[index]?.dish_name &&
                            formik.touched.dishes?.[index]?.dish_name
                              ? formik.errors.dishes[index].dish_name
                              : null}
                          </label>
                        </div>
                        <div className="form-group col-md-4 mb-0">
                          <label htmlFor={`dishes.${index}.dish_price`}>
                            Price
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name={`dishes.${index}.dish_price`}
                            value={dish.dish_price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <label className="text-danger">
                            {formik.errors.dishes?.[index]?.dish_price &&
                            formik.touched.dishes?.[index]?.dish_price
                              ? formik.errors.dishes[index].dish_price
                              : null}
                          </label>
                        </div>
                        <div className="col-md-4">
                          <div className="float-right">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => removeDish(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row my-3">
                        <div className="form-group col-md-4 mb-0">
                          <label htmlFor={`dishes.${index}.description`}>
                            Description
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            name={`dishes.${index}.description`}
                            value={dish.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                        </div>
                        <div className="form-group col-md-8 mb-0">
                          <label
                            htmlFor={`dishes.${index}.showAdvancedOptions`}
                          >
                            <input
                              type="checkbox"
                              onChange={() => handleCheckboxChange(index)}
                              checked={showAdvancedOptions[index]}
                            />{" "}
                            Advanced Options
                          </label>
                          {showAdvancedOptions[index] && (
                            <div className="row mt-2">
                              <div className="form-group col-md-6">
                                <label htmlFor={`dishes.${index}.quantity`}>
                                  Quantity
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name={`dishes.${index}.quantity`}
                                  value={dish.quantity}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                />
                                <label className="text-danger">
                                  {formik.errors.dishes?.[index]?.quantity &&
                                  formik.touched.dishes?.[index]?.quantity
                                    ? formik.errors.dishes[index].quantity
                                    : null}
                                </label>
                              </div>
                              <div className="form-group col-md-6">
                                <label htmlFor={`dishes.${index}.unit`}>
                                  Unit
                                </label>
                                <select
                                  className="form-control"
                                  name={`dishes.${index}.unit`}
                                  value={dish.unit}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                >
                                  <option
                                    value=""
                                    label="Select unit"
                                    disabled
                                  />
                                  <option value="kg">kg</option>
                                  <option value="g">g</option>
                                  <option value="litre">litre</option>
                                  <option value="ml">ml</option>
                                </select>
                                <label className="text-danger">
                                  {formik.errors.dishes?.[index]?.unit &&
                                  formik.touched.dishes?.[index]?.unit
                                    ? formik.errors.dishes[index].unit
                                    : null}
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <hr style={{ borderTop: "2px solid lightgrey" }} />
                    </div>
                  ))}

                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={addDish}
                    >
                      + Add More Dishes
                    </button>
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-dark"
                    >
                      <img src="../../dist/img/add.svg" alt="Add" />
                      Add
                    </button>
                  </div>
                </div>
              </form>
              {/* form end  */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddMenu;
