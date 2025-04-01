const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  updateCharges,
  addContainerCharge,
  getContainerCharges,
  updateContainerCharge,
  deleteContainerCharge,
} = require("../controllers/chargeController");

const chargeRouter = express.Router();

chargeRouter.route("/updatecharges").put(authMiddleware, updateCharges);
chargeRouter
  .route("/add-container-charge")
  .post(authMiddleware, addContainerCharge);
chargeRouter
  .route("/get-container-charges")
  .get(authMiddleware, getContainerCharges);
chargeRouter
  .route("/update-container-charge")
  .put(authMiddleware, updateContainerCharge);
chargeRouter
  .route("/delete-container-charge")
  .delete(authMiddleware, deleteContainerCharge);

module.exports = chargeRouter;
