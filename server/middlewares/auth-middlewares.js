const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRETKEY);
      req.user = user;
    } else {
      req.user = null;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleware;
