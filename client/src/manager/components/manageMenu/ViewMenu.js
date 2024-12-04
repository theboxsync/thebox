import React, { useState, useEffect } from "react";
import axios from "axios";
import SpecialDishModal from "./SpecialDishModal";
import RemoveSpecialModal from "./RemoveSpecialModal";
import utensilsslash from "../../../dist/img/icon/utensilsslash.svg";

function ViewMenu({ setSection }) {
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [showRemoveSpecialModal, setShowRemoveSpecialModal] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/getmenudata`,
        {
          withCredentials: true,
        }
      );
      setMenuData(response.data);
      console.log("Dishes" + response.data.dishes);
    } catch (error) {
      console.log("Error fetching menu data:", error);
    }
  };
  useEffect(() => {
    fetchMenuData();
  }, []);

  const [specialDishModalData, setSpecialDishModalData] = useState({});
  const specialDishModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_MANAGER_API}/getmenudata/${id}`)
      .then((res) => {
        setSpecialDishModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowSpecialModal(true);
  };

  const [removeSpecialModalData, setRemoveSpecialModalData] = useState({});
  const removeSpecialModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_MANAGER_API}/getmenudata/${id}`)
      .then((res) => {
        setRemoveSpecialModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowRemoveSpecialModal(true);
  };

  return (
    <>
      <section className="content" id="viewMenu">
        <div className="container-fluid">
          <div className="row" style={{ borderBottom: "0px" }}>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Menu</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid" id="menuData">
          {menuData.map((data) => (
            <div key={data._id} className="col-md-4">
              <div className="card m-2">
                <h4 className="card-header"> {data.category} </h4>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <b> Dish Name </b>
                    </div>
                    <div className="col-md-2">
                      <b> Price </b>
                    </div>
                    <div className="col-md-4">
                      <b> Action </b>
                    </div>
                  </div>

                  {data.dishes.map((dish) => (
                    <div key={dish._id} className="row">
                      <div className="col-md-6">{dish.dish_name}</div>
                      <div className="col-md-2">{dish.dish_price}</div>
                      <div className="col-md-4">
                        {dish.is_special ? (
                          // If dish.is_special is true, show the "Remove Special Dish" div
                          <div
                            className="bg-transparent m-1"
                            title="Remove Special Dish"
                            style={{ cursor: "pointer", width: "32px" }}
                            onClick={() => removeSpecialModal(dish._id)}
                          >
                            <img
                              src={utensilsslash}
                              alt="Remove Special Dish"
                            />
                          </div>
                        ) : (
                          // If dish.is_special is false, show the "Set Special Dish" button
                          <button
                            type="button"
                            className="btn bg-transparent special_Dish_btn"
                            title="Set Special Dish"
                            onClick={() => specialDishModal(dish._id)}
                          >
                            <i
                              style={{ color: "black", fontSize: "22px" }}
                              className="fas fa-utensils"
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SpecialDishModal
        show={showSpecialModal}
        handleClose={() => setShowSpecialModal(false)}
        data={specialDishModalData}
        fetchMenuData={fetchMenuData}
      />

      <RemoveSpecialModal
        show={showRemoveSpecialModal}
        handleClose={() => setShowRemoveSpecialModal(false)}
        data={removeSpecialModalData}
        fetchMenuData={fetchMenuData}
      />
    </>
  );
}

export default ViewMenu;
