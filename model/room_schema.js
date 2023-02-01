const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: Number,
      unique: true,
      required: true,
    },
    roomType: {
        type: String,
        required: true,
      },
    description: {
      type: String,
      // required: true,
    },
    price: {
      type: String,
    },
    img:{
      type: String,
    }, 
    noOfpeople:{
      type: Number,
    },
    checkIn:{
      type: Date,
    },
    checkOut:{
      type: Date,
    },
    availability: { 
      type: Boolean,
       default: true
     },
     bookedBy: {
      type: String, 
        default: ""
      }
  
     
    
    //img: []
    // currentbookings:[],
    // availability:{
    //   type: Boolean
    // },
    // startDate:{
    //     type: Date,
    //     required: true,
    // },
    // endDate:{
    //     type: Date,
    //     required: true,
    // }
         // roomNumbers: [{ number: Number, datesBooked: [{ type: [Date] }] }], // datesBooked is their so that if a room is reserved it will be reserved on that date
  },
  { timestamps: true }
);

const Roomdb = mongoose.model("roomdb", roomSchema);
module.exports = Roomdb;
