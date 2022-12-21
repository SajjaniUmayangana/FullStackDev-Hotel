const express = require("express");
const route = express.Router();
// const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controller/hotelController");
const hotelController = require("../controller/hotelController");


// Create
route.post("/", hotelController.createHotel);

// Update
route.put("/update/:id", hotelController.updateHotel);

// Delete
route.delete("/delete/:id", hotelController.deleteHotel);

// Get
route.get("/retrive/:id", hotelController.getHotel);

// Get All
route.get("/retrive", hotelController.getHotels);

module.exports = route;
