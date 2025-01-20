const mongoose = require("mongoose");
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
});

const SubscriptionPlan = mongoose.model("subscriptionPlan", subscriptionPlanSchema);
module.exports = SubscriptionPlan;