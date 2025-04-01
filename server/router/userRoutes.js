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

const userRouter = express.Router();

userRouter.route("/emailcheck").post(emailCheck);
userRouter.route("/register").post(register);
userRouter.route("/update-tax").put(authMiddleware, updateTax);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/sendadminotp").post(sendAdminOtp);
userRouter.route("/verifyadminotp").post(verifyAdminOtp);
userRouter.route("/resetadminpassword").post(resetAdminPassword);
userRouter.route("/userdata").get(authMiddleware, getUserData);
userRouter.route("/updateuser").put(authMiddleware, updateUser);

module.exports = userRouter;
