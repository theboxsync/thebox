const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
  restaurant_code: {
    type: String,
  },
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
  gst_no: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  country: {
    type: String,
  },
  state: {
    type: String,
  },
  city: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  // start_date: {
  //   type: Date,
  // },
  // end_date: {
  //   type: Date,
  // },
  // otp: {
  //   type: Number,
  // },
  // email_verification: {
  //   type: Number,
  // },
  // active: {
  //   type: Number,
  // },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRETKEY,
      { expiresIn: "30d" }
    );

    return token;
  } catch (error) {}
};

const User = mongoose.model("users", userSchema);
module.exports = User;
