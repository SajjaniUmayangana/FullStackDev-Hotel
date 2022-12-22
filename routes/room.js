const express = require('express');
const route = express.Router();
const roomController = require('../controller/roomController')
const { verifyAdmin } = require("../verify_token");

// Create
route.post("/:hotelid", verifyAdmin, roomController.createRoom);

// Update
route.put("/update/:id", verifyAdmin, roomController.updateRoom);

// Delete
route.delete("/delete/:id/:hotelid", verifyAdmin, roomController.deleteRoom);

// Get
route.get("/retrive/:id", roomController.getRoom);

// Get All
route.get("/retrive", roomController.getRooms);

module.exports = route;