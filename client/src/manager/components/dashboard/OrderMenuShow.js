import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderMenuShow({ addItemToOrder }) {
  const [menuData, setMenuData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [mealType, setMealType] = useState(""); // Meal type filter
  const [category, setCategory] = useState(""); // Category filter
  const [categories, setCategories] = useState([]);
  const [showSpecial, setShowSpecial] = useState(false); // Show special dishes filter

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/getmenudata`,
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
  }, [mealType, category, searchText]); // Refetch data when filters change

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/getmenucategories`,
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

  // Filter dishes based on search text, meal type, category, special status, and availability
  const filteredMenuData = menuData.map((data) => ({
    ...data,
    dishes: data.dishes.filter(
      (dish) =>
        dish.dish_name.toLowerCase().includes(searchText.toLowerCase()) &&
        (mealType === "" || data.meal_type === mealType) &&
        (category === "" || data.category === category) &&
        (!showSpecial || dish.is_special) && // Filter for special dishes
        dish.is_available // Filter for available dishes only
    ),
  }));

  return (
    <div className="col-md-6 border-right h-100">
      {/* Special Dishes Filter */}
      <div className="form-check m-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="showSpecial"
          checked={showSpecial}
          onChange={(e) => setShowSpecial(e.target.checked)}
        />
        <label htmlFor="showSpecial" className="form-check-label">
          Special Dishes
        </label>
      </div>
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

      <div
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "calc(100% - 140px)",
        }}
      >
        <div className="row">
          {filteredMenuData.map((data) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderMenuShow;
