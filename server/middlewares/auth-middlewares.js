const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRETKEY);
      console.log("Middleware : ", user);
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
