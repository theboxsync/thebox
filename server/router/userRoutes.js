const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  emailCheck,
  register,
  login,
  logout,
  getUserData,
  sendAdminOtp,
  verifyAdminOtp,
  resetAdminPassword,
  updateUser,
  updateTax,
} = require("../controllers/userController");
const adminAuth = require("../middlewares/adminAuth");

const userRouter = express.Router();

userRouter.route("/emailcheck").post(emailCheck);
userRouter.route("/register").post(register);
userRouter.route("/update-tax").put(authMiddleware, adminAuth, updateTax);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/sendadminotp").post(authMiddleware, adminAuth, sendAdminOtp);
userRouter
  .route("/verifyadminotp")
  .post(authMiddleware, adminAuth, verifyAdminOtp);
userRouter
  .route("/resetadminpassword")
  .post(authMiddleware, adminAuth, resetAdminPassword);
userRouter.route("/userdata").get(authMiddleware, getUserData);
userRouter.route("/updateuser").put(authMiddleware, adminAuth, updateUser);

module.exports = userRouter;
