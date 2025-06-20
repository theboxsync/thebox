import React, { useState } from "react";

export default function ListItems({ allDishes = [], addToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Collect unique categories
  const allCategories = [
    "All",
    ...new Set(allDishes.map((categoryObj) => categoryObj.category)),
  ];

  // Filter logic
  const filteredDishes =
    activeCategory === "All"
      ? allDishes
      : allDishes.filter((cat) => cat.category === activeCategory);

  return (
    <div className="container menu-list">
      <ul className="nav nav-tabs mb-3" role="tablist">
        {allCategories.map((category) => (
          <li className="nav-item" key={category} role="presentation">
            <button
              className={`nav-link ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="row mt-2 g-4">
        {filteredDishes.map((categoryData) => (
          <div className="col-lg-6" key={categoryData.category}>
            <div className="title text-center">
              <h4 className="fst-italic">{categoryData.category}</h4>
            </div>

            {categoryData.dishes.map((dish) => (
              <div className="d-flex align-items-center mb-3" key={dish._id}>
                <img
                  className="flex-shrink-0 img-fluid rounded"
                  src={`dist/images/cooking-food-fried-svgrepo-com.svg`}
                  alt={dish.dish_name}
                  style={{ width: 50 }}
                />
                <div className="w-100 d-flex flex-column text-start ps-4">
                  <h5 className="d-flex justify-content-between border-bottom pb-2">
                    <span>{dish.dish_name}</span>
                    <span className="text-primary">Rs.{dish.dish_price}</span>
                  </h5>
                  <small className="fst-italic">{dish.description}</small>
                  {/* Optional: Add to cart button */}
                  {/* <button
                    className="btn btn-sm btn-outline-dark mt-1"
                    onClick={() => addToCart(dish, "menu")}
                  >
                    Add to Cart
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
