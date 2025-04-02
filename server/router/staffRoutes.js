const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  getStaffPositions,
  getStaffData,
  getStaffDataById,
  addStaff,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");
const adminAuth = require("../middlewares/adminAuth");

const staffRouter = express.Router();

staffRouter.route("/getstaffpositions").get(authMiddleware, getStaffPositions);
staffRouter.route("/staffdata").get(authMiddleware, getStaffData);
staffRouter.route("/staffdata/:id").get(authMiddleware, getStaffDataById);
staffRouter.route("/addstaff").post(authMiddleware, adminAuth, addStaff);
staffRouter
  .route("/updatestaff/:id")
  .put(authMiddleware, adminAuth, updateStaff);
staffRouter
  .route("/deletestaff/:id")
  .delete(authMiddleware, adminAuth, deleteStaff);

module.exports = staffRouter;
