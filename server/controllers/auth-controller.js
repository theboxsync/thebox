const User = require("../models/userModel");
const Table = require("../models/tableModel");
const Menu = require("../models/menuListModel");
const Inventory = require("../models/inventoryModel");
const Staff = require("../models/staffModel");
const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const Manager = require("../models/managerModel");

const fs = require("fs");
const path = require("path");

// const { sendEmail } = require("../utils/emailService");

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

const sendAdminOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await user.save();

    // Send OTP via email
    // await sendEmail({
    //   to: email,
    //   subject: "Your OTP for Password Reset",
    //   text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    // });

    res.json({ message: "OTP sent to your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while sending OTP." });
  }
};

const verifyAdminOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    if (user.otp !== parseInt(otp, 10) || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // OTP is valid
    res.json({ message: "OTP verified successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while verifying OTP." });
  }
};

const resetAdminPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found." });
    }

    user.password = newPassword;

    // Clear OTP fields
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Password reset successfully." });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while resetting password." });
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

const getManagerData = async (req, res) => {
  try {
    if (req.user != null) {
      const manager = req.user;
      const managerdata = await Manager.find({ restaurant_id: manager._id });
      res.send(managerdata);
    } else {
      res.send("Null");
    }
  } catch (error) {
    console.log(error);
  }
};

const getManagerDataById = async (req, res) => {
  try {
    const manager = await Manager.findById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    res.json(manager);
  } catch (error) {
    console.error("Error fetching manager:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateManager = async (req, res) => {
  try {
    const { id } = req.params;
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    const updatedManager = await Manager.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedManager);
  } catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteManager = async (req, res) => {
  Manager.findByIdAndDelete(req.params.id)
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(500).json({ message: "Error deleting manager", error: err })
    );
};

const changeManagerPassword = async (req, res) => {
  const { adminPassword, newPassword, managerId } = req.body;

  try {
    // Verify admin password
    const admin = await User.findById(req.user); // Assuming admin is logged in
    if (!admin) return res.status(404).json({ message: "Admin not found." });

    const isMatch = await bcrypt.compare(adminPassword, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid admin password." });

    // Hash new password and update manager password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Manager.findByIdAndUpdate(managerId, { password: hashedPassword });

    res.status(200).json({ message: "Manager password updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred." });
  }
};

const addMenu = (req, res) => {
  try {
    console.log(req.body);
    const menuData = { ...req.body, hotel_id: req.user };
    const category = req.body.category;
    const mealType = req.body.meal_type;

    Menu.findOne({
      category: category,
      meal_type: mealType,
      hotel_id: req.user,
    })
      .then((data) => {
        if (data) {
          Menu.findOneAndUpdate(
            { category: category, meal_type: mealType, hotel_id: req.user },
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

const getMenuData = async (req, res) => {
  try {
    // Extract query parameters
    const { mealType, category, searchText } = req.query;

    // Build the query object
    const query = { hotel_id: req.user };

    // Add mealType filter if provided
    if (mealType) {
      query.meal_type = mealType;
    }

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Add searchText filter if provided
    if (searchText) {
      query["dishes.dish_name"] = { $regex: searchText, $options: "i" }; // Case-insensitive regex
    }

    // Fetch filtered menu data
    const menuData = await Menu.find(query);
    res.json(menuData);
  } catch (error) {
    console.error("Error fetching menu data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMenuCategories = async (req, res) => {
  try {
    // Retrieve unique category names
    const categories = await Menu.distinct("category", { hotel_id: req.user });
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
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
          "dishes.$.dish_price": dish_price, // Update the dish price
        },
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
    Menu.updateOne(
      { "dishes._id": dishId },
      {
        $set: {
          "dishes.$.is_special": true,
        },
      }
    )
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const removeSpecialMenu = (req, res) => {
  try {
    console.log(req.params.id);
    const dishId = req.params.id;
    Menu.updateOne(
      { "dishes._id": dishId },
      {
        $set: {
          "dishes.$.is_special": false,
        },
      }
    )
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const getInventoryData = (req, res) => {
  try {
    Inventory.find({ restaurant_id: req.user })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getInventoryDataById = (req, res) => {
  try {
    const inventoryId = req.params.id;
    Inventory.findOne({ _id: inventoryId })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const addInvetory = (req, res) => {
  try {
    console.log(req.body);
    const inventoryData = { ...req.body, restaurant_id: req.user };
    Inventory.create(inventoryData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const updateInventory = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // Find the inventory item by ID and update it with the new data
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators for updated fields
      }
    );

    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({
      message: "Inventory updated successfully",
      data: updatedInventory,
    });
  } catch (error) {
    console.error("Error updating inventory:", error);
    res.status(500).json({ message: "Failed to update inventory", error });
  }
};

const deleteInventory = (req, res) => {
  try {
    const inventoryId = req.params.id; // This is the inventory ID you want to delete
    Inventory.deleteOne({ _id: inventoryId })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

const completeInventoryRequest = async (req, res) => {
  const { _id, bill_images, ...updateData } = req.body;

  try {
    const inventory = await Inventory.findByIdAndUpdate(
      _id,
      { ...updateData, bill_images, status: "Completed" },
      { new: true }
    );
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory", error });
  }
};

const rejectInventoryRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const inventory = await Inventory.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true }
    );
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }
    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating inventory", error });
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

const getStaffDataById = (req, res) => {
  try {
    const staffId = req.params.id;
    Staff.findOne({ _id: staffId }).then((data) => {
      res.json(data);
    });
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

const updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const updatedData = req.body;

    // Find the existing staff member by ID to check for old images
    const existingStaff = await Staff.findById(staffId);

    if (!existingStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (updatedData.photo !== null) {
      if (existingStaff.photo) {
        console.log("Photo Found");
        const oldPhotoPath = path.join(
          __dirname,
          `../uploads/staff/profile/${existingStaff.photo}`
        );
        console.log("Old Path : ", oldPhotoPath);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        } else {
          console.log("Photo Not Found");
        }
      }
    } else {
      updatedData.photo = existingStaff.photo;
    }

    if (updatedData.front_image !== null) {
      if (existingStaff.front_image) {
        const oldFrontImagePath = path.join(
          __dirname,
          `../uploads/staff/id_cards/${existingStaff.front_image}`
        );
        if (fs.existsSync(oldFrontImagePath)) {
          fs.unlinkSync(oldFrontImagePath);
        }
      }
    } else {
      updatedData.front_image = existingStaff.front_image;
    }

    if (updatedData.back_image !== null) {
      if (existingStaff.back_image) {
        const oldBackImagePath = path.join(
          __dirname,
          `../uploads/staff/id_cards/${existingStaff.back_image}`
        );
        if (fs.existsSync(oldBackImagePath)) {
          fs.unlinkSync(oldBackImagePath);
        }
      }
    } else {
      updatedData.back_image = existingStaff.back_image;
    }

    // Update the staff data in the database
    const updatedStaff = await Staff.findByIdAndUpdate(staffId, updatedData, {
      new: true,
    });

    res.json({ message: "Staff updated successfully", staff: updatedStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staffId = req.params.id; // This is the staff ID you want to delete
    const staffData = await Staff.findById(staffId);

    if (!staffData) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (staffData.photo) {
      console.log("Photo Found");
      const oldPhotoPath = path.join(
        __dirname,
        `../uploads/staff/profile/${staffData.photo}`
      );
      console.log("Old Path : ", oldPhotoPath);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      } else {
        console.log("Photo Not Found");
      }
    }

    if (staffData.front_image) {
      const oldFrontImagePath = path.join(
        __dirname,
        `../uploads/staff/id_cards/${staffData.front_image}`
      );
      if (fs.existsSync(oldFrontImagePath)) {
        fs.unlinkSync(oldFrontImagePath);
      }
    }

    if (staffData.back_image) {
      const oldBackImagePath = path.join(
        __dirname,
        `../uploads/staff/id_cards/${staffData.back_image}`
      );
      if (fs.existsSync(oldBackImagePath)) {
        fs.unlinkSync(oldBackImagePath);
      }
    }

    Staff.deleteOne({ _id: staffId })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
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

// const orderController = async (req, res) => {
//   try {
//     let orderData = { ...req.body.orderInfo, restaurant_id: req.user };
//     const tableId = req.body.table_id;
//     const customerInfo = req.body.customerInfo;
//     let savedOrder;

//     if (customerInfo.phone !== "" || customerInfo.email !== "") {
//       const customer = new Customer(customerInfo);
//       const savedCustomer = await customer.save();

//       orderData = { ...orderData, customer_id: savedCustomer._id };
//     }

//     if (tableId != "") {
//       // Find the table
//       const tableDocument = await Table.findOne({ "tables._id": tableId });

//       if (!tableDocument) {
//         return res.status(404).json({ message: "Table not found" });
//       }

//       const table = tableDocument.tables.id(tableId);

//       if (!table) {
//         return res.status(404).json({ message: "Table not found" });
//       }

//       if (table.current_status === "Empty" || table.order_id === null) {
//         const newOrder = new Order(orderData);
//         savedOrder = await newOrder.save();
//         table.current_status = savedOrder.order_status;
//         table.order_id = savedOrder._id;
//       } else {
//         savedOrder = await Order.findByIdAndUpdate(table.order_id, orderData, {
//           new: true,
//         });
//         if (savedOrder.order_status !== "Paid") {
//           table.current_status = savedOrder.order_status;
//         } else {
//           table.current_status = "Empty";
//           table.order_id = null;
//         }
//       }

//       // Save the updated table document
//       await tableDocument.save();
//       res.status(200).json({
//         status: "success",
//         message: "Order processed successfully",
//         order: savedOrder,
//         table: tableDocument,
//       });
//     } else {
//       const newOrder = new Order(orderData);
//       savedOrder = await newOrder.save();

//       res.status(200).json({
//         status: "success",
//         message: "Order processed successfully",
//         order: savedOrder,
//       });
//     }
//   } catch (error) {
//     console.error("Error processing order:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

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

        return res.status(200).json({
          status: "success",
          message: "Order created successfully",
          order: savedOrder,
        });
      }
    }
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
        {
          $or: [
            { order_status: "KOT" },
            { order_status: "KOT and Print" },
            {
              $and: [
                { order_status: "Paid" },
                { order_items: { $elemMatch: { status: "Prepairing" } } },
              ],
            },
          ],
        },
      ],
    });

    res.json(orderData);
  } catch (error) {
    console.error("Error fetching KOTs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDishStatus = async (req, res) => {
  try {
    const { orderId, dishId, status } = req.body;

    await Order.updateOne(
      { _id: orderId, "order_items._id": dishId },
      { $set: { "order_items.$.status": status } }
    );

    res.status(200).json({ success: true, message: "Dish status updated." });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error updating dish status.", error });
  }
};

const updateAllDishStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await Order.updateOne(
      { _id: orderId },
      { $set: { "order_items.$[].status": status } }
    );

    res
      .status(200)
      .json({ success: true, message: "All dish statuses updated." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating all dish statuses.",
      error,
    });
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
  sendAdminOtp,
  verifyAdminOtp,
  resetAdminPassword,
  getUserData,
  getManagerData,
  getManagerDataById,
  updateManager,
  deleteManager,
  changeManagerPassword,
  emailCheck,
  addMenu,
  getInventoryData,
  getInventoryDataById,
  addInvetory,
  deleteInventory,
  updateInventory,
  completeInventoryRequest,
  rejectInventoryRequest,
  getStaffData,
  addStaff,
  updateStaff,
  deleteStaff,
  getTableData,
  addTable,
  updateTable,
  deleteTable,
  getMenuData,
  getMenuCategories,
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
  updateDishStatus,
  updateAllDishStatus,
  orderHistory,
  addManager,
  getStaffDataById,
};
