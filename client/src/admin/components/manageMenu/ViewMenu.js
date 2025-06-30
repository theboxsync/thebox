import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteDishModal from "./DeleteDishModal";
import EditDishModal from "./EditDishModal";
import SpecialDishModal from "./SpecialDishModal";
import RemoveSpecialModal from "./RemoveSpecialModal";
import utensilsslash from "../../../dist/img/icon/specialdish.png";
import { AuthContext } from "../../context/AuthContext";

function ViewMenu({ setSection }) {
  const { activePlans } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [showRemoveSpecialModal, setShowRemoveSpecialModal] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Filter states
  const [showSpecialOnly, setShowSpecialOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mealTypeFilter, setMealTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/menu/getmenudata`,
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

  // Apply filters whenever filters change
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
  }, [menuData, showSpecialOnly, searchTerm, mealTypeFilter, categoryFilter]);

  const [deleteModalData, setDeleteModalData] = useState({
    id: "",
    dish_name: "",
  });
  const deleteModal = (id, dish_name) => {
    console.log("Dish name:", dish_name);
    setShowDeleteModal(true);
    setDeleteModalData({ ...deleteModalData, id: id, dish_name: dish_name });
  };

  const [editModalData, setEditModalData] = useState({});
  const editModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/menu/getmenudata/${id}`)
      .then((res) => {
        setEditModalData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setShowEditModal(true);
  };

  const [specialDishModalData, setSpecialDishModalData] = useState({});
  const specialDishModal = (id) => {
    console.log(id);
    axios
      .get(`${process.env.REACT_APP_ADMIN_API}/menu/getmenudata/${id}`)
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
      .get(`${process.env.REACT_APP_ADMIN_API}/menu/getmenudata/${id}`)
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
          <div className="row" style={{ border: "none" }}>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">View Menu</h3>
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtn"
                      onClick={() => setSection("AddMenu")}
                    >
                      <img src="../../dist/img/add.svg" alt="Add" /> Add Dishes
                    </button>
                  </div>
                  {/* {activePlans.includes("Scan For Menu") && ( */}
                  <div className="card-tools mx-2">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtn"
                      onClick={() => setSection("QrForMenu")}
                    >
                      <img src="../../dist/img/add.svg" alt="Add" /> QR for Menu
                    </button>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* Filters */}
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
              {[...new Set(menuData.map((category) => category.category))].map(
                (uniqueCategory) => (
                  <option key={uniqueCategory} value={uniqueCategory}>
                    {uniqueCategory}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="row container-fluid">
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
                    <div className="col-md-4">
                      <b> Action </b>
                    </div>
                  </div>

                  {data.dishes.map((dish) => (
                    <div key={dish._id} className="row">
                      <div className="col-md-6">
                        {dish.dish_name}
                        {dish.is_special && (
                          <>
                            <img
                              src={utensilsslash}
                              alt="Remove Special Dish"
                              width={"20px"}
                              className="ml-2"
                            />
                          </>
                        )}
                      </div>
                      <div className="col-md-2 d-flex align-items-center">
                        {dish.dish_price}
                      </div>
                      <div className="col-md-4 d-flex">
                        <button
                          type="button"
                          className="bg-transparent edit_Dish_btn"
                          title="Edit" style={{ border: "none" }}
                          onClick={() => {
                            editModal(dish._id);
                          }}
                        >
                          <img src="../../dist/img/edit-b.svg" alt="Edit" />
                        </button>
                        <button
                          type="button"
                          className="bg-transparent delete_Dish_btn"
                          title="Delete" style={{ border: "none" }}
                          onClick={() => {
                            deleteModal(dish._id, dish.dish_name);
                          }}
                        >
                          <img src="../../dist/img/delete-b.svg" alt="Delete" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DeleteDishModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        data={deleteModalData}
        fetchMenuData={fetchMenuData}
      />
      <EditDishModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        data={editModalData}
        fetchMenuData={fetchMenuData}
      />
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
