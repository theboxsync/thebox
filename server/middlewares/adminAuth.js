const adminAuth = (req, res, next) => {
  try {
    if (req.user.Role !== "Admin") {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = adminAuth;
