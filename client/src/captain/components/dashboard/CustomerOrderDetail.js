import React, { useState, useEffect } from "react";
import axios from "axios";
import { Country, State, City } from "country-state-city";

import DineInSection from "./DineInSection";
import DeliverySection from "./DeliverySection";
import TakeawaySection from "./TakeawaySection";
import PaymentModal from "./PaymentModal";

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
  const [printSection, setPrintSection] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    paidAmount: "",
    paymentType: "Cash",
    subTotal: "",
    total: "",
    discountAmount: "",
  });
  const [taxRates, setTaxRates] = useState({});

  // Fetch Tax Info
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_CAPTAIN_API}/user/userdata`, {
        withCredentials: true,
      })
      .then((response) => {
        setTaxRates({
          cgst: response.data.taxInfo.cgst,
          sgst: response.data.taxInfo.sgst,
        });
      })
      .catch((error) => {
        console.error("Error fetching tax rates:", error);
      });
  }, []);

  const fetchTableInfo = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/table/gettabledata/${tableId}`,
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

  const [orderInfo, setOrderInfo] = useState([]);
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
        bill_amount: 0,
        sub_total: 0,
        cgst_amount: firstOrder.cgst_amount,
        sgst_amount: firstOrder.sgst_amount,
        discount_amount: firstOrder.discount_amount,
        total_amount: 0,
        payment_type: "",
        order_source: "Manager",
      });
    }

    if (firstOrder.customer_id) {
      axios
        .get(
          `${process.env.REACT_APP_CAPTAIN_API}/order/getcustomerdata/${firstOrder.customer_id}`,
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

    if (orderInfo.order_status === "KOT") {
      setPaymentSection(true);
    }
  }, [order, tableInfo, orderType]);

  useEffect(() => {
    if (order.order_items) {
      const calculatedTotal = order.order_items.reduce(
        (acc, item) => acc + item.dish_price * item.quantity,
        0
      );

      // Update paymentData.subTotal
      setPaymentData((prev) => ({
        ...prev,
        subTotal: calculatedTotal.toFixed(2),
      }));
    }
  }, [order.order_items, orderType]);

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
        document.getElementById("error-message").innerHTML =
          "Customer name is required for delivery.";
        return false;
      }
      if (!customerInfo.phone.trim()) {
        document.getElementById("error-message").innerHTML =
          "Phone number is required for delivery.";
        return false;
      }
      if (!customerInfo.address.trim()) {
        document.getElementById("error-message").innerHTML =
          "Address is required for delivery.";
        return false;
      }
    }
    return true;
  };

  const orderController = async (orderStatus, paymentData) => {
    if (!validateDeliveryFields()) {
      return;
    }

    const updatedOrderInfo = {
      ...orderInfo,
      order_status: orderStatus,
      order_id: orderId,
      customer_name: customerInfo.name,
      cgst_amount: taxRates.cgst,
      sgst_amount: taxRates.sgst,
    };

    if (updatedOrderInfo.order_status === "Paid") {
      updatedOrderInfo.sub_total = parseFloat(paymentData.subTotal);
      updatedOrderInfo.total_amount = parseFloat(paymentData.total);
      updatedOrderInfo.discount_amount = parseFloat(paymentData.discountAmount);
      updatedOrderInfo.bill_amount = parseFloat(paymentData.paidAmount);
      updatedOrderInfo.payment_type = paymentData.paymentType;
    }

    console.log("Updated Order Info:", updatedOrderInfo); // Debugging

    const payload = {
      orderInfo: updatedOrderInfo,
      customerInfo,
    };

    if (tableId) {
      payload.table_id = tableId;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_CAPTAIN_API}/order/ordercontroller`,
        payload,
        { withCredentials: true }
      );

      console.log("Order status updated successfully:", response.data);

      if (response.data.status === "success" && orderStatus !== "Paid") {
        setTableId("");
        setOrderId("");
        setMainSection("DashboardSection");
      }
      if (response.data.status === "success" && orderStatus === "Paid") {
        setShowPaymentModal(false);
        setPaymentSection(false);
        setPrintSection(true);
      }
    } catch (error) {
      console.log("Error saving order:", error);
    }
  };

  const handlePrint = async (orderId) => {
    try {
      const orderResponse = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/order/getorderdata/${orderId}`,
        { withCredentials: true }
      );

      const userResponse = await axios.get(
        `${process.env.REACT_APP_CAPTAIN_API}/user/userdata`,
        { withCredentials: true }
      );

      const order = orderResponse.data[0];
      const userData = userResponse.data;

      const printDiv = document.createElement("div");
      printDiv.id = "printable-invoice";
      printDiv.style.display = "none";
      document.body.appendChild(printDiv);

      printDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; border: 1px solid #ccc; padding: 10px;">
          <div style="text-align: center; margin-bottom: 10px;">
            <h3 style="margin: 10px;">${userData.name}</h3>
            <p style="margin: 0; font-size: 12px;">${userData.address}</p>
            <p style="margin: 0; font-size: 12px;">${userData.city}, ${
        userData.state
      } ${userData.pincode}</p>
            <p style="margin: 10px; font-size: 12px;"><strong>Phone: </strong> ${
              userData.mobile
            }</p>
          </div>
          <hr style="border: 0.5px dashed #ccc;" />
          <p><strong>Name:</strong> ${
            order.customer_name || "(M: 1234567890)"
          }</p>
          <hr style="border: 0.5px dashed #ccc;" />
          <table style="font-size: 12px; margin-bottom: 10px;">
            <tr>
            <td style="width: 50%; height: 30px;">
              <strong>Date:</strong> ${new Date(
                order.order_date
              ).toLocaleString()}</td>
                <td style="text-align: right;"><strong>${
                  order.order_type
                }</strong>
                </td>
            </tr>
            <tr>
            <td colspan="2"><strong>Bill No:</strong> ${order._id}</td>
            
            </tr>
          </table>
          <hr style="border: 0.5px dashed #ccc;" />
          <table style="width: 100%; font-size: 12px; margin-bottom: 10px;">
            <thead>
              <tr>
                <th style="text-align: left; border-bottom: 1px dashed #ccc">Item</th>
                <th style="text-align: center; border-bottom: 1px dashed #ccc">Qty</th>
                <th style="text-align: center; border-bottom: 1px dashed #ccc">Price</th>
                <th style="text-align: right; border-bottom: 1px dashed #ccc">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${order.order_items
                .map(
                  (item) => `
                  <tr>
                    <td>${item.dish_name}</td>
                    <td style="text-align: center;">${item.quantity}</td>
                    <td style="text-align: center;">${item.dish_price}</td>
                    <td style="text-align: right;">₹ ${
                      item.dish_price * item.quantity
                    }</td>
                  </tr>
                `
                )
                .join("")}
              <tr>
                <td colspan="3" style="text-align: right; border-top: 1px dashed #ccc"><strong>Sub Total: </strong></td>
                <td style="text-align: right; border-top: 1px dashed #ccc">₹ ${
                  order.sub_total
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>CGST (${
                  order.cgst_amount
                } %):</strong></td>
                <td style="text-align: right;">₹ ${
                  (order.cgst_amount * order.bill_amount) / 100
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>SGST (${
                  order.sgst_amount
                } %):</strong></td>
                <td style="text-align: right;">₹ ${
                  (order.sgst_amount * order.bill_amount) / 100
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>Total: </strong></td>
                <td style="text-align: right;">₹ ${order.total_amount}</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right;"><strong>Discount: </strong></td>
                <td style="text-align: right;">- ₹ ${
                  order.discount_amount || 0
                }</td>
              </tr>
              <tr>
                <td colspan="3" style="text-align: right; border-top: 1px dashed #ccc"><strong>Paid Amount: </strong></td>
                <td style="text-align: right; border-top: 1px dashed #ccc">₹ ${
                  order.bill_amount
                }</td>
              </tr>
            </tbody>
          </table>
          <hr style="border: 0.5px dashed #ccc;" />
          <div style="text-align: center; font-size: 12px;">
            <p style="margin: 10px; font-size: 12px;"><strong>FSSAI Lic No:</strong> 11224333001459</p>
            <p style="margin: 10px; font-size: 12px;"><strong>GST No:</strong> ${
              userData.gst_no
            }</p>
            <p style="margin: 10px; font-size: 12px;"><strong>Thanks, Visit Again</strong></p>
          </div>
        </div>
      `;

      const printWindow = window.open("", "_blank");
      printWindow.document.write(printDiv.innerHTML);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();

      document.body.removeChild(printDiv);
      setPaymentSection(false);
    } catch (error) {
      console.error("Error fetching order or user data:", error);
    }
  };

  return (
    <>
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
              {orderId && <button className="btn mx-2" type="button" onClick={() => orderController("Cancelled")}>Cancel Order</button>}
            </div>

            <div className="mx-5">
              <label className="m-0">
                Total: &#8377; {paymentData.subTotal}
              </label>
              {paymentSection === true ? (
                <button
                  className="btn mx-2"
                  onClick={() => setShowPaymentModal(true)}
                >
                  Paid
                </button>
              ) : (
                <></>
              )}
              {printSection === true ? (
                <>
                  {printSection && (
                    <button
                      className="btn mx-2"
                      onClick={() => handlePrint(orderId)}
                    >
                      Print
                    </button>
                  )}
                  <button
                    className="btn mx-2"
                    onClick={() => setMainSection("DashboardSection")}
                  >
                    Go To Dashboard
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <PaymentModal
          show={showPaymentModal}
          handleClose={() => setShowPaymentModal(false)}
          paymentData={paymentData}
          setPaymentData={setPaymentData}
          orderController={orderController}
          taxRates={taxRates}
        />
      </div>
    </>
  );
}

export default CustomerOrderDetail;
