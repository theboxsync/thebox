const express = require("express");
const authMiddleware = require("../middlewares/auth-middlewares");
const {
  addCaptain,
  getCaptainData,
  getCaptainDataById,
  updateCaptain,
  deleteCaptain,
  changeCaptainPassword,
  captainLogin,
} = require("../controllers/captainController");

const captainRouter = express.Router();

captainRouter.route("/addcaptain").post(authMiddleware, addCaptain);

captainRouter.route("/getcaptaindata").get(authMiddleware, getCaptainData);
captainRouter.route("/getcaptaindata/:id").get(getCaptainDataById);

captainRouter.route("/updatecaptain/:id").put(authMiddleware, updateCaptain);
captainRouter.route("/deletecaptain").post(authMiddleware, deleteCaptain);
captainRouter
  .route("/changecaptainpassword")
  .post(authMiddleware, changeCaptainPassword);

captainRouter.route("/captain-login").post(captainLogin);

module.exports = captainRouter;
