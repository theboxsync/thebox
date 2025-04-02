const mongoose = require("mongoose");
const { create } = require("./userModel");
const Schema = mongoose.Schema;

const subscriptionPlanSchema = new Schema({
  plan_name: {
    type: String,
  },
  plan_price: {
    type: Number,
  },
  plan_duration: {
    type: Number, // in months
  },
  features: {
    type: Array,
  },
  is_addon: {
    type: Boolean,
    default: false,
  },
  compatible_with: {
    type: Array,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SubscriptionPlan = mongoose.model(
  "subscriptionPlan",
  subscriptionPlanSchema
);
module.exports = SubscriptionPlan;
