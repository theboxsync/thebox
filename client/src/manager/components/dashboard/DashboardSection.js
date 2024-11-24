import React, { useState, useEffect } from "react";
import axios from "axios";

import RemoveSpecialModal from "./RemoveSpecialModal";
import utensilsslash from "../../../dist/img/icon/utensilsslash.svg";

function DashboardSection({
  setMainSection,
  setTableId,
  setOrderId,
  setOrderType,
}) {
  const [tableData, setTableData] = useState([]);
  const [showRemoveSpecialModal, setShowRemoveSpecialModal] = useState(false);
  const [specialDishes, setSpecialDishes] = useState([]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/gettabledata`,
        {
          withCredentials: true,
        }
      );
      setTableData(response.data);
    } catch (error) {
      console.log("Error fetching table data:", error);
    }
  };

  const fetchSpecialDishes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/getmenudata`,
        {
          withCredentials: true,
        }
      );

      // Flatten the special dishes into a single array
      const specialDishes = response.data
        .flatMap((category) => category.dishes)
        .filter((dish) => dish.is_special);

      setSpecialDishes(specialDishes);
    } catch (error) {
      console.log("Error fetching special dishes:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
    fetchSpecialDishes();
  }, []);

  const onClickTable = async (tableId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/gettabledata/${tableId}`,
        {
          withCredentials: true,
        }
      );
      const tableInfo = response.data;
      setTableId(tableId);
      setOrderId(tableInfo.order_id);
      setOrderType("Dine In");
      setMainSection("OrderSection"); // Pass order_id to OrderSection
    } catch (error) {
      console.log("Error fetching table details:", error);
    }
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
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <button
                    className="btn text-center mx-3"
                    onClick={() => {
                      setOrderType("Delivery");
                      setMainSection("OrderSection");
                    }}
                  >
                    Delivery
                  </button>
                  <button
                    className="btn text-center mx-3"
                    onClick={() => {
                      setOrderType("Pickup");
                      setMainSection("OrderSection");
                    }}
                  >
                    Pick up
                  </button>
                </div>
              </div>
              <div className="row w-100 px-2"></div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Table List</h3>
                </div>
                {tableData.map((table) => (
                  <div className="card-body p-0 m-2" key={table._id}>
                    <div className="m-3" style={{ fontWeight: "bold" }}>
                      {table.area}
                    </div>
                    <ul className="row" style={{ listStyle: "none" }}>
                      {table.tables.map((table) => (
                        <li key={table._id}>
                          <div className="container">
                            <div
                              className={`dashboard-table d-flex justify-content-center align-items-center ${
                                table.current_status === "Save"
                                  ? "table-save"
                                  : table.current_status === "KOT" ||
                                    table.current_status === "KOT and Print" ||
                                    table.current_status === "Order Delevered"
                                  ? "table-kot"
                                  : ""
                              }`}
                              onClick={() => onClickTable(table._id)}
                              style={{ cursor: "pointer" }}
                            >
                              <div align="center">{table.table_no}</div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content mb-5" id="viewMenu">
        <div className="container-fluid">
          <div className="row" style={{ borderBottom: "0px" }}>
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Special Dishes</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid" id="menuData">
          {specialDishes.map((dish) => (
            <div key={dish._id} className="col-md-4 mb-5">
              <div className="card m-2">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <b>{dish.dish_name}</b>
                    </div>
                    <div className="col-md-2">{dish.dish_price}</div>
                    <div className="col-md-4">
                      <div
                        className="bg-transparent m-1"
                        title="Remove Special Dish"
                        style={{ cursor: "pointer", width: "32px" }}
                        onClick={() => removeSpecialModal(dish._id)}
                      >
                        <img src={utensilsslash} alt="Remove Special Dish" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <RemoveSpecialModal
        show={showRemoveSpecialModal}
        handleClose={() => setShowRemoveSpecialModal(false)}
        data={removeSpecialModalData}
        fetchMenuData={fetchSpecialDishes}
      />
    </>
  );
}

export default DashboardSection;
