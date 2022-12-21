const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
var cookieParser = require('cookie-parser');


// importing route files 
const hotelRoute = require('./routes/hotel')
const roomRoute = require('./routes/room')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth');



dotenv.config() // connecting the config.env with the server.js file

const connect = async () => {
  try {
    await mongoose.connect(process.env.mongo);
    console.log("Connected to MongoDB")
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB is disconnected")
})


// middleware 
app.use(express.json())
app.use(cookieParser());


app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);

// Error handeling middleware 
app.use((err,req,res,next)=>{
  const errStatus = err.status || 500
  const errMessage = err.message || "Sorry, something went wrong"
  return res.status(errStatus).json(errMessage)
})


app.listen(8800, () => {
  console.log("connected to backend");
  connect();
});
