import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteDishModal from "./DeleteDishModal";
import EditDishModal from "./EditDishModal";
import SpecialDishModal from "./SpecialDishModal";
import RemoveSpecialModal from "./RemoveSpecialModal";
import utensilsslash from "../../../dist/img/icon/utensilsslash.svg";

function ViewMenu({ setSection }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);
  const [showRemoveSpecialModal, setShowRemoveSpecialModal] = useState(false);
  const [menuData, setMenuData] = useState([]);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ADMIN_API}/getmenudata`,
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
      .get(`${process.env.REACT_APP_ADMIN_API}/getmenudata/${id}`)
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
      .get(`${process.env.REACT_APP_ADMIN_API}/getmenudata/${id}`)
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
      .get(`${process.env.REACT_APP_ADMIN_API}/getmenudata/${id}`)
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
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-block btn-dark"
                      id="addBtn"
                      onClick={() => setSection("AddMenu")}
                    >
                      <img src="../../dist/img/add.svg" alt="Add" /> Add Dishes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid">
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
                      <div className="col-md-4 d-flex">
                        <button
                          type="button"
                          className="btn bg-transparent edit_Dish_btn"
                          title="Edit"
                          onClick={() => {
                            editModal(dish._id);
                          }}
                        >
                          <img src="../../dist/img/edit-b.svg" alt="Edit" />
                        </button>
                        <button
                          type="button"
                          className="btn bg-transparent delete_Dish_btn"
                          title="Delete"
                          onClick={() => {
                            deleteModal(dish._id, dish.dish_name);
                          }}
                        >
                          <img src="../../dist/img/delete-b.svg" alt="Delete" />
                        </button>
                        {dish.is_special ? (
                          // If dish.is_special is true, show the "Remove Special Dish" div
                          <div
                            className="bg-transparent m-1"
                            title="Remove Special Dish"
                            style={{ cursor: "pointer", width: "28px" }}
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
                              style={{ color: "black", fontSize: "18px" }}
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