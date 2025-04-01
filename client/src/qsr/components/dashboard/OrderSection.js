import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderMenuShow from "./OrderMenuShow";
import CustomerOrderDetail from "./CustomerOrderDetail";

function OrderSection({
  setMainSection,
  tableId,
  orderId,
  setOrderId,
  setTableId,
  orderType,
}) {
  const [order, setOrder] = useState({
    _id: "",
    table_no: "",
    table_area: "",
    order_type: "",
    order_items: [],
    order_status: "",
    customer_id: "",
    customer_name: "",
    total_persons: 0,
    comment: "",
    waiter: "",
    bill_amount: 0,
    discount_amount: 0,
    total_amount: 0,
    order_source: "QSR",
  });

  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_QSR_API}/order/getorderdata/${orderId}`,
        {
          withCredentials: true,
        }
      );
      setOrder(response.data);
      setOrderItems(response.data[0].order_items || []); // Store order_items separately
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  };

  const addItemToOrder = (item) => {
    setOrderItems((prevOrderItems) => {
      const existingItemIndex = prevOrderItems.findIndex(
        (orderItem) =>
          orderItem.dish_name === item.dish_name &&
          orderItem.status !== "Completed"
      );

      if (existingItemIndex > -1) {
        // If the dish is already in the order and not "Completed", increase its quantity
        return prevOrderItems.map((orderItem, index) =>
          index === existingItemIndex
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        );
      } else {
        // Add the dish as a new entry
        return [
          ...prevOrderItems,
          { ...item, quantity: 1, status: "Pending" },
        ];
      }
    });
  };

  const increaseQuantity = (itemId) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.map((item) =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems
        .map((item) =>
          item._id === itemId && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setOrderItems((prevOrderItems) =>
      prevOrderItems.filter((item) => item._id !== itemId)
    );
  };

  const orderReset = () => {
    setOrder({
      _id: "",
      table_no: "",
      table_area: "",
      order_type: "",
      order_items: [],
      order_status: "",
      customer_id: "",
      customer_name: "",
      total_persons: 0,
      comment: "",
      waiter: "",
      bill_amount: 0,
      discount_amount: 0,
      total_amount: 0,
      order_source: "QSR",
    });
    setOrderItems([]);
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Order Management</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-block btn-dark"
                    onClick={() => {
                      setMainSection("DashboardSection");
                      setOrderId("");
                      setTableId("");
                    }}
                  >
                    Go To Dashboard
                  </button>
                </div>
              </div>
              <div className="card-body row p-0" style={{ height: "80vh" }}>
                <OrderMenuShow addItemToOrder={addItemToOrder} />
                <CustomerOrderDetail
                  order={{ ...order, order_items: orderItems }} // Pass combined order object
                  orderReset={orderReset}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  removeItem={removeItem}
                  tableId={tableId}
                  orderId={orderId}
                  setOrderId={setOrderId}
                  setTableId={setTableId}
                  setMainSection={setMainSection}
                  orderType={orderType}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSection;
