const SubscriptionPlan = require("../models/subscriptionPlanModel");
const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");

const addSubscriptionPlan = async (req, res) => {
  try {
    const subscriptionplan = await SubscriptionPlan.create(req.body);
    res.status(200).json(subscriptionplan);
  } catch (error) {
    console.log(error);
  }
};

const getSubscriptionPlans = async (req, res) => {
  try {
    const subscriptionplans = await SubscriptionPlan.find();
    res.status(200).json(subscriptionplans);
  } catch (error) {
    console.log(error);
  }
};

const getUserSubscriptionInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const subscription = await Subscription.find({ user_id: user._id });
    if (!subscription) {
      return res.status(200).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.log(error);
  }
};

const buySubscriptionPlan = async (req, res) => {
  try {
    console.log(req.body);
    const { planId } = req.body;
    const userId = req.user;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch plan details
    const planDetails = await SubscriptionPlan.findById(planId);
    if (!planDetails) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Calculate start and end dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + planDetails.plan_duration);

    // Create a new subscription
    const newSubscription = new Subscription({
      user_id: userId,
      plan_id: planId,
      start_date: startDate,
      end_date: endDate,
      status: "active", // Set the initial status to "active"
    });

    // Save the subscription to the database
    const savedSubscription = await newSubscription.save();

    res.status(200).json({
      message: "Subscription purchased successfully",
      subscription: savedSubscription,
    });
  } catch (error) {
    console.error("Error buying subscription:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addSubscriptionPlan,
  getSubscriptionPlans,
  getUserSubscriptionInfo,
  buySubscriptionPlan,
};
