const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  addSubscriptionPlan,
  getSubscriptionPlans,
  getAddonPlans,
  getUserSubscriptionInfo,
  buySubscriptionPlan,
  renewSubscription,
} = require("../controllers/subscriptionController");
const adminAuth = require("../middlewares/adminAuth");

const subscriptionRouter = express.Router();

subscriptionRouter
  .route("/addsubscriptionplan")
  .post(authMiddleware, adminAuth, addSubscriptionPlan);
subscriptionRouter
  .route("/getsubscriptionplans")
  .get(authMiddleware, getSubscriptionPlans);

subscriptionRouter.route("/getaddonplans").get(getAddonPlans);

subscriptionRouter
  .route("/getusersubscriptioninfo")
  .get(authMiddleware, getUserSubscriptionInfo);

subscriptionRouter
  .route("/buysubscriptionplan")
  .post(authMiddleware, buySubscriptionPlan);

subscriptionRouter
  .route("/renewsubscription")
  .post(authMiddleware, renewSubscription);

module.exports = subscriptionRouter;
