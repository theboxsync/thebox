const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  addSubscriptionPlan,
  getSubscriptionPlans,
  getAddonPlans,
  getUserSubscriptionInfo,
  getUserSubscriptionInfoById,
  buySubscriptionPlan,
  pauseSubscriptions,
  expandSubscriptions,
  renewSubscription,
  buyCompletePlan,
  getAllSubscriptions,
} = require("../controllers/subscriptionController");
const adminAuth = require("../middlewares/adminAuth");

const subscriptionRouter = express.Router();

subscriptionRouter
  .route("/addsubscriptionplan")
  .post(authMiddleware, addSubscriptionPlan);
subscriptionRouter
  .route("/getsubscriptionplans")
  .get(authMiddleware, getSubscriptionPlans);

subscriptionRouter.route("/getaddonplans").get(getAddonPlans);

subscriptionRouter
  .route("/getusersubscriptioninfo")
  .get(authMiddleware, getUserSubscriptionInfo);

subscriptionRouter
  .route("/getusersubscriptioninfo/:id")
  .get(authMiddleware, getUserSubscriptionInfoById);

subscriptionRouter
  .route("/buysubscriptionplan")
  .post(authMiddleware, buySubscriptionPlan);

subscriptionRouter
  .route("/pause")
  .post(authMiddleware, pauseSubscriptions);

subscriptionRouter
  .route("/expand")
  .post(authMiddleware, expandSubscriptions);

subscriptionRouter
  .route("/renewsubscription")
  .post(authMiddleware, renewSubscription);

subscriptionRouter
  .route("/buycompleteplan")
  .post(authMiddleware, adminAuth, buyCompletePlan);

subscriptionRouter
  .route("/getallsubscriptions")
  .get(authMiddleware,  getAllSubscriptions);

module.exports = subscriptionRouter;
