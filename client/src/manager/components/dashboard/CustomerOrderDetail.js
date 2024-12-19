import React, { useState, useEffect } from "react";
import axios from "axios";

import DineInSection from "./DineInSection";
import DeliverySection from "./DeliverySection";
import TakeawaySection from "./TakeawaySection";

function CustomerOrderDetail({
  order,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  tableId,
  setTableId,
  orderId,
  setOrderId,
  setMainSection,
  orderType,
}) {
  const [tableInfo, setTableInfo] = useState({});
  const [paymentSection, setPaymentSection] = useState(false);

  const fetchTableInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_MANAGER_API}/gettabledata/${tableId}`,
        { withCredentials: true }
      );
      setTableInfo(response.data);
    } catch (error) {
      console.log("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTableInfo();
  }, [tableId]);

  const [orderInfo, setOrderInfo] = useState({});
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    anniversary: "",
    tag: [],
  });

  const orderKey = Object.keys(order)[0];
  const firstOrder = order[orderKey];

  useEffect(() => {
    if (order.order_items) {
      setOrderInfo({
        table_no: tableInfo.table_no,
        table_area: tableInfo.area,
        order_type: orderType,
        order_items: order.order_items.map((item) => ({
          dish_name: item.dish_name,
          quantity: item.quantity,
          dish_price: item.dish_price,
          special_notes: item.special_notes || "",
          status: item.status,
        })),
        order_status: firstOrder.order_status,
        customer_id: firstOrder.customer_id,
        customer_name: firstOrder.customer_name,
        total_persons: firstOrder.total_persons,
        comment: firstOrder.comment,
        waiter: firstOrder.waiter,
        bill_amount: order.order_items.reduce(
          (acc, item) => acc + item.dish_price * item.quantity,
          0
        ),
        discount_amount: firstOrder.discount_amount,
        total_amount: order.order_items.reduce(
          (acc, item) => acc + item.dish_price * item.quantity,
          0
        ),
      });
    }

    if (firstOrder.customer_id) {
      axios
        .get(
          `${process.env.REACT_APP_MANAGER_API}/getcustomerdata/${firstOrder.customer_id}`,
          { withCredentials: true }
        )
        .then((response) => {
          console.log(response.data);
          setCustomerInfo({
            name: response.data[0].name,
            email: response.data[0].email,
            phone: response.data[0].phone,
            date_of_birth: response.data[0].date_of_birth,
            anniversary: response.data[0].anniversary,
            tag: response.data[0].tag,
          });
        })
        .catch((error) => {
          console.log("Error fetching customer data:", error);
        });
    }

    if (
      orderInfo.order_status === "KOT" ||
      orderInfo.order_status === "KOT and Print"
    ) {
      setPaymentSection(true);
    }
  }, [order, tableInfo, orderType]);

  const displayMainSection = () => {
    if (orderType === "Dine In") {
      return (
        <DineInSection
          tableInfo={tableInfo}
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
        />
      );
    } else if (orderType === "Delivery") {
      return (
        <DeliverySection
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
        />
      );
    } else if (orderType === "Takeaway") {
      return (
        <TakeawaySection
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          customerInfo={customerInfo}
          setCustomerInfo={setCustomerInfo}
        />
      );
    }
  };

  const validateDeliveryFields = () => {
    if (orderType === "Delivery") {
      if (!customerInfo.name.trim()) {
        document.getElementById("error-message").innerHTML = "Customer name is required for delivery.";
        return false;
      }
      if (!customerInfo.phone.trim()) {
        document.getElementById("error-message").innerHTML = "Phone number is required for delivery.";
        return false;
      }
      if (!customerInfo.address.trim()) {
        document.getElementById("error-message").innerHTML = "Address is required for delivery.";
        return false;
      }
    }
    return true;
  };

  const orderController = async (orderStatus) => {
    // Validate required fields for delivery
    if (!validateDeliveryFields()) {
      return; // Stop execution if validation fails
    }

    const updatedOrderInfo = {
      ...orderInfo,
      order_status: orderStatus,
      order_id: orderId,
      customer_name: customerInfo.name,
    };
    console.log(updatedOrderInfo);
    setOrderInfo(updatedOrderInfo);

    const payload = {
      orderInfo: updatedOrderInfo,
      customerInfo,
    };

    if (tableId) {
      payload.table_id = tableId;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_MANAGER_API}/ordercontroller`,
        payload,
        { withCredentials: true }
      );

      console.log("Order status updated successfully:", response.data);

      if (response.data.status === "success") {
        setTableId("");
        setOrderId("");
        setMainSection("DashboardSection");
      }
    } catch (error) {
      console.log("Error saving order:", error);
    }
  };

  return (
    <div className="col-md-6">
      {displayMainSection()}

      <div
        className="m-3"
        style={{ height: "calc(100% - 210px)", overflow: "auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" className="text-center">
                Quantity
              </th>
              <th scope="col" className="text-right">
                Price
              </th>
              <th scope="col" className="text-center">
                Status
              </th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {order.order_items &&
              order.order_items.map((item) => (
                <tr key={item._id}>
                  <td>{item.dish_name}</td>
                  <td className="text-center">
                    {item.status === "Completed" ? (
                      <label>{item.quantity}</label>
                    ) : (
                      <>
                        <button
                          className="btn btn-danger"
                          onClick={() => decreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        <label className="mx-2">{item.quantity}</label>
                        <button
                          className="btn btn-success"
                          onClick={() => increaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </>
                    )}
                  </td>
                  <td className="text-right d-flex flex-column">
                    <label className="my-0">
                      &#8377; {item.dish_price * item.quantity}
                    </label>
                    <small style={{ textDecoration: "underline" }}>
                      &#8377; {item.dish_price}
                    </small>
                  </td>
                  <td className="text-center">
                    <label className="my-0">{item.status}</label>
                  </td>
                  <td className="text-center">
                    {item.status !== "Completed" && (
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item._id)}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="m-3 w-100" style={{ position: "absolute", bottom: 0 }}>
        <div
          className="text-danger"
          style={{ fontWeight: "bold" }}
          id="error-message"
        ></div>
        <div className="d-flex justify-content-between align-items-center p-2">
          <div>
            <button
              className="btn mx-2"
              type="button"
              onClick={() => orderController("Save")}
            >
              Save
            </button>
            <button
              className="btn mx-2"
              type="button"
              onClick={() => orderController("KOT")}
            >
              KOT
            </button>
            <button
              className="btn mx-2"
              type="button"
              onClick={() => orderController("KOT and Print")}
            >
              KOT and Print
            </button>
            <button className="btn mx-2">Cancel Order</button>
          </div>

          <div className="mx-5">
            <label className="m-0">
              Total - &#8377;{" "}
              {order.order_items &&
                order.order_items.reduce(
                  (acc, item) => acc + item.dish_price * item.quantity,
                  0
                )}
            </label>
            {paymentSection === true ? (
              <button
                className="btn mx-2"
                onClick={() => orderController("Paid")}
              >
                Paid
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerOrderDetail;
