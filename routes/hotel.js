const express = require("express");
const route = express.Router();
// const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require("../controller/hotelController");
const hotelController = require("../controller/hotelController");
const { verifyAdmin } = require("../verify_token");

// Create
route.post("/", verifyAdmin, hotelController.createHotel);

// Update
route.put("/update/:id", verifyAdmin, hotelController.updateHotel);

// Delete
route.delete("/delete/:id", verifyAdmin, hotelController.deleteHotel);

// Get
route.get("/retrive/:id", hotelController.getHotel);

// Get All
route.get("/retrive", hotelController.getHotels);

module.exports = route;
