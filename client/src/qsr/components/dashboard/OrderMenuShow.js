import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderMenuShow({ addItemToOrder }) {
  const [menuData, setMenuData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [mealType, setMealType] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [showSpecial, setShowSpecial] = useState(false);
  const [showParcelCharge, setShowParcelCharge] = useState(false);
  const [containerCharges, setContainerCharges] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_QSR_API}/userdata`, {
        withCredentials: true,
      })
      .then((response) => {
        setContainerCharges(response.data.containerCharges || []);
      })
      .catch((error) => {
        console.error("Error fetching tax rates:", error);
      });
  }, []);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QSR_API}/getmenudata`,
        {
          params: {
            mealType,
            category,
            searchText,
          },
          withCredentials: true,
        }
      );
      setMenuData(response.data);
    } catch (error) {
      console.log("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, [mealType, category, searchText]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QSR_API}/getmenucategories`,
        {
          withCredentials: true,
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredMenuData = menuData.map((data) => ({
    ...data,
    dishes: data.dishes.filter(
      (dish) =>
        dish.dish_name.toLowerCase().includes(searchText.toLowerCase()) &&
        (mealType === "" || data.meal_type === mealType) &&
        (category === "" || data.category === category) &&
        (!showSpecial || dish.is_special) &&
        dish.is_available
    ),
  }));

  const handleAddParcelCharge = (name, size, price) => {
    if (name && size && price) {
      const chargeItem = {
        dish_name: `${name} ${size}`,
        dish_price: price,
        special_notes: "Parcel Charge",
        status: "Container Charge",
      };
      addItemToOrder(chargeItem);
    } else {
      alert("Please select a charge and enter quantity.");
    }
  };

  return (
    <div className="col-md-6 border-right h-100">
      <div className="d-flex w-100 justify-content-between">
        {/* Special Dishes Filter */}
        <div className="form-check m-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="showSpecial"
            checked={showSpecial}
            onChange={(e) => setShowSpecial(e.target.checked)}
            disabled={showParcelCharge} // Disable when Parcel Charge is checked
          />
          <label htmlFor="showSpecial" className="form-check-label">
            Special Dishes
          </label>
        </div>

        {/* Checkbox for showing parcel charges */}
        <div className="form-check m-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="showParcelCharge"
            checked={showParcelCharge}
            onChange={(e) => setShowParcelCharge(e.target.checked)}
          />
          <label htmlFor="showParcelCharge" className="form-check-label">
            Parcel Charges
          </label>
        </div>
      </div>

      {/* Hide filters when Parcel Charge is selected */}
      {!showParcelCharge && (
        <div className="d-flex w-100 justify-content-around">
          {/* Search Input */}
          <input
            type="text"
            className="form-control m-3"
            placeholder="Search Item"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Meal Type Filter Dropdown */}
          <select
            className="form-control m-3"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">All Meal Types</option>
            <option value="veg">Veg</option>
            <option value="egg">Egg</option>
            <option value="non-veg">Non-Veg</option>
          </select>

          {/* Category Filter Dropdown */}
          <select
            className="form-control m-3"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      <div
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "calc(100% - 140px)",
        }}
      >
        <div className="row">
          {!showParcelCharge
            ? // Show Regular Menu Items when Parcel Charge is NOT selected
              filteredMenuData.map((data) => (
                <React.Fragment key={data._id}>
                  {data.dishes.map((dish) => (
                    <div key={dish._id} className="col-md-6">
                      <div
                        className={`card m-2 ${
                          data.meal_type === "veg"
                            ? "outline-green"
                            : data.meal_type === "egg"
                            ? "outline-yellow"
                            : "outline-red"
                        }`}
                        style={{ backgroundColor: "#f0f0f0" }}
                      >
                        <div className="card-body">
                          <div key={dish._id} className="row">
                            <div className="col-md-6">{dish.dish_name}</div>
                            <div className="col-md-3 text-center">
                              &#8377; {dish.dish_price}
                            </div>
                            <div
                              className="col-md-3 text-center"
                              style={{ cursor: "pointer" }}
                              onClick={() => addItemToOrder(dish)}
                            >
                              <img
                                src="../../dist/img/add.svg"
                                alt="Add"
                                style={{ filter: "invert(1)" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))
            : // Show Only Parcel Charges when Parcel Charge is selected
              containerCharges.map((charge) => (
                <div key={charge._id} className="col-md-6">
                  <div
                    className="card m-2"
                    style={{ backgroundColor: "#f0f0f0" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          {charge.name} - {charge.size}
                        </div>
                        <div className="col-md-3 text-center">
                          &#8377; {charge.price}
                        </div>
                        <div
                          className="col-md-3 text-center"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleAddParcelCharge(
                              charge.name,
                              charge.size,
                              charge.price
                            )
                          }
                        >
                          <img
                            src="../../dist/img/add.svg"
                            alt="Add"
                            style={{ filter: "invert(1)" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default OrderMenuShow;
