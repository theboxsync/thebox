const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
    addCustomerQuery,
} = require("../controllers/customerQueryController");
const adminAuth = require("../middlewares/adminAuth");

const customerQueryRouter = express.Router();

customerQueryRouter.route("/addquery").post(authMiddleware, adminAuth, addCustomerQuery);

module.exports = customerQueryRouter;