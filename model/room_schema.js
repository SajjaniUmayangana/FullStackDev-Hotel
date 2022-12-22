const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    roomNumbers: [{ number: Number, datesBooked: [{ type: [Date] }] }], // datesBooked is their so that if a room is reserved it will be reserved on that date
  },
  { timestamps: true }
);

const Roomdb = mongoose.model("roomdb", roomSchema);
module.exports = Roomdb;
