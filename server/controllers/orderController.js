const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const TokenCounter = require("../models/TokenCounter");
const Table = require("../models/tableModel");

const cron = require("node-cron");

const addCustomer = (req, res) => {
  try {
    const customerData = { ...req.body, restaurant_id: req.user };
    Customer.create(customerData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getCustomerData = (req, res) => {
  try {
    Customer.find({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getOrderData = (req, res) => {
  console.log(req.params.id);
  try {
    Order.find({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();
    const dateOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    await TokenCounter.deleteMany({ date: { $lt: dateOnly } });
    console.log("Token counter reset successfully.");
  } catch (error) {
    console.error("Error resetting token counter:", error);
  }
});

const generateToken = async (restaurant_id, source) => {
  const today = new Date();
  const dateOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  let tokenCounter = await TokenCounter.findOne({
    date: dateOnly,
    restaurant_id,
    source,
  });

  if (!tokenCounter) {
    tokenCounter = new TokenCounter({
      date: dateOnly,
      lastToken: 0,
      restaurant_id: restaurant_id,
      source: source,
    });
  }

  tokenCounter.lastToken += 1;
  await tokenCounter.save();

  return tokenCounter.lastToken;
};

const orderController = async (req, res) => {
  try {
    console.log(req.body);
    let orderData = { ...req.body.orderInfo, restaurant_id: req.user };
    const { table_id: tableId, customerInfo } = req.body;
    const orderId = orderData.order_id; // Extract order_id from the request body
    let savedOrder;

    // Handle customer creation if customer info is provided
    if (customerInfo.phone !== "" || customerInfo.email !== "") {
      const customer = new Customer(customerInfo);
      const savedCustomer = await customer.save();
      orderData = { ...orderData, customer_id: savedCustomer._id };
    }

    if (orderData.order_status === "KOT" || orderData.order_source === "QSR") {
      orderData.order_items = orderData.order_items.map((item) => ({
        ...item,
        status: item.status === "Pending" ? "Preparing" : item.status,
      }));
    }

    if (orderData.order_status === "Cancelled") {
      orderData.order_items = orderData.order_items.map((item) => ({
        ...item,
        status: "Cancelled",
      }));

      savedOrder = await Order.findByIdAndUpdate(orderId, orderData, {
        new: true,
      });

      if (!savedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.status(200).json({
        status: "success",
        message: "Order updated successfully",
        order: savedOrder,
      });
    }

    // Process based on order type
    if (orderData.order_type === "Dine In") {
      // Ensure table information is present for Dine In
      if (!tableId) {
        return res
          .status(400)
          .json({ message: "Table ID is required for Dine In orders" });
      }

      // Find the table
      const tableDocument = await Table.findOne({ "tables._id": tableId });

      if (!tableDocument) {
        return res.status(404).json({ message: "Table not found" });
      }

      const table = tableDocument.tables.id(tableId);

      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }

      if (table.current_status === "Empty" || table.order_id === null) {
        // Create a new order and link it to the table
        const newOrder = new Order(orderData);
        savedOrder = await newOrder.save();
        table.current_status = savedOrder.order_status;
        table.order_id = savedOrder._id;
      } else {
        // Update existing order linked to the table
        savedOrder = await Order.findByIdAndUpdate(table.order_id, orderData, {
          new: true,
        });
        if (savedOrder.order_status !== "Paid") {
          table.current_status = savedOrder.order_status;
        } else {
          table.current_status = "Empty";
          table.order_id = null;
        }
      }

      // Save the updated table document
      await tableDocument.save();

      return res.status(200).json({
        status: "success",
        message: "Order processed successfully",
        order: savedOrder,
        table: tableDocument,
      });
    } else {
      if (
        orderData.order_type === "Takeaway" ||
        orderData.order_type === "QSR Dine In"
      ) {
        if (!orderId) {
          // Generate a new token for Takeaway orders
          orderData.token = await generateToken(
            req.user,
            orderData.order_source
          );
        }
      }
      // For Delivery or Pickup, check if an order_id is provided
      if (orderId) {
        // Update the existing order
        savedOrder = await Order.findByIdAndUpdate(orderId, orderData, {
          new: true,
        });

        if (!savedOrder) {
          return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json({
          status: "success",
          message: "Order updated successfully",
          order: savedOrder,
        });
      } else {
        // Create a new order
        const newOrder = new Order(orderData);
        savedOrder = await newOrder.save();
        const insertedOrderId = savedOrder._id;

        return res.status(200).json({
          status: "success",
          message: "Order created successfully",
          order: savedOrder,
          orderId: insertedOrderId,
        });
      }
    }
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const orderHistory = async (req, res) => {
  try {
    const orderData = await Order.find({ restaurant_id: req.user });
    res.json(orderData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addCustomer,
  getOrderData,
  getCustomerData,
  orderController,
  orderHistory,
};
