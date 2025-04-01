const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  addSubscriptionPlan,
  getSubscriptionPlans,
  getUserSubscriptionInfo,
  buySubscriptionPlan,
} = require("../controllers/subscriptionController");

const subscriptionRouter = express.Router();

subscriptionRouter
  .route("/addsubscriptionplan")
  .post(authMiddleware, addSubscriptionPlan);
subscriptionRouter
  .route("/getsubscriptionplans")
  .get(authMiddleware, getSubscriptionPlans);

subscriptionRouter
  .route("/getusersubscriptioninfo")
  .get(authMiddleware, getUserSubscriptionInfo);

subscriptionRouter
  .route("/buysubscriptionplan")
  .post(authMiddleware, buySubscriptionPlan);

module.exports = subscriptionRouter;
