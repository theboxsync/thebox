const Menu = require("../models/menuListModel");

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

const deleteMenu = async (req, res) => {
  try {
    console.log("User : " + req.user);
    const dishId = req.params.id;
    const dishData = await Menu.findOne({ "dishes._id": dishId });
    if (!dishData) {
      return res.status(404).json({ message: "Dish not found" });
    } else {
      const category = dishData.category;
      const meal_type = dishData.meal_type;

      const updateResult = await Menu.updateOne(
        { "dishes._id": dishId },
        { $pull: { dishes: { _id: dishId } } }
      );

      if (updateResult.modifiedCount === 0) {
        return res
          .status(404)
          .json({ message: "Dish not found or already deleted" });
      }

      const updatedMenu = await Menu.findOne({
        category,
        meal_type,
        hotel_id: req.user,
      });
      console.log("Updated Menu : " + updatedMenu);
      if (updatedMenu.dishes.length === 0) {
        await Menu.deleteOne({ category, meal_type });
      }
      res.json({ message: "Dish deleted successfully" });
    }
  } catch (error) {
    console.error("Error in delete Menu:", error);
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

const updateDishAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_available } = req.body;

    // Find the dish and update its availability
    const updatedMenu = await Menu.updateOne(
      { "dishes._id": id },
      { $set: { "dishes.$.is_available": is_available } }
    );

    if (updatedMenu.modifiedCount > 0) {
      res.status(200).json({ message: "Dish availability updated" });
    } else {
      res.status(404).json({ message: "Dish not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addMenu,
  getMenuData,
  getMenuDataById,
  getMenuCategories,
  updateMenu,
  deleteMenu,
  setSpecialMenu,
  removeSpecialMenu,
  updateDishAvailability,
};
