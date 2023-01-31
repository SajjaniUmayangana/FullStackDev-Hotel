const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    arrival: {
        type: Date,
        required: true,
    },
    departure: {
        type: Date,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    contactNumber:{
        type: Number,
        required: true,
    }

});

const bookingDB = mongoose.model("bookingDb", bookingSchema);
module.exports = bookingDB;
