import React, { useState, useEffect } from "react";
import axios from "axios";

function ViewKOTs() {
  const [kotData, setKotData] = useState([]);

  const fetchOrderData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/showkots`,
        {
          withCredentials: true,
        }
      );
      setKotData(response.data);
    } catch (error) {
      console.log("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  const updateDishStatus = async (orderId, dishId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_MANAGER_API}/updatedishstatus`,
        { orderId, dishId, status: "Completed" },
        { withCredentials: true }
      );
      fetchOrderData();
    } catch (error) {
      console.log("Error updating dish status:", error);
    }
  };

  const updateAllDishStatus = async (orderId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_MANAGER_API}/updatealldishstatus`,
        { orderId, status: "Completed" },
        { withCredentials: true }
      );
      fetchOrderData();
    } catch (error) {
      console.log("Error updating all dish statuses:", error);
    }
  };

  return (
    <>
      <section className="content" id="viewMenu">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Manage Kots</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row container-fluid">
          {kotData.map((data) => (
            <div key={data._id} className="col-md-4">
              <div className="card m-2">
                <h4 className="card-header" style={{ borderBottom: "none" }}>
                  {" "}
                  {data.customer_name}{" "}
                </h4>
                <div className="card-body">
                  {data.order_type === "Dine In" ? (
                    <div className="d-flex justify-content-around m-2">
                      <h5>Area: {data.table_area}</h5>
                      <h5>Table No.: {data.table_no}</h5>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-around m-2">
                      <h5>{data.order_type}</h5>
                    </div>
                  )}

                  {/* <hr /> */}
                  <div className="row">
                    <div className="col-md-6">
                      <b> Dish Name </b>
                    </div>
                    <div className="col-md-2">
                      <b> Quantity </b>
                    </div>
                    <div className="col-md-4">
                      <b> Action </b>
                    </div>
                  </div>
                  {/* <hr /> */}
                  {data.order_items.map((dish) => (
                    <div key={dish._id} className="row">
                      <div className="col-md-6">{dish.dish_name}</div>
                      <div className="col-md-2">{dish.quantity}</div>
                      <div className="col-md-4 d-flex">
                        {dish.status === "Prepairing" ? (
                          <button
                            type="button"
                            className="btn"
                            title="Completed"
                            onClick={() => updateDishStatus(data._id, dish._id)}
                          >
                            Completed
                          </button>
                        ) : dish.status === "Completed" ? (
                          <img src="../dist/img/Completed-b.svg" />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                  {/* <hr /> */}
                  <div className="m-2">
                    <span className="font-weight-bold">Comment : </span>
                    <span>{data.comment}</span>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    title="Order Completed"
                    onClick={() => updateAllDishStatus(data._id)}
                  >
                    All Complete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ViewKOTs;
