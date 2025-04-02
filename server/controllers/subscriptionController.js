const SubscriptionPlan = require("../models/subscriptionPlanModel");
const Subscription = require("../models/subscriptionModel");
const User = require("../models/userModel");
const cron = require("node-cron");

const updateExpiredSubscriptions = async () => {
  const today = new Date();
  try {
    const result = await Subscription.updateMany(
      { end_date: { $lt: today }, status: { $ne: "expired" } },
      { $set: { status: "expired" } }
    );
    console.log(`Updated ${result.modifiedCount} expired subscriptions`);
  } catch (error) {
    console.error("Error updating subscriptions:", error);
  }
};
cron.schedule("0 0 * * *", () => {
  console.log("Running cron job to update expired subscriptions...");
  updateExpiredSubscriptions();
});

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

const getAddonPlans = async (req, res) => {
  try {
    const compatiblePlanId = req.params.id;
    const addonPlans = await SubscriptionPlan.find({
      is_addon: true,
      compatible_with: compatiblePlanId,
    });
    res.status(200).json(addonPlans);
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
    const today = new Date();
    const updatedSubscriptions = await Promise.all(
      subscription.map(async (sub) => {
        if (new Date(sub.end_date) < today && sub.status !== "expired") {
          sub.status = "expired";
          await sub.save();
        }
        return sub;
      })
    );
    res.status(200).json(updatedSubscriptions);
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

const renewSubscription = async (req, res) => {
  try {
    const { subscriptionId } = req.body;

    // Find the expired subscription
    const subscription = await Subscription.findById(subscriptionId);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Find the corresponding plan to get duration
    const plan = await SubscriptionPlan.findById(subscription.plan_id);
    if (!plan) {
      return res.status(404).json({ message: "Subscription plan not found" });
    }

    // Calculate the new end date
    const newStartDate = new Date(); // Renew from today
    const newEndDate = new Date(newStartDate);
    newEndDate.setMonth(newEndDate.getMonth() + plan.plan_duration);

    // Update the subscription
    subscription.start_date = newStartDate;
    subscription.end_date = newEndDate;
    subscription.status = "active";
    await subscription.save();

    res.json({ message: "Subscription renewed successfully", subscription });
  } catch (error) {
    console.error("Error renewing subscription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSubscriptionPlan,
  getSubscriptionPlans,
  getAddonPlans,
  getUserSubscriptionInfo,
  buySubscriptionPlan,
  renewSubscription,
};
