const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addinventory = new Schema({
  bill_date: {
    type: Date,
  },
  bill_number: {
    type: Number,
  },
  vendor_name: {
    type: String,
  },
  category: {
    type: String,
  },
  bill_image:{
    type: String,
  },
  total_amount: {
    type: Number,
  },
  paid_amount: {
    type: Number,
  },
  unpaid_amount: {
    type: Number,
  },
  item_name: {
    type: String,
  },
  unit: {
    type: String,
  },
  item_quantity: {
    type: Number,
  },
  item_price: {
    type: Number,
  },
  approve_status: {
    type: Number,
  },
  hotel_id: {
    type: String,
  },
});

const Inventory = mongoose.model("inventory", addinventory);
module.exports = Inventory;