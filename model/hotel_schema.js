const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
  },
  city:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  distance:{
    type: String,
    required: true,
  },
  photos:{
    type: [String],
  },
  desc:{
    type: String,
    required: true,
  },
  distance:{
    type: String,
    required: true,
  },
  rating:{
    type: String,
    min:0,
    max:5,
  },
  room:{
    type: [String],
  },
  title:{
    type: String,
    required: true,
  },
  cheapestPrice:{
    type: Number,
    required: true,
  },
  featured:{
    type: Boolean,
    default: false,
  }
})

const Hoteldb = mongoose.model('hoteldb', hotelSchema); 
module.exports = Hoteldb;