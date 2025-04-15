const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  emailCheck,
  register,
  login,
  logout,
  getUserData,
  getUserDataByCode,
  sendAdminOtp,
  verifyAdminOtp,
  resetAdminPassword,
  updateUser,
  updateTax,
  getTokenRole,
  getAllUsers,
} = require("../controllers/userController");
const adminAuth = require("../middlewares/adminAuth");

const userRouter = express.Router();

userRouter.route("/emailcheck").post(emailCheck);
userRouter.route("/register").post(register);
userRouter.route("/update-tax").put(authMiddleware, adminAuth, updateTax);
userRouter.route("/login").post(login);
userRouter.route("/logout").get(logout);
userRouter.route("/sendadminotp").post(authMiddleware, sendAdminOtp);
userRouter
  .route("/verifyadminotp")
  .post(authMiddleware, verifyAdminOtp);
userRouter
  .route("/resetadminpassword")
  .post(authMiddleware, resetAdminPassword);
userRouter.route("/userdata").get(authMiddleware, getUserData);
userRouter.route("/userdata/:code").get(authMiddleware, getUserDataByCode);
userRouter.route("/updateuser").put(authMiddleware, adminAuth, updateUser);
userRouter.route("/gettokenrole").get(authMiddleware, getTokenRole);
userRouter.route("/getallusers").get(authMiddleware, getAllUsers);


module.exports = userRouter;
