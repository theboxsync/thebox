const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addMenu = new Schema({
  hotel_id: {
    type: String,
  },
  category: {
    type: String,
  },
  meal_type: {
    type: String,
  },
  dishes: [
    {
      dish_name: {
        type: String,
      },
      dish_price: {
        type: Number,
      },
      dish_img: {
        type: String,
      },
      description: {
        type: String,
      },
      quantity: {
        type: Number,
      },
      unit: {
        type: String,
      },
    }
  ]
});

const Menu = mongoose.model("menulist", addMenu);
module.exports = Menu;