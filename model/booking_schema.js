const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    
    },
    lastName:{
        type: String,
       
    },
    email:{
        type: String,
      
    },
    address:{
        type: String,
        
    },
    contactNumber:{
        type: String,
        required: true,
       
    }

});

const bookingDB = mongoose.model("bookingdb", bookingSchema);
module.exports = bookingDB;
