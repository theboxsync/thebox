import React, { useState, useEffect } from "react";
import axios from "axios";

function DashboardSection({
  setMainSection,
  setTableId,
  setOrderId,
  setOrderType,
}) {
  const [tableData, setTableData] = useState([]);
  const [specialDishes, setSpecialDishes] = useState([]);
  const [activeDeliveries, setActiveDeliveries] = useState([]);

  const fetchTableData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/table/gettabledata`,
        {
          withCredentials: true,
        }
      );
      setTableData(response.data);
    } catch (error) {
      console.log("Error fetching table data:", error);
    }
  };

  const fetchActiveDeliveries = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/order/getorderhistory`,
        { withCredentials: true }
      );

      // Filter orders based on the condition
      const deliveries = response.data.filter(
        (order) =>
          (order.order_type === "Delivery" ||
            order.order_type === "Takeaway") && // Past Pickup
          (order.order_status !== "Paid" ||
            order.order_items.some((item) => item.status === "Preparing"))
      );

      setActiveDeliveries(deliveries);
    } catch (error) {
      console.log("Error fetching active deliveries:", error);
    }
  };

  const fetchSpecialDishes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/menu/getmenudata`,
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
    fetchActiveDeliveries();
    fetchSpecialDishes();
  }, []);

  const onClickTable = async (tableId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/table/gettabledata/${tableId}`,
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

  return (
    <>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="row w-100">
                <div className="col-md-12">
                  <div className="card">
                    {/* <div className="card-header">
                      <h3 className="card-title">Table List</h3>
                    </div> */}
                    {tableData.map((table) => (
                      <div className="card-body p-0 m-2" key={table._id}>
                        <div className="m-3" style={{ fontWeight: "bold" }}>
                          {table.area}
                        </div>
                        <ul className="row" style={{ listStyle: "none" }}>
                          {table.tables.map((table) => (
                            <li key={table._id} className="pt-2">
                              <div className="container">
                                <div
                                  className={`dashboard-table d-flex justify-content-center align-items-center ${
                                    table.current_status === "Save"
                                      ? "table-save"
                                      : table.current_status === "KOT"
                                      ? "table-kot"
                                      : ""
                                  }`}
                                  onClick={() => onClickTable(table._id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  <div align="center">
                                    <span style={{ fontSize: "14px" }}>
                                      No.{" "}
                                    </span>
                                    <span style={{ fontSize: "26px" }}>
                                      {table.table_no}
                                    </span>
                                    <hr
                                      style={{
                                        margin: "0px",
                                        padding: "0px",
                                        border: "1px solid #212529",
                                      }}
                                    />
                                    <span style={{ fontSize: "14px" }}>
                                      {" "}
                                      Max Person :{" "}
                                    </span>
                                    <span style={{ fontSize: "16px" }}>
                                      {table.max_person}
                                    </span>
                                  </div>
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
          </div>
        </div>
      </section>
    </>
  );
}

export default DashboardSection;
