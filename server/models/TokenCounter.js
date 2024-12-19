const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenCounterSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  lastToken: {
    type: Number,
    default: 0,
  },
});

const TokenCounter = mongoose.model("TokenCounter", tokenCounterSchema);
module.exports = TokenCounter;
