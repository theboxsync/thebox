import React, { useState, useEffect } from "react";
import axios from "axios";

function OrderMenuShow({ addItemToOrder }) {
  const [menuData, setMenuData] = useState([]);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/getmenudata",
        {
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
  }, []);

  return (
    <div className="col-md-6 border-right h-100">
      <div className="d-flex w-100 justify-content-around">
        <input
          type="text"
          className="form-control m-3"
          placeholder="Search Item"
        />
        <input
          type="text"
          className="form-control m-3"
          placeholder="Shortcut Code"
        />
      </div>
      <div
        style={{
          overflowX: "hidden",
          overflowY: "auto",
          height: "calc(100% - 70px)",
        }}
      >
        <div className="row">
          {menuData.map((data) => (
            <>
              {data.dishes.map((dish) => (
                <div key={data._id} className="col-md-6">
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
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderMenuShow;
