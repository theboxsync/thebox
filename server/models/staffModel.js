const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addStaff = new Schema({
  staff_id: {
    type: String,
  },
  f_name: {
    type: String,
  },
  l_name:{
    type: String,
  },
  birth_date: {
    type: String,
  },
  joining_date: {
    type: String,
  },
  address: {
    type: String,
  },
  phone_no: {
    type: Number,
  },
  email: {
    type: String,
  },
  position: {
    type: String,
  },
  salary: {
    type: Number,
  },
  photo: {
    type: String,
  },
  document_type: {
    type: String,
  },
  id_number: {
    type: String,
  },
  front_image: {
    type: String,
  },
  back_image: {
    type: String,
  },
  hotel_id: {
    type: String,
  },
});

const Staff = mongoose.model("staff", addStaff);
module.exports = Staff;