import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../style.css";
import axios from "axios";

export default function Menu() {
  const [menuData, setMenuData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { code } = useParams();

  const [restaurantData, setRestaurantData] = useState({});

  // Filter states
  const [showSpecialOnly, setShowSpecialOnly] = useState(false);
  const [showUnavailableOnly, setShowUnavailableOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  

  const fetchMenuData = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MENU_API}/menu/getmenu/${id}`
      );
      const filteredMenu = response.data.map((menu) => ({
        ...menu,
        dishes: menu.dishes.filter((dish) => dish.is_available),
      }));
      setMenuData(filteredMenu);
    } catch (error) {
      console.log("Error fetching menu data:", error);
    }
  };

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MENU_API}/user/userdata/${code}`
      );
      console.log(response.data);
      if(response.data){
        setRestaurantData(response.data);
        fetchMenuData(response.data._id);
      }
    } catch (error) {
      console.log("Error fetching menu data:", error);
    }
  }
  

  useEffect(() => {
    fetchRestaurantData();
    fetchMenuData();
  }, []);

  useEffect(() => {
    let filtered = [...menuData];

    // Filter for special dishes
    if (showSpecialOnly) {
      filtered = filtered.map((category) => ({
        ...category,
        dishes: category.dishes.filter((dish) => dish.is_special),
      }));
      filtered = filtered.filter((category) => category.dishes.length > 0); // Remove empty categories
    }

    // Filter for unavailable dishes
    if (showUnavailableOnly) {
      filtered = filtered.map((category) => ({
        ...category,
        dishes: category.dishes.filter((dish) => !dish.is_available),
      }));
      filtered = filtered.filter((category) => category.dishes.length > 0);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.map((category) => ({
        ...category,
        dishes: category.dishes.filter((dish) =>
          dish.dish_name.toLowerCase().includes(searchLower)
        ),
      }));
      filtered = filtered.filter((category) => category.dishes.length > 0);
    }

    // Filter by meal type
    if (mealTypeFilter) {
      filtered = filtered.filter(
        (meal_type) => meal_type.meal_type === mealTypeFilter
      );
    }

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(
        (category) => category.category === categoryFilter
      );
    }

    setFilteredData(filtered);
  }, [
    menuData,
    showSpecialOnly,
    showUnavailableOnly,
    searchTerm,
    mealTypeFilter,
    categoryFilter,
  ]);

  return (
    <div className="m-3">
      <div className="mx-3">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2"></div>
          </div>
        </div>
        <div>
          <section className="content" id="viewMenu">
            
            <div>
              <div className="form-check m-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showSpecial"
                  checked={showSpecialOnly}
                  onChange={(e) => setShowSpecialOnly(e.target.checked)}
                />
                <label htmlFor="showSpecial" className="form-check-label">
                  Special Dishes
                </label>
              </div>

              <div className="d-flex w-100 justify-content-around">
                <input
                  type="text"
                  className="form-control m-3"
                  placeholder="Search Item"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="form-control m-3"
                  value={mealTypeFilter}
                  onChange={(e) => setMealTypeFilter(e.target.value)}
                >
                  <option value="">All Meal Types</option>
                  <option value="veg">Veg</option>
                  <option value="egg">Egg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
                <select
                  className="form-control m-3"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {[
                    ...new Set(menuData.map((category) => category.category)),
                  ].map((uniqueCategory) => (
                    <option key={uniqueCategory} value={uniqueCategory}>
                      {uniqueCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row container-fluid" id="menuData">
              {filteredData.map((data) => (
                <div key={data._id} className="col-md-4">
                  <div className="card m-2">
                    <h4 className="card-header">
                      {data.meal_type === "veg" ? (
                        <img
                          src="../../dist/img/veg-symbol.jpg"
                          alt="Veg"
                          style={{ width: "30px", marginRight: "10px" }}
                        />
                      ) : data.meal_type === "non-veg" ? (
                        <img
                          src="../../dist/img/non-veg-symbol.jpg"
                          alt="Non Veg"
                          style={{ width: "30px", marginRight: "10px" }}
                        />
                      ) : data.meal_type === "egg" ? (
                        <img
                          src="../../dist/img/egg-symbol.jpg"
                          alt="Egg"
                          style={{ width: "30px", marginRight: "10px" }}
                        />
                      ) : (
                        ""
                      )}
                      <strong>{data.category}</strong>
                    </h4>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <b> Dish Name </b>
                        </div>
                        <div className="col-md-2">
                          <b> Price </b>
                        </div>
                      </div>

                      {data.dishes.map((dish) => (
                        <div
                          key={dish._id}
                          className="row"
                          style={{
                            backgroundColor: dish.is_available
                              ? "white"
                              : "lightgrey",
                          }}
                        >
                          <div className="col-md-6">{dish.dish_name}</div>
                          <div className="col-md-2">{dish.dish_price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
