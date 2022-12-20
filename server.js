const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// importing route files 
const hotelRoute = require('./routes/hotel')
const roomRoute = require('./routes/room')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')

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

app.use("/hotel", hotelRoute);
app.use("/room", roomRoute);
app.use("/user", userRoute);
app.use("/auth", authRoute);


app.listen(8800, () => {
  console.log("connected to backend");
  connect();
});
