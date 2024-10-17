const User = require("../models/userModel");
const Table = require("../models/tableModel");
const Menu = require("../models/menuListModel");
const Inventory = require("../models/inventoryModel");
const Staff = require("../models/staffModel");
const Order = require("../models/orderModal");
const Customer = require("../models/customerModel");
const Manager = require("../models/managerModel");

const bcrypt = require("bcryptjs");

let token;

const emailCheck = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.json({ message: "User Already Exists" });
    } else {
      return res.json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  console.log(req.body);
  try {
    const { country, state } = req.body;

    if (!country || !state) {
      return res
        .status(400)
        .json({ message: "Country and state are required" });
    }

    // Generate the prefix for the restaurant code
    const countryPrefix = req.body.country.toUpperCase();
    const statePrefix = req.body.state.toUpperCase();

    // Find the highest existing code for this country and state
    const latestUser = await User.findOne({
      $and: [{ country: countryPrefix }, { state: statePrefix }],
    })
      .limit(1)
      .sort({ createdAt: -1 })
      .exec();
    let sequenceNumber = 1;

    if (latestUser) {
      const latestCode = latestUser.restaurant_code;
      const match = latestCode.match(
        new RegExp(`${statePrefix}(\\d+)${countryPrefix}`)
      );

      if (match) {
        sequenceNumber = parseInt(match[1], 10) + 1;
      }
    }

    const restaurantCode = `${statePrefix}${String(sequenceNumber).padStart(
      4,
      "0"
    )}${countryPrefix}`;

    // Create the new user with the generated restaurant code
    const userdata = { ...req.body, restaurant_code: restaurantCode };

    const newUser = new User(userdata);
    await newUser.save();

    const token = await newUser.generateAuthToken();
    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.json({ message: "Registered", restaurant_code: restaurantCode });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.json({ message: "User Not Found, Please register" });
    }

    const matchPass = await bcrypt.compare(password, userExists.password);
    if (!matchPass) {
      return res.json({ message: "Wrong Password" });
    } else {
      token = await userExists.generateAuthToken();
      res.cookie("jwttoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      return res.status(200).json({ message: "Logged In" });
    }
  } catch (error) {
    console.log(error);
  }
};

const managerLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { restaurant_code, username, password } = req.body;

    const user = await User.findOne({ restaurant_code });

    if (!user) {
      console.log("User not found");
      return res.json({ message: "Invalid restaurant code" });
    }
    console.log("user : " + user);
    const manager = await Manager.findOne({
      username,
      restaurant_id: user._id,
    });

    if (!manager) {
      return res.json({ message: "Invalid Username" });
    }

    const isMatch = await bcrypt.compare(password, manager.password);

    if (!isMatch) {
      return res.json({ message: "Invalid Password" });
    }

    token = await user.generateAuthToken();
    res.cookie("jwttoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    });

    res.status(200).json({ message: "Logged In", token });
  } catch (error) {
    console.log(error);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwttoken");
    res.status(200).json({ message: "Logged Out" });
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async (req, res) => {
  try {
    if (req.user != null) {
      const user = req.user;
      const userdata = await User.findOne({ _id: user._id });
      res.send(userdata);
    } else {
      res.send("Null");
    }
  } catch (error) {
    console.log(error);
  }
};

const addMenu = (req, res) => {
  try {
    console.log(req.body);
    const menuData = { ...req.body, hotel_id: req.user };
    const category = req.body.category;

    Menu.findOne({ category: category, hotel_id: req.user })
      .then((data) => {
        if (data) {
          Menu.findOneAndUpdate(
            { category: category, hotel_id: req.user },
            {
              $push: { dishes: req.body.dishes },
            }
          )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          Menu.create(menuData)
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getMenuData = (req, res) => {
  try {
    Menu.find({ hotel_id: req.user })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getMenuDataById = (req, res) => {
  try {
    const dishId = req.params.id;

    Menu.findOne({ "dishes._id": dishId })
      .then((data) => {
        const dish = data.dishes.find((d) => d._id.toString() === dishId);
        res.json(dish);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const updateMenu = (req, res) => {
  try {
    const dishId = req.params.id;
    const { dish_name, dish_price } = req.body; // Extract only the fields to be updated

    Menu.updateOne(
      { "dishes._id": dishId }, // Find the menu document containing the dish with the specified ID
      {
        $set: {
          "dishes.$.dish_name": dish_name, // Update the dish name
          "dishes.$.dish_price": dish_price // Update the dish price
        }
      }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const deleteMenu = (req, res) => {
  try {
    const dishId = req.params.id; // This is the dish ID you want to delete
    Menu.updateOne(
      { "dishes._id": dishId }, // Find the menu document containing the dish with the specified ID
      { $pull: { dishes: { _id: dishId } } } // Pull (remove) the dish with the specified ID from the dishes array
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const setSpecialMenu = (req, res) => {
  try {
    console.log(req.params.id);
    const dishId = req.params.id;
    Menu.updateOne({ "dishes._id": dishId }, { $set: {
      "dishes.$.is_special": true
    } })
      .then((data) => {
        console.log(data);
        res.json(data)
      })
      .catch((err) => res.json(err));
  } catch {
    console.log(error);
    res.status(500).send("An error occurred");
  }
}

const removeSpecialMenu = (req, res) => {
  try {
    console.log(req.params.id);
    const dishId = req.params.id;
    Menu.updateOne({ "dishes._id": dishId }, { $set: {
      "dishes.$.is_special": false
    } })
      .then((data) => {
        console.log(data);
        res.json(data)
      })
      .catch((err) => res.json(err));
  } catch {
    console.log(error);
    res.status(500).send("An error occurred");
  }
}
const addInvetory = (req, res) => {
  try {
    console.log(req.body);
    const inventoryData = { ...req.body, hotel_id: req.user };
    Inventory.create(inventoryData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getStaffData = (req, res) => {
  try {
    Staff.find({ hotel_id: req.user })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};
const addStaff = (req, res) => {
  try {
    console.log(req.body);
    const staffData = { ...req.body, hotel_id: req.user };
    Staff.create(staffData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getTableData = (req, res) => {
  try {
    Table.find({ hotel_id: req.user })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getTableDataById = (req, res) => {
  try {
    const tableId = req.params.id;
    Table.findOne({ "tables._id": tableId })
      .then((data) => {
        const area = data.area;
        const table = data.tables.find((t) => t._id.toString() === tableId);
        const tableData = { ...table.toObject(), area };
        res.json(tableData);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};
const addTable = (req, res) => {
  try {
    console.log(req.body);
    const tableData = { ...req.body, hotel_id: req.user };
    const area = req.body.area;

    Table.findOne({ area: area, hotel_id: req.user }).then((data) => {
      if (data) {
        Table.findOneAndUpdate(
          { area: area, hotel_id: req.user },
          {
            $push: { tables: req.body.tables },
          }
        )
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      } else {
        Table.create(tableData)
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTable = (req, res) => {
  try {
    const tableData = req.body;
    Table.updateOne({ _id: tableData._id }, tableData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const deleteTable = (req, res) => {
  try {
    const tableId = req.params.id;
    Table.updateOne(
      { "tables._id": tableId },
      { $pull: { tables: { _id: tableId } } }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const addOrder = (req, res) => {
  try {
    const orderData = { ...req.body, restaurant_id: req.user };
    Order.create(orderData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = (req, res) => {
  try {
    const orderData = req.body;
    Order.updateOne({ _id: orderData._id }, orderData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

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
  try {
    Order.find({ _id: req.params.id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const orderController = async (req, res) => {
  try {
    let orderData = { ...req.body.orderInfo, restaurant_id: req.user };
    const tableId = req.body.table_id;
    const customerInfo = req.body.customerInfo;

    if (customerInfo.phone !== "" || customerInfo.email !== "") {
      const customer = new Customer(customerInfo);
      const savedCustomer = await customer.save();

      orderData = { ...orderData, customer_id: savedCustomer._id };
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

    let savedOrder;

    if (table.current_status === "Empty" || table.order_id === null) {
      const newOrder = new Order(orderData);
      savedOrder = await newOrder.save();

      table.current_status = savedOrder.order_status;
      table.order_id = savedOrder._id;
    } else {
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

    res.status(200).json({
      status: "success",
      message: "Order processed successfully",
      order: savedOrder,
      table: tableDocument,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const showKOTs = async (req, res) => {
  try {
    const orderData = await Order.find({
      $and: [
        { restaurant_id: req.user },
        { $or: [{ order_status: "KOT" }, { order_status: "KOT and Print" }] },
      ],
    });

    res.json(orderData);
  } catch (error) {
    console.log(error);
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

const addManager = (req, res) => {
  try {
    const managerData = { ...req.body, restaurant_id: req.user };
    console.log(managerData);
    Manager.create(managerData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  managerLogin,
  logout,
  getUserData,
  emailCheck,
  addMenu,
  addInvetory,
  getStaffData,
  addStaff,
  getTableData,
  addTable,
  updateTable,
  deleteTable,
  getMenuData,
  deleteMenu,
  setSpecialMenu,
  removeSpecialMenu,
  getMenuDataById,
  updateMenu,
  addOrder,
  addCustomer,
  getTableDataById,
  updateOrder,
  orderController,
  getOrderData,
  getCustomerData,
  showKOTs,
  orderHistory,
  addManager,
};
