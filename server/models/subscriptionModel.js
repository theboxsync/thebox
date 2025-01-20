const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
    user_id: {
        type: String,
    },
    plan_id: {
        type: String,
    },
    start_date: {
        type: Date,
    },
    end_date: {
        type: Date,
    },
    status: {
        type: String,
    },
});

const Subscription = mongoose.model("subscription", subscriptionSchema);
module.exports = Subscription;